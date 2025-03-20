import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Layout from "../../components/layout";
import KanbanColumn from "../../components/crm/KanbanColumn";
import PedidoModal from "../../components/crm/PedidoModal";
import PedidoForm from "../../components/crm/PedidoForm";
import { Button } from "../../components/ui/button";
import { Pedido } from "../../entities/Pedido";
import { Plus } from "lucide-react";

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [colunas, setColunas] = useState({});
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [formAberto, setFormAberto] = useState(false);
  const [pedidoParaEditar, setPedidoParaEditar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Configuração das colunas
  const configColunas = {
    "Pedido recebido": {
      id: "pedido-recebido",
      titulo: "Pedido recebido",
      cor: "bg-blue-500",
    },
    "Enviado Para Entrega": {
      id: "enviado-para-entrega",
      titulo: "Enviado Para Entrega",
      cor: "bg-yellow-500",
    },
    "Saiu para Entrega": {
      id: "saiu-para-entrega",
      titulo: "Saiu para Entrega",
      cor: "bg-orange-500",
    },
    "Entregue": {
      id: "entregue",
      titulo: "Entregue",
      cor: "bg-green-500",
    },
    "Cancelado": {
      id: "cancelado",
      titulo: "Cancelado",
      cor: "bg-red-500",
    },
    "Agendado": {
      id: "agendado",
      titulo: "Agendado",
      cor: "bg-purple-500",
    },
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    setIsLoading(true);
    try {
      const todosPedidos = await Pedido.getAll();
      setPedidos(todosPedidos);
      
      // Agrupar pedidos por status para as colunas
      const pedidosPorStatus = {};
      Object.keys(configColunas).forEach(status => {
        pedidosPorStatus[status] = todosPedidos.filter(
          pedido => pedido.status === status
        );
      });
      
      setColunas(pedidosPorStatus);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // Se não houver destino ou se o pedido for solto na mesma posição
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    const pedidoId = parseInt(draggableId);
    const pedido = pedidos.find(p => p.id === pedidoId);
    
    // Identificar o novo status com base no id do droppable
    const novoStatus = Object.keys(configColunas).find(
      status => configColunas[status].id === destination.droppableId
    );

    if (pedido && novoStatus && pedido.status !== novoStatus) {
      // Atualizar UI imediatamente
      const novoPedido = { ...pedido, status: novoStatus };
      
      // Atualizar estado dos pedidos
      const novosPedidos = pedidos.map(p => 
        p.id === pedidoId ? novoPedido : p
      );
      
      setPedidos(novosPedidos);
      
      // Reorganizar colunas
      const novasColunas = {};
      Object.keys(configColunas).forEach(status => {
        if (status === source.droppableId) {
          // Remover da coluna origem
          novasColunas[status] = colunas[status].filter(p => p.id !== pedidoId);
        } else if (status === novoStatus) {
          // Adicionar na coluna destino
          const colunaCopia = [...colunas[status]];
          colunaCopia.splice(destination.index, 0, novoPedido);
          novasColunas[status] = colunaCopia;
        } else {
          // Manter outras colunas inalteradas
          novasColunas[status] = colunas[status];
        }
      });
      
      setColunas(novasColunas);
      
      // Atualizar no banco de dados
      try {
        await Pedido.update(pedidoId, { status: novoStatus });
      } catch (error) {
        console.error("Erro ao atualizar status do pedido:", error);
        // Em caso de erro, recarregar os dados originais
        carregarPedidos();
      }
    }
  };

  const handlePedidoClick = (pedido) => {
    setPedidoSelecionado(pedido);
    setModalAberto(true);
  };

  const handleStatusChange = async (pedidoId, novoStatus) => {
    try {
      await Pedido.update(pedidoId, { status: novoStatus });
      // Recarregar pedidos após a atualização
      carregarPedidos();
      setModalAberto(false);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const handleExcluirPedido = async (pedidoId) => {
    try {
      await Pedido.delete(pedidoId);
      carregarPedidos();
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
    }
  };

  const handleNovoPedido = () => {
    setPedidoParaEditar(null);
    setFormAberto(true);
  };

  const handleEditarPedido = (pedido) => {
    setPedidoParaEditar(pedido);
    setFormAberto(true);
    setModalAberto(false);
  };

  const handleSalvarPedido = async () => {
    await carregarPedidos();
    setFormAberto(false);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Pedidos</h1>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {Object.keys(configColunas).map((status) => (
              <div key={status} className="w-72 h-96 bg-gray-100 rounded-md animate-pulse"></div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Pedidos</h1>
          <Button onClick={handleNovoPedido}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Pedido
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {Object.keys(configColunas).map((status) => (
              <KanbanColumn
                key={status}
                id={configColunas[status].id}
                title={configColunas[status].titulo}
                color={configColunas[status].cor}
                pedidos={colunas[status] || []}
                onPedidoClick={handlePedidoClick}
              />
            ))}
          </div>
        </DragDropContext>
      </div>

      {pedidoSelecionado && (
        <PedidoModal
          pedido={pedidoSelecionado}
          isOpen={modalAberto}
          onClose={() => setModalAberto(false)}
          onStatusChange={handleStatusChange}
          onDelete={handleExcluirPedido}
          onEdit={() => handleEditarPedido(pedidoSelecionado)}
        />
      )}

      <PedidoForm
        isOpen={formAberto}
        onClose={() => setFormAberto(false)}
        onSave={handleSalvarPedido}
        pedidoToEdit={pedidoParaEditar}
      />
    </Layout>
  );
}
