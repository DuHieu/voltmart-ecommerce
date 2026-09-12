import { supabase } from '@/lib/supabase/client';
import { ReviewType } from '../../types';
import { toast } from 'sonner';
import { getClientUser } from '@/lib/supabase/clientUtils';

export const reviewService = {
  async getReviewsByProduct(productId: string): Promise<ReviewType[]> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        return [];
      }

      if (!data || data.length === 0) {
        return [];
      }

      const userIds = Array.from(new Set(data.map((r) => r.user_id).filter(Boolean)));
      const profilesMap: Record<string, any> = {};

      if (userIds.length > 0) {
        try {
          const { data: profiles } = await supabase
            .from('profiles')
            .select('*')
            .in('profile_id', userIds);

          if (profiles) {
            profiles.forEach((p) => {
              profilesMap[p.profile_id] = p;
            });
          }
        } catch {
          // Ignore profile lookup error, reviews will still render
        }
      }

      return data.map((r) => ({
        ...r,
        profile: profilesMap[r.user_id] || null,
      })) as ReviewType[];
    } catch (error) {
      console.error('Error in getReviewsByProduct:', error);
      return [];
    }
  },

  async getReviewById(id: number): Promise<ReviewType | null> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error || !data) {
        if (error) console.error('Error fetching review:', error);
        return null;
      }

      let profile = null;
      if (data.user_id) {
        try {
          const { data: prof } = await supabase
            .from('profiles')
            .select('*')
            .eq('profile_id', data.user_id)
            .maybeSingle();
          profile = prof;
        } catch {
          // Ignore profile lookup error
        }
      }

      return { ...data, profile } as ReviewType;
    } catch (error) {
      console.error('Error in getReviewById:', error);
      return null;
    }
  },

  async createReview(
    productId: string,
    rating: number,
    comment: string
  ): Promise<ReviewType | null> {
    try {
      const user = await getClientUser();
      if (!user) {
        toast.error('You must be logged in to leave a review');
        return null;
      }

      const { data, error } = await supabase
        .from('reviews')
        .insert({
          product_id: productId,
          user_id: user.id,
          rating,
          comment,
        })
        .select('*')
        .single();

      if (error) {
        console.error('Error creating review:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
        toast.error(error.message || 'Failed to create review');
        return null;
      }

      return data as ReviewType;
    } catch (error) {
      console.error('Error in createReview:', error);
      toast.error('Something went wrong');
      return null;
    }
  },

  async updateReview(
    id: number,
    rating: number,
    comment: string
  ): Promise<ReviewType | null> {
    try {
      const user = await getClientUser();
      if (!user) {
        toast.error('You must be logged in to update a review');
        return null;
      }

      const { data, error } = await supabase
        .from('reviews')
        .update({
          rating,
          comment,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user.id) // Ensure user owns the review
        .select('*')
        .single();

      if (error) {
        console.error('Error updating review:', error);
        toast.error('Failed to update review');
        return null;
      }

      return data as ReviewType;
    } catch (error) {
      console.error('Error in updateReview:', error);
      toast.error('Something went wrong');
      return null;
    }
  },

  async deleteReview(id: number): Promise<boolean> {
    try {
      const user = await getClientUser();
      if (!user) {
        toast.error('You must be logged in to delete a review');
        return false;
      }

      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id); // Ensure user owns the review

      if (error) {
        console.error('Error deleting review:', error);
        toast.error('Failed to delete review');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteReview:', error);
      toast.error('Something went wrong');
      return false;
    }
  },
};
