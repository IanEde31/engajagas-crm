import { supabase } from '../lib/supabase';

export class Pedido {
  constructor(data) {
    this.id = data.id;
    this.cliente = data.cliente;
    this.telefone = data.telefone;
    this.endereco = data.endereco;
    this.valor = data.valor;
    this.status = data.status;
    this.data = data.data;
    this.itens = data.itens || [];
    this.observacoes = data.observacoes;
  }

  static async getAll() {
    try {
      console.log('Iniciando busca de pedidos...');
      console.log('URL do Supabase:', process.env.NEXT_PUBLIC_SUPABASE_URL);
      
      const { data, error } = await supabase
        .from('pedidos')
        .select('*')
        .order('data', { ascending: false });

      if (error) {
        console.error('Erro Supabase:', error);
        throw error;
      }
      
      console.log('Pedidos encontrados:', data ? data.length : 0);
      return data.map(pedido => new Pedido(pedido));
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      return [];
    }
  }

  static async getById(id) {
    try {
      const { data, error } = await supabase
        .from('pedidos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      return new Pedido(data);
    } catch (error) {
      console.error(`Erro ao buscar pedido ${id}:`, error);
      return null;
    }
  }

  static async create(pedidoData) {
    try {
      const { data, error } = await supabase
        .from('pedidos')
        .insert([pedidoData])
        .select();

      if (error) throw error;
      
      return new Pedido(data[0]);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      return null;
    }
  }

  // Método de instância para atualizar um pedido existente
  async update(updates) {
    try {
      const { data, error } = await supabase
        .from('pedidos')
        .update(updates)
        .eq('id', this.id)
        .select();

      if (error) throw error;
      
      Object.assign(this, updates);
      return this;
    } catch (error) {
      console.error(`Erro ao atualizar pedido ${this.id}:`, error);
      return null;
    }
  }
  
  // Método estático para atualizar um pedido pelo ID
  static async update(id, updates) {
    try {
      const { data, error } = await supabase
        .from('pedidos')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      
      return data[0] ? new Pedido(data[0]) : null;
    } catch (error) {
      console.error(`Erro ao atualizar pedido ${id}:`, error);
      return null;
    }
  }

  async delete() {
    try {
      const { error } = await supabase
        .from('pedidos')
        .delete()
        .eq('id', this.id);

      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error(`Erro ao excluir pedido ${this.id}:`, error);
      return false;
    }
  }

  static async getByStatus(status) {
    try {
      const { data, error } = await supabase
        .from('pedidos')
        .select('*')
        .eq('status', status)
        .order('data', { ascending: false });

      if (error) throw error;
      
      return data.map(pedido => new Pedido(pedido));
    } catch (error) {
      console.error(`Erro ao buscar pedidos com status ${status}:`, error);
      return [];
    }
  }

  static async atualizarStatus(id, novoStatus) {
    try {
      const { data, error } = await supabase
        .from('pedidos')
        .update({ status: novoStatus })
        .eq('id', id)
        .select();

      if (error) throw error;
      
      return new Pedido(data[0]);
    } catch (error) {
      console.error(`Erro ao atualizar status do pedido ${id}:`, error);
      return null;
    }
  }
}
