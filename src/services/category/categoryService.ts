import { supabase } from '@/lib/supabase/client';
import { CategoryType } from '../../types';
import { mockCategories } from '@/lib/mockData';

export const categoryService = {
  async getCategories(): Promise<CategoryType[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('id');

      if (!error && data && data.length > 0) {
        const existingIds = new Set(data.map((c) => c.id));
        const missing = mockCategories.filter((c) => !existingIds.has(c.id));
        return [...data, ...missing] as CategoryType[];
      }
      return mockCategories;
    } catch {
      return mockCategories;
    }
  },

  async getCategoryById(id: number): Promise<CategoryType | null> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        return data as CategoryType;
      }
      const found = mockCategories.find((c) => c.id === id);
      return found || null;
    } catch {
      const found = mockCategories.find((c) => c.id === id);
      return found || null;
    }
  },
};
