import { supabase } from '@/lib/supabase/client';
import { ProductType } from '../../types';
import { mockProducts } from '@/lib/mockData';

export const productService = {
  async getProducts(): Promise<ProductType[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .order('title');

      if (!error && data && data.length > 0) {
        return data as ProductType[];
      }
      // Fallback to curated electronics catalog
      return mockProducts;
    } catch {
      return mockProducts;
    }
  },

  async getProductById(id: string): Promise<ProductType | null> {
    try {
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
};
