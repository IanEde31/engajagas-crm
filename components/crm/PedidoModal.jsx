import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { cn } from "../../lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { STATUS_PEDIDO, atualizarStatusPedido } from "../../utils/index";

export default function PedidoModal({ 
  pedido, 
  isOpen, 
  onClose, 
  onStatusChange,
  onDelete 
}) {
  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (pedido) {
      setStatus(pedido.status);
    }
  }, [pedido]);

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
  };

  const saveStatusChange = async () => {
    if (status !== pedido.status) {
      setLoading(true);
      try {
        await onStatusChange(pedido.id, status);
      } catch (error) {
        console.error("Erro ao salvar alteração de status:", error);
        alert("Erro ao atualizar status do pedido");
      } finally {
        setLoading(false);
      }
    }
  };
  
  // Função para marcar pedido como entregue rapidamente
  const marcarComoEntregue = async () => {
    if (pedido.status !== STATUS_PEDIDO.ENTREGUE) {
      setLoading(true);
      try {
        await onStatusChange(pedido.id, STATUS_PEDIDO.ENTREGUE);
      } catch (error) {
        console.error("Erro ao marcar pedido como entregue:", error);
        alert("Erro ao marcar pedido como entregue");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este pedido?")) {
      setLoading(true);
      await onDelete(pedido.id);
      setLoading(false);
      onClose();
    }
  };

  if (!pedido) return null;

  const statusColors = {
    "Pedido recebido": "default",
    "Enviado Para Entrega": "warning",
    "Saiu para Entrega": "warning",
    "Entregue": "success",
    "Cancelado": "destructive",
    "Agendado": "secondary"
  };

  const formatarData = (data) => {
    return format(new Date(data), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <DialogPrimitive.Content className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Pedido #{pedido.id}</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Cliente</p>
                  <p className="font-medium">{pedido.cliente}</p>
                </div>
                <Badge variant={statusColors[pedido.status]}>
                  {pedido.status}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-gray-500">Data</p>
                <p>{formatarData(pedido.data)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Telefone</p>
                <p>{pedido.telefone}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Endereço</p>
                <p>{pedido.endereco?.rua}, {pedido.endereco?.numero}</p>
                <p>{pedido.endereco?.bairro}, {pedido.endereco?.cidade}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Itens</p>
                <ul className="mt-1 space-y-1">
                  {pedido.itens?.map((item, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>{item.quantidade}x {item.nome}</span>
                      <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 pt-2 border-t flex justify-between font-medium">
                  <span>Total:</span>
                  <span>R$ {pedido.valor?.toFixed(2)}</span>
                </div>
              </div>

              {pedido.observacoes && (
                <div>
                  <p className="text-sm text-gray-500">Observações</p>
                  <p className="text-sm">{pedido.observacoes}</p>
                </div>
              )}

              <div className="pt-2">
                <p className="text-sm text-gray-500 mb-1">Atualizar Status</p>
                <div className="flex gap-2">
                  <Select value={status} onValueChange={handleStatusChange} className="flex-1">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={STATUS_PEDIDO.RECEBIDO}>Pedido recebido</SelectItem>
                      <SelectItem value={STATUS_PEDIDO.ENVIADO_PARA_ENTREGA}>Enviado Para Entrega</SelectItem>
                      <SelectItem value={STATUS_PEDIDO.SAIU_PARA_ENTREGA}>Saiu para Entrega</SelectItem>
                      <SelectItem value={STATUS_PEDIDO.ENTREGUE}>Entregue</SelectItem>
                      <SelectItem value={STATUS_PEDIDO.CANCELADO}>Cancelado</SelectItem>
                      <SelectItem value={STATUS_PEDIDO.AGENDADO}>Agendado</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {pedido.status !== STATUS_PEDIDO.ENTREGUE && (
                    <Button 
                      variant="outline" 
                      className="bg-green-50 hover:bg-green-100 border-green-200"
                      onClick={marcarComoEntregue}
                      disabled={loading}
                      title="Marcar como entregue"
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border-t flex gap-2 justify-end">
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                disabled={loading}
              >
                Excluir
              </Button>
              <Button 
                variant="default"
                onClick={saveStatusChange}
                disabled={loading || status === pedido.status}
              >
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
