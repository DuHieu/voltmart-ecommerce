-- ============================================================
-- VOLTMART PRODUCTION ACCOUNTS & ORDER_ITEMS RLS SETUP
-- Execute this script in:
-- https://supabase.com/dashboard/project/hxlncjyfokjelnyrtzrx/sql/new
-- ============================================================

-- 1. Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Confirm and configure Store Owner (Marcus Vance)
UPDATE auth.users 
SET email_confirmed_at = NOW(),
    raw_user_meta_data = '{"username":"Marcus Vance","full_name":"Marcus Vance"}',
    updated_at = NOW()
WHERE email = 'owner@voltmart.com';

INSERT INTO public.profiles (profile_id, username, email, role, avatar_url)
SELECT id, 'Marcus Vance (Store Owner)', email, 'admin', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80'
FROM auth.users 
WHERE email = 'owner@voltmart.com'
ON CONFLICT (profile_id) DO UPDATE SET
  username = EXCLUDED.username,
  role = 'admin',
  avatar_url = EXCLUDED.avatar_url;

-- 3. Create and confirm Verified Customer (Alex Miller)
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'customer@voltmart.com',
    crypt('VoltMart2026!', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"username":"Alex Miller","full_name":"Alex Miller"}',
    NOW(),
    NOW()
)
ON CONFLICT (email) DO UPDATE SET
    encrypted_password = crypt('VoltMart2026!', gen_salt('bf')),
    email_confirmed_at = NOW(),
    raw_user_meta_data = '{"username":"Alex Miller","full_name":"Alex Miller"}';

INSERT INTO public.profiles (profile_id, username, email, role, avatar_url)
SELECT id, 'Alex Miller', email, 'user', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80'
FROM auth.users 
WHERE email = 'customer@voltmart.com'
ON CONFLICT (profile_id) DO UPDATE SET
  username = EXCLUDED.username,
  role = 'user';

-- 4. Ensure RLS Policy for order_items INSERT
DROP POLICY IF EXISTS "Users can insert order items for their orders" ON public.order_items;
CREATE POLICY "Users can insert order items for their orders"
ON public.order_items
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
  )
  OR EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.profile_id = auth.uid()
      AND profiles.role = 'admin'
  )
);

-- 5. Ensure RLS Policy for order_items SELECT
DROP POLICY IF EXISTS "Users can view their order items" ON public.order_items;
CREATE POLICY "Users can view their order items"
ON public.order_items
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
  )
  OR EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.profile_id = auth.uid()
      AND profiles.role = 'admin'
  )
);
