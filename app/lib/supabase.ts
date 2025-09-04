import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on the specified data model
export interface User {
  userId: string; // farcaster_fid or wallet address
  createdAt: string;
  paymentInfo?: any;
}

export interface AdCampaign {
  campaignId: string;
  userId: string;
  originalImageURL: string;
  createdAt: string;
  status: 'draft' | 'generating' | 'ready' | 'posted' | 'completed';
}

export interface AdVariation {
  variationId: string;
  campaignId: string;
  generatedImageURL: string;
  prompt: string;
  createdAt: string;
  postedToPlatform: boolean;
  performanceMetrics: {
    views: number;
    clicks: number;
    likes?: number;
  };
}

// Helper functions for database operations
export const dbHelpers = {
  async createUser(user: Omit<User, 'createdAt'>) {
    const { data, error } = await supabase
      .from('users')
      .insert([{ ...user, createdAt: new Date().toISOString() }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async createCampaign(campaign: Omit<AdCampaign, 'campaignId' | 'createdAt'>) {
    const campaignId = `camp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const { data, error } = await supabase
      .from('ad_campaigns')
      .insert([{ 
        ...campaign, 
        campaignId,
        createdAt: new Date().toISOString() 
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async createVariations(variations: Omit<AdVariation, 'variationId' | 'createdAt'>[]) {
    const variationsWithIds = variations.map(v => ({
      ...v,
      variationId: `var_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }));

    const { data, error } = await supabase
      .from('ad_variations')
      .insert(variationsWithIds)
      .select();
    
    if (error) throw error;
    return data;
  },

  async updateVariationMetrics(variationId: string, metrics: AdVariation['performanceMetrics']) {
    const { data, error } = await supabase
      .from('ad_variations')
      .update({ performanceMetrics: metrics })
      .eq('variationId', variationId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getCampaignWithVariations(campaignId: string) {
    const { data: campaign, error: campaignError } = await supabase
      .from('ad_campaigns')
      .select('*')
      .eq('campaignId', campaignId)
      .single();
    
    if (campaignError) throw campaignError;

    const { data: variations, error: variationsError } = await supabase
      .from('ad_variations')
      .select('*')
      .eq('campaignId', campaignId)
      .order('createdAt', { ascending: true });
    
    if (variationsError) throw variationsError;

    return { campaign, variations };
  }
};
