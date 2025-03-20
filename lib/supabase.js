import { createClient } from '@supabase/supabase-js';

// Estas são chaves públicas de exemplo. Em produção, use variáveis de ambiente.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sua-url-do-supabase.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sua-chave-publica-do-supabase';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
