import { createClient } from '@supabase/supabase-js';

const getSupabaseClient = () => {
  const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
  const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a proxy that throws a helpful error when any property is accessed
    return new Proxy({} as any, {
      get: (_, prop) => {
        if (prop === 'then') return undefined; // For async/await compatibility
        throw new Error(
          'Supabase credentials (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) are missing. ' +
          'Please configure them in the Secrets panel in AI Studio.'
        );
      }
    });
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = getSupabaseClient();
