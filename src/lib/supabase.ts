import { createClient } from '@supabase/supabase-js';

const getSupabaseClient = () => {
  // Use environment variables or fallback to the provided project values
  const url = (import.meta as any).env.VITE_SUPABASE_URL || 'https://oowhbylgowuukmmbdlch.supabase.co';
  const key = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vd2hieWxnb3d1dWttbWJkbGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NTM4MjQsImV4cCI6MjA4NDQyOTgyNH0.3KybEzFDCSlZCq_543nzyD_i2fiMusBpIO3zAsASJ1A';

  if (!url || !key) {
    throw new Error('Supabase credentials are missing.');
  }

  return createClient(url, key);
};

export const supabase = getSupabaseClient();
