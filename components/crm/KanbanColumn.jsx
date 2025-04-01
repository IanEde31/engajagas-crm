import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Card } from "../ui/card";
import PedidoCard from "./PedidoCard";
import { cn } from "../../lib/utils";
import { STATUS_COLORS } from "../../utils/index";

export default function KanbanColumn({ 
  id, 
  title, 
  pedidos, 
  color = "bg-blue-500", 
  onPedidoClick 
}) {
  return (
    <div className="flex flex-col w-72 min-w-72 max-w-72 rounded-md">
      <div className={cn("px-3 py-2 rounded-t-md text-white font-medium", color)}>
        <div className="flex justify-between items-center">
          <h3>{title}</h3>
          <span className="text-sm px-2 py-1 bg-white bg-opacity-20 rounded-full">
            {pedidos.length}
          </span>
        </div>
      </div>
      
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex-1 min-h-[calc(100vh-240px)] max-h-[calc(100vh-240px)] overflow-y-auto p-2 rounded-b-md transition-colors duration-200",
              snapshot.isDraggingOver ? "bg-blue-50" : "bg-gray-50"
            )}
          >
            {pedidos.map((pedido, index) => (
              <Draggable key={pedido.id} draggableId={String(pedido.id)} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cn(
                      "mb-2 transition-transform duration-200",
                      snapshot.isDragging ? "scale-105 z-10" : ""
                    )}
                    style={{
                      ...provided.draggableProps.style,
                      ...(snapshot.isDragging ? { boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" } : {})
                    }}
                  >
                    <PedidoCard
                      pedido={pedido}
                      onClick={() => onPedidoClick(pedido)}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {pedidos.length === 0 && (
              <div className="text-center p-4 text-gray-400 italic">
                Sem pedidos
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
