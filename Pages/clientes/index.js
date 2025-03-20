import React from "react";
import Layout from "../../components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Search, Plus, Edit, Trash2, PhoneCall } from "lucide-react";

// Esta é uma página de placeholder para clientes
// Uma versão completa necessitaria de um model Cliente e suas operações CRUD

export default function Clientes() {
  const clientesDemo = [
    { id: 1, nome: "Carlos Silva", telefone: "(11) 98765-4321", endereco: "Rua A, 123 - Centro", compras: 5 },
    { id: 2, nome: "Maria Oliveira", telefone: "(11) 91234-5678", endereco: "Av. B, 456 - Jardim", compras: 8 },
    { id: 3, nome: "João Pereira", telefone: "(11) 92345-6789", endereco: "Rua C, 789 - Vila", compras: 3 },
    { id: 4, nome: "Ana Santos", telefone: "(11) 93456-7890", endereco: "Av. D, 321 - Bairro", compras: 12 },
    { id: 5, nome: "Paulo Costa", telefone: "(11) 94567-8901", endereco: "Rua E, 654 - Centro", compras: 2 },
  ];

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Clientes</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Pesquisar clientes..." 
                  className="pl-9"
                />
              </div>
              <Button variant="outline">Filtrar</Button>
              <Button variant="outline">Limpar</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead className="hidden md:table-cell">Endereço</TableHead>
                  <TableHead className="hidden sm:table-cell">Compras</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientesDemo.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell className="font-medium">{cliente.nome}</TableCell>
                    <TableCell>{cliente.telefone}</TableCell>
                    <TableCell className="hidden md:table-cell">{cliente.endereco}</TableCell>
                    <TableCell className="hidden sm:table-cell">{cliente.compras}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <PhoneCall className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
