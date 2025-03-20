import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Skeleton } from "../../components/ui/skeleton";

export default function RecentOrdersTable({ pedidos = [], isLoading = false }) {
  const statusColors = {
    "Pedido recebido": "default",
    "Enviado Para Entrega": "warning",
    "Saiu para Entrega": "warning",
    "Entregue": "success",
    "Cancelado": "destructive",
    "Agendado": "secondary"
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Nº Pedido</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <TableRow key={pedido.id}>
              <TableCell className="font-medium">#{pedido.id}</TableCell>
              <TableCell>{pedido.cliente}</TableCell>
              <TableCell>{pedido.telefone}</TableCell>
              <TableCell>
                <Badge 
                  variant={statusColors[pedido.status] || "default"}
                  className="whitespace-nowrap"
                >
                  {pedido.status}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(pedido.data), "dd/MM/yyyy", { locale: ptBR })}
              </TableCell>
              <TableCell className="text-right">R$ {pedido.valor.toFixed(2)}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-10 text-gray-500">
              Nenhum pedido encontrado
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
