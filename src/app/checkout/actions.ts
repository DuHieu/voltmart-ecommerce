'use server';

import { createServerSupabase, getAuthenticatedUser } from '@/lib/supabase/server';

export interface CheckoutShippingInput {
  street: string;
  city: string;
  state?: string;
  zip_code: string;
  country: string;
  clientCartItems?: Array<{
    product_id: string;
    quantity: number;
    price: number;
  }>;
}

export async function createDemoOrder(input: CheckoutShippingInput) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return { success: false, error: 'You must be signed in to checkout.' };
    }

    const supabase = await createServerSupabase();

    // 1. Get or create shipping address in addresses table
    let addressId: number | null = null;
    const { data: existingAddress } = await supabase
      .from('addresses')
      .select('id')
      .eq('user_id', user.id)
      .eq('street', input.street.trim())
      .limit(1)
      .maybeSingle();

    if (existingAddress?.id) {
      addressId = existingAddress.id;
    } else {
      const { data: newAddress, error: addrError } = await supabase
        .from('addresses')
        .insert({
          user_id: user.id,
          street: input.street.trim() || '100 VoltMart Tech Blvd',
          city: input.city.trim() || 'San Francisco',
          state: input.state?.trim() || 'CA',
          zip_code: input.zip_code.trim() || '94105',
          country: input.country.trim() || 'United States',
          is_default: true,
        })
        .select('id')
        .single();

      if (addrError || !newAddress) {
        console.error('Error creating address:', addrError);
        const { data: anyAddress } = await supabase
          .from('addresses')
          .select('id')
          .eq('user_id', user.id)
          .limit(1)
          .maybeSingle();
        addressId = anyAddress?.id || 1;
      } else {
        addressId = newAddress.id;
      }
    }

    // 2. Resolve items to order
    let itemsToOrder: Array<{ product_id: string; quantity: number; price: number }> = [];

    const { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle();

    if (cart?.id) {
      const { data: dbItems } = await supabase
        .from('cart_items')
        .select('product_id, quantity, price')
        .eq('cart_id', cart.id);

      if (dbItems && dbItems.length > 0) {
        itemsToOrder = dbItems;
      }
    }

    // If database cart was empty, fallback to clientCartItems
    if (itemsToOrder.length === 0 && input.clientCartItems && input.clientCartItems.length > 0) {
      itemsToOrder = input.clientCartItems;
    }

    if (itemsToOrder.length === 0) {
      return {
        success: false,
        error: 'Your cart is empty. Please add products to cart before checking out.',
      };
    }

    // 3. Calculate subtotal & shipping
    const subtotal = itemsToOrder.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal >= 150 ? 0 : 5.99;
    const totalAmount = Number((subtotal + shipping).toFixed(2));

    // 4. Create the Order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        status: 'processing',
        total: totalAmount,
        shipping_address_id: addressId,
        payment_method: 'VoltMart Demo Card (Instant Verification)',
        payment_id: `vlt_demo_${Date.now()}`,
      })
      .select('id')
      .single();

    if (orderError || !order) {
      console.error('Error creating order record:', orderError);
      return { success: false, error: orderError?.message || 'Failed to create order.' };
    }

    // 5. Insert order items
    const orderItemsRows = itemsToOrder.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsRows);

    if (itemsError) {
      console.error('Error inserting order items:', itemsError);
    }

    // 6. Clear user active database cart
    if (cart?.id) {
      await supabase.from('cart_items').delete().eq('cart_id', cart.id);
      await supabase.from('carts').update({ status: 'completed' }).eq('id', cart.id);
    }

    return {
      success: true,
      orderId: order.id,
      total: totalAmount,
    };
  } catch (error) {
    console.error('Checkout error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred during checkout.',
    };
  }
}