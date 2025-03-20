import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  // Apenas aceitamos método POST para inserção de dados
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  // Verificar API key para segurança
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.WEBHOOK_API_KEY || 'engajagas-api-key-2025';
  
  if (apiKey !== validApiKey) {
    return res.status(401).json({ error: 'Acesso não autorizado' });
  }

  try {
    // Extrair dados do pedido do corpo da requisição
    const pedidoData = req.body;
    
    // Validação básica - ajuste conforme suas necessidades
    if (!pedidoData.cliente || !pedidoData.telefone || !pedidoData.endereco) {
      return res.status(400).json({ 
        error: 'Dados insuficientes. Os campos cliente, telefone e endereco são obrigatórios' 
      });
    }

    // Definir status padrão para novos pedidos
    if (!pedidoData.status) {
      pedidoData.status = 'Pedido recebido';
    }

    // Definir data atual se não foi fornecida
    if (!pedidoData.data) {
      pedidoData.data = new Date().toISOString();
    }

    // Inserir o pedido no Supabase
    const { data, error } = await supabase
      .from('pedidos')
      .insert([pedidoData])
      .select();

    if (error) {
      console.error('Erro ao inserir pedido:', error);
      return res.status(500).json({ error: 'Falha ao processar o pedido', details: error.message });
    }

    // Retornar sucesso com os dados inseridos
    return res.status(201).json({ 
      success: true, 
      message: 'Pedido criado com sucesso',
      pedido: data[0]
    });
  } catch (error) {
    console.error('Erro na API de webhook:', error);
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
}
