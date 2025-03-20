import { supabase } from '../lib/supabase';

export class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.nome = data.nome;
    this.cargo = data.cargo;
    this.avatar_url = data.avatar_url;
  }

  static async login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Buscar informações adicionais do usuário
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError) throw userError;

      return new User({
        id: data.user.id,
        email: data.user.email,
        ...userData
      });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return null;
    }
  }

  static async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      return false;
    }
  }

  static async getCurrentUser() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) return null;

      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (userError) throw userError;

      return new User({
        id: session.user.id,
        email: session.user.email,
        ...userData
      });
    } catch (error) {
      console.error('Erro ao obter usuário atual:', error);
      return null;
    }
  }
}
