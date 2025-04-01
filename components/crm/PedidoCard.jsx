import React from "react";
import { Card, CardContent } from "../ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { GripVertical } from "lucide-react";

export default function PedidoCard({ pedido, onClick, isDragging }) {
  const formatarData = (data) => {
    return format(new Date(data), "dd/MM HH:mm", { locale: ptBR });
  };

  // Definir cores para os status
  const statusColors = {
    "Pedido recebido": "default",
    "Enviado Para Entrega": "warning",
    "Saiu para Entrega": "warning",
    "Entregue": "success",
    "Cancelado": "destructive",
    "Agendado": "secondary"
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer hover:shadow-md transition-all duration-200",
        isDragging ? "shadow-lg border-blue-400" : "shadow-sm"
      )}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <GripVertical className="h-4 w-4 mr-1 text-gray-400 drag-handle" />
              <span className="text-sm font-medium text-blue-600">#{pedido.id}</span>
            </div>
            <Badge variant={statusColors[pedido.status] || "default"} className="text-xs">
              {pedido.status}
            </Badge>
          </div>

          <h4 className="font-medium truncate mt-1">{pedido.cliente}</h4>
          
          <div className="text-sm text-gray-600 truncate">
            {pedido.endereco?.bairro}, {pedido.endereco?.cidade}
          </div>
          
          <div className="flex justify-between items-center mt-1">
            <div className="text-sm font-medium">
              R$ {pedido.valor?.toFixed(2)}
            </div>
            
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">{formatarData(pedido.data)}</span>
              <span className="text-xs bg-gray-100 px-1 rounded">
                {pedido.itens?.length} {pedido.itens?.length === 1 ? 'item' : 'itens'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
