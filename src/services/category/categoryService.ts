import { supabase } from '@/lib/supabase/client';
import { CategoryType } from '../../types';
import { isNoRowsError, toUserFacingQueryError } from '@/utils/errorHandling';
import { mockCategories } from '@/lib/mockData';

export const categoryService = {
  async getCategories(): Promise<CategoryType[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('id');

      if (!error && data && data.length > 0) {
        return data as CategoryType[];
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

      if (error) {
        if (isNoRowsError(error)) {
          return null;
        }
        throw toUserFacingQueryError('Category', error);
      }

      return data as CategoryType;
    } catch (error) {
      throw error instanceof Error
        ? error
        : toUserFacingQueryError('Category', {});
    }
  },
};
