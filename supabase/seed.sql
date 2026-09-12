-- ==============================================================================
-- VoltMart Electronics - Supabase Database Schema & Seed Script
-- Run this in your Supabase Project's SQL Editor to set up all tables and seed data.
-- ==============================================================================

-- 1. Create custom enum type for order status if not exists
DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL
);

-- 3. Create products table
CREATE TABLE IF NOT EXISTS products (
    product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
    image VARCHAR(1000),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    sku VARCHAR(100),
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 5. Policies: Public read access
DO $$ BEGIN
    CREATE POLICY "Allow public read categories" ON categories FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Allow public read products" ON products FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 6. Seed Categories
INSERT INTO categories (id, name, description)
VALUES 
    (1, 'Audio & Sound', 'High-fidelity headphones, studio monitors, wireless earbuds, and precision DACs.'),
    (2, 'Computing & Workspace', 'Mechanical keyboards, ergonomic mice, 4K displays, and workstation docks.'),
    (3, 'Smart Gear & Wearables', 'Aerospace titanium smartwatches, MagSafe charging stations, and smart light bars.')
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description;

-- 7. Seed Products
DELETE FROM products WHERE sku LIKE 'VLT-%' OR sku LIKE 'NEX-%';

INSERT INTO products (product_id, title, description, price, image, stock, sku, category_id)
VALUES
    -- Audio & Sound (Category 1)
    ('a1000000-0000-0000-0000-000000000001', 'VoltMart Spatial Pro Wireless Headphones', 'Flagship over-ear wireless headphones with custom 45mm beryllium drivers, active hybrid noise cancellation, and 42-hour battery life.', 349.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', 25, 'VLT-AUD-001', 1),
    ('a1000000-0000-0000-0000-000000000002', 'VoltMart Pulse True Wireless Earbuds', 'Audiophile-grade in-ear monitors with adaptive ANC, IPX7 water resistance, wireless charging case, and ultra-low latency gaming mode.', 189.99, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80', 40, 'VLT-AUD-002', 1),
    ('a1000000-0000-0000-0000-000000000003', 'SoundWave Precision Studio Monitor Pair', 'Bi-amplified nearfield reference studio monitors with woven composite cones, silk dome tweeters, and room-acoustic tuning switches.', 499.00, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80', 12, 'VLT-AUD-003', 1),
    ('a1000000-0000-0000-0000-000000000004', 'Aura Hi-Res USB-C Portable DAC & Amp', 'Ultra-compact MQA certified digital-to-analog converter delivering 32-bit/384kHz decoding with dual 3.5mm and 4.4mm balanced audio outputs.', 129.50, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80', 30, 'VLT-AUD-004', 1),

    -- Computing & Workspace (Category 2)
    ('b2000000-0000-0000-0000-000000000001', 'Apex Custom 75% Mechanical Keyboard', 'Gasket-mounted tri-mode mechanical keyboard featuring CNC anodized aluminum chassis, hot-swappable switches, and PBT dye-sub keycaps.', 219.00, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80', 18, 'VLT-CMP-001', 2),
    ('b2000000-0000-0000-0000-000000000002', 'Aerox Precision Wireless Ergonomic Mouse', 'Ergonomic wireless mouse with 26,000 DPI optical sensor, optical switches, and 100-hour battery life with USB-C quick charge.', 99.99, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80', 35, 'VLT-CMP-002', 2),
    ('b2000000-0000-0000-0000-000000000003', 'UltraView 32" 4K UHD Creator Display', '32-inch IPS panel with 99% DCI-P3 color accuracy, 144Hz refresh rate, VESA HDR600, and single-cable 90W USB-C Power Delivery.', 799.00, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80', 8, 'VLT-CMP-003', 2),
    ('b2000000-0000-0000-0000-000000000004', 'Horizon 14-in-1 Thunderbolt 4 Dock', 'Dual 4K@60Hz display support, 98W host charging, 2.5Gbps Ethernet, UHS-II SD reader, and durable aluminum heat-dissipating chassis.', 279.00, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80', 22, 'VLT-CMP-004', 2),

    -- Smart Gear & Wearables (Category 3)
    ('c3000000-0000-0000-0000-000000000001', 'Chrono Pro Titanium Smartwatch', 'Grade-5 aerospace titanium casing with sapphire crystal AMOLED display, multi-band GPS, advanced cardiac metrics, and 14-day battery life.', 449.00, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', 15, 'VLT-WR-001', 3),
    ('c3000000-0000-0000-0000-000000000002', 'OmniCharge 3-in-1 Magnetic Fast Charger', 'Fast wireless charging stand for smartphone, smartwatch, and earbuds simultaneously with weighted aluminum base and ambient status LED.', 119.00, 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80', 50, 'VLT-WR-002', 3),
    ('c3000000-0000-0000-0000-000000000003', 'Lumina Dynamic Ambient Monitor Light Bar', 'Asymmetric optical glare-free design with ambient sensor, wireless desktop dial controller, and customizable color temperature.', 89.00, 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80', 40, 'VLT-WR-003', 3),
    ('c3000000-0000-0000-0000-000000000004', 'StreamMic Pro Broadcast USB Microphone', 'Studio-quality 24-bit/96kHz cardioid condenser microphone with built-in dual pop filter, internal shock mount, and zero-latency headphone monitoring.', 159.00, 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80', 28, 'VLT-WR-004', 3);
