import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Veilige fallback als environment variabelen ontbreken
let supabase;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Supabase client creation failed:', error);
    // Fallback naar dummy client
    supabase = createDummyClient();
  }
} else {
  console.warn('Supabase environment variables not found, using dummy client');
  supabase = createDummyClient();
}

function createDummyClient() {
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: () => Promise.resolve({ data: { user: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: { user: null }, error: null }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null })
        }),
        order: () => Promise.resolve({ data: [], error: null })
      }),
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null })
        })
      }),
      update: () => ({
        eq: () => Promise.resolve({ error: null })
      }),
      delete: () => ({
        eq: () => Promise.resolve({ error: null })
      })
    })
  };
}

export { supabase };

// Types for our database tables
export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company?: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  title: string;
  type: string;
  company: string;
  status: string;
  icon: string;
  color: string;
  current_question_index: number;
  answers: Record<number, string>;
  editable_content?: string;
  progress: number;
  created_at: string;
  updated_at: string;
}

export interface WaitingListEntry {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: string;
  stripe_payment_intent_id?: string;
  created_at: string;
}