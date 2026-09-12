import { createServerSupabase } from '@/lib/supabase/server';
import { ProductType } from '@/types';
import { mockProducts } from '@/lib/mockData';

export const productServerService = {
  async getProducts(): Promise<ProductType[]> {
    try {
      const supabase = await createServerSupabase();
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .order('title');

      if (!error && data && data.length > 0) {
        return data as ProductType[];
      }
      return mockProducts;
    } catch {
      return mockProducts;
    }
  },

  async getProductById(id: string): Promise<ProductType | null> {
    try {
      const supabase = await createServerSupabase();
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('product_id', id)
        .single();

      if (!error && data) {
        return data as ProductType;
      }
      const found = mockProducts.find((p) => p.product_id === id);
      return found || null;
    } catch {
      const found = mockProducts.find((p) => p.product_id === id);
      return found || null;
    }
  },

  async getProductsByCategory(categoryId: number): Promise<ProductType[]> {
    try {
      const supabase = await createServerSupabase();
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('category_id', categoryId)
        .order('title');

      if (!error && data && data.length > 0) {
        return data as ProductType[];
      }
      return mockProducts.filter((p) => p.category_id === categoryId);
    } catch {
      return mockProducts.filter((p) => p.category_id === categoryId);
    }
  },

  async searchProducts(query: string): Promise<ProductType[]> {
    try {
      const supabase = await createServerSupabase();
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .ilike('title', `%${query}%`)
        .order('title');

      if (!error && data && data.length > 0) {
        return data as ProductType[];
      }
      const q = query.toLowerCase();
      return mockProducts.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    } catch {
      const q = query.toLowerCase();
      return mockProducts.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
  },
};
