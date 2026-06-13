import { createClient } from '@supabase/supabase-js';

// Support both standard Vite environment variable prefix and Next.js prefix for flexibility
const meta = import.meta as any;
const supabaseUrl = (meta.env?.VITE_SUPABASE_URL as string) || 
                      (meta.env?.NEXT_PUBLIC_SUPABASE_URL as string) || 
                      '';
const supabaseAnonKey = (meta.env?.VITE_SUPABASE_ANON_KEY as string) || 
                          (meta.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) || 
                          '';

// Helper to check if credentials are valid
export const hasSupabaseConfig = (): boolean => {
  return typeof supabaseUrl === 'string' && supabaseUrl.length > 0 && 
         typeof supabaseAnonKey === 'string' && supabaseAnonKey.length > 0;
};

// Create the client with a fallback check. We export a function or a getter to make it lazy, 
// and also export a default client instance.
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const getSupabase = () => {
  if (!supabaseInstance) {
    if (!hasSupabaseConfig()) {
      console.warn('Supabase credentials are not configured. UI will run in offline mode. Please configure inside .env or using Secrets panel.');
      // Return a dummy object to prevent runtime errors on load
      return null;
    }
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
};

export const supabase = getSupabase();
