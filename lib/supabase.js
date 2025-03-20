// Configuração do cliente Supabase para acesso ao banco de dados
import { createClient } from '@supabase/supabase-js';

// Obter as variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Log para debug
if (typeof window !== 'undefined') {
  console.log('Supabase URL:', supabaseUrl ? supabaseUrl.substring(0, 15) + '...' : 'não definido');
  console.log('Supabase Key:', supabaseAnonKey ? 'configurada (oculta)' : 'não definida');
}

// Verificar se as variáveis de ambiente estão definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Variáveis de ambiente do Supabase não configuradas corretamente');
}

// Criar e exportar o cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
