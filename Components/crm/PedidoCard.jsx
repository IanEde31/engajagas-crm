import React from "react";
import { Card, CardContent } from "../ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "../../lib/utils";

export default function PedidoCard({ pedido, onClick, isDragging }) {
  const formatarData = (data) => {
    return format(new Date(data), "dd/MM HH:mm", { locale: ptBR });
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer hover:shadow-md transition-shadow",
        isDragging ? "shadow-lg" : "shadow-sm"
      )}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-blue-600">#{pedido.id}</span>
            <span className="text-xs text-gray-500">{formatarData(pedido.data)}</span>
          </div>

          <h4 className="font-medium truncate">{pedido.cliente}</h4>
          
          <div className="text-sm text-gray-600 truncate">
            {pedido.endereco?.bairro}, {pedido.endereco?.cidade}
          </div>
          
          <div className="flex justify-between items-center mt-1">
            <div className="text-sm font-medium">
              R$ {pedido.valor?.toFixed(2)}
            </div>
            
            <div className="text-xs">
              {pedido.itens?.length} {pedido.itens?.length === 1 ? 'item' : 'itens'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
