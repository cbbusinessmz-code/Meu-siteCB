
import { createClient } from '@supabase/supabase-js';

// Credenciais fornecidas pelo usuário para sincronização real
const PROVIDED_URL = 'https://godaswedwiopldcaeuvq.supabase.co';
const PROVIDED_KEY = 'sb_publishable_BZ4EUkworgGfHC5-gdw3iQ_MF4FfLnT';

// Prioriza variáveis de ambiente, caso existam, caso contrário usa as fornecidas
const supabaseUrl = process.env.SUPABASE_URL || PROVIDED_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || PROVIDED_KEY;

// Verifica se a configuração é válida
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder')
);

if (isSupabaseConfigured) {
  console.info("Supabase configurado com sucesso. Conectando a:", supabaseUrl);
} else {
  console.warn("Supabase não configurado corretamente. O sistema operará em Modo Local.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
