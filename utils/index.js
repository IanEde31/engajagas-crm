export function createPageUrl(pageName) {
  const routes = {
    dashboard: '/',
    crm: '/crm',
    novoPedido: '/novo-pedido',
    integracao: '/integracao'
  };
  
  return routes[pageName] || '/';
}

// Status disponíveis para os pedidos
export const STATUS_PEDIDO = {
  RECEBIDO: "Pedido recebido",
  ENVIADO_PARA_ENTREGA: "Enviado Para Entrega",
  SAIU_PARA_ENTREGA: "Saiu para Entrega",
  ENTREGUE: "Entregue",
  CANCELADO: "Cancelado",
  AGENDADO: "Agendado"
};

// Cores para cada status
export const STATUS_COLORS = {
  [STATUS_PEDIDO.RECEBIDO]: "bg-blue-500",
  [STATUS_PEDIDO.ENVIADO_PARA_ENTREGA]: "bg-yellow-500",
  [STATUS_PEDIDO.SAIU_PARA_ENTREGA]: "bg-orange-500",
  [STATUS_PEDIDO.ENTREGUE]: "bg-green-500",
  [STATUS_PEDIDO.CANCELADO]: "bg-red-500",
  [STATUS_PEDIDO.AGENDADO]: "bg-purple-500"
};

// Função para atualizar o status de um pedido
export async function atualizarStatusPedido(pedidoId, novoStatus) {
  try {
    // Importação dinâmica para evitar problemas de referência circular
    const { Pedido } = await import('../entities/Pedido');
    
    // Atualiza o pedido no banco de dados usando o método estático
    const pedidoAtualizado = await Pedido.update(pedidoId, { status: novoStatus });
    return pedidoAtualizado;
  } catch (error) {
    console.error("Erro ao atualizar status do pedido:", error);
    throw error;
  }
}

// Função para reorganizar pedidos após drag and drop
export function reorganizarPedidosAposDragDrop(pedidos, colunas, pedidoId, novoStatus, sourceStatus, destinationIndex) {
  // Criar cópia do pedido com novo status
  const pedido = pedidos.find(p => p.id === pedidoId);
  const novoPedido = { ...pedido, status: novoStatus };
  
  // Atualizar lista de pedidos
  const novosPedidos = pedidos.map(p => 
    p.id === pedidoId ? novoPedido : p
  );
  
  // Reorganizar colunas
  const novasColunas = {};
  Object.keys(colunas).forEach(status => {
    if (status === sourceStatus) {
      // Remover da coluna origem
      novasColunas[status] = colunas[status].filter(p => p.id !== pedidoId);
    } else if (status === novoStatus) {
      // Adicionar na coluna destino
      const colunaCopia = [...colunas[status]];
      colunaCopia.splice(destinationIndex, 0, novoPedido);
      novasColunas[status] = colunaCopia;
    } else {
      // Manter outras colunas inalteradas
      novasColunas[status] = colunas[status];
    }
  });
  
  return { novosPedidos, novasColunas };
}
