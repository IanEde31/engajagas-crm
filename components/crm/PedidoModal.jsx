import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
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
      await onStatusChange(pedido.id, status);
      setLoading(false);
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
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pedido recebido">Pedido recebido</SelectItem>
                    <SelectItem value="Enviado Para Entrega">Enviado Para Entrega</SelectItem>
                    <SelectItem value="Saiu para Entrega">Saiu para Entrega</SelectItem>
                    <SelectItem value="Entregue">Entregue</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                    <SelectItem value="Agendado">Agendado</SelectItem>
                  </SelectContent>
                </Select>
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
                Salvar
              </Button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
