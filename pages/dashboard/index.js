import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import StatusCard from "../../components/dashboard/StatusCard";
import RecentOrdersTable from "../../components/dashboard/RecentOrdersTable";
import SalesChart from "../../components/dashboard/SalesChart";
import ProductChart from "../../components/dashboard/ProductChart";
import { Pedido } from "../../entities/Pedido";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../components/ui/select";
import { 
  ShoppingCart, 
  TrendingUp, 
  Check, 
  Clock,
  Filter,
  RefreshCw
} from "lucide-react";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPedidos: 0,
    pedidosHoje: 0,
    pedidosEntregues: 0,
    pedidosEmAndamento: 0
  });
  const [pedidosRecentes, setPedidosRecentes] = useState([]);
  const [dadosVendas, setDadosVendas] = useState([]);
  const [dadosProdutos, setDadosProdutos] = useState([]);
  const [filtros, setFiltros] = useState({
    dataInicio: '',
    dataFim: '',
    status: 'todos'
  });
  const [todosPedidos, setTodosPedidos] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    if (todosPedidos.length > 0) {
      aplicarFiltros();
    }
  }, [filtros, todosPedidos]);

  const carregarDados = async () => {
    try {
      setIsLoading(true);
      
      // Carregar todos os pedidos
      const pedidos = await Pedido.getAll();
      setTodosPedidos(pedidos);
      
      // Pedidos recentes
      const recentes = [...pedidos]
        .sort((a, b) => new Date(b.data) - new Date(a.data))
        .slice(0, 5);
      setPedidosRecentes(recentes);
      
      // Estatísticas
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      
      const pedidosHoje = pedidos.filter(p => 
        new Date(p.data) >= hoje
      ).length;
      
      const pedidosEntregues = pedidos.filter(p => 
        p.status === "Entregue"
      ).length;
      
      const pedidosEmAndamento = pedidos.filter(p => 
        p.status !== "Entregue" && p.status !== "Cancelado"
      ).length;
      
      setStats({
        totalPedidos: pedidos.length,
        pedidosHoje,
        pedidosEntregues,
        pedidosEmAndamento
      });
      
      // Dados para o gráfico de vendas
      processarDadosVendas(pedidos);
      
      // Dados para o gráfico de produtos
      processarDadosProdutos(pedidos);
      
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const processarDadosVendas = (pedidos) => {
    const ultimosMeses = new Array(6).fill(0).map((_, i) => {
      const data = new Date();
      data.setMonth(data.getMonth() - i);
      return {
        date: data,
        name: data.toLocaleDateString('pt-BR', { month: 'short' }),
        valor: 0,
        count: 0
      };
    }).reverse();
    
    pedidos.forEach(pedido => {
      const dataPedido = new Date(pedido.data);
      
      ultimosMeses.forEach(mes => {
        if (
          dataPedido.getMonth() === mes.date.getMonth() && 
          dataPedido.getFullYear() === mes.date.getFullYear()
        ) {
          mes.valor += pedido.valor || 0;
          mes.count += 1;
        }
      });
    });
    
    setDadosVendas(ultimosMeses);
  };

  const processarDadosProdutos = (pedidos) => {
    const produtos = {};
    
    pedidos.forEach(pedido => {
      if (pedido.itens) {
        pedido.itens.forEach(item => {
          const nomeProduto = item.nome;
          if (!produtos[nomeProduto]) {
            produtos[nomeProduto] = 0;
          }
          produtos[nomeProduto] += item.quantidade;
        });
      }
    });
    
    const dadosProdutosFormatados = Object.keys(produtos).map(nome => ({
      name: nome,
      value: produtos[nome]
    }));
    
    setDadosProdutos(dadosProdutosFormatados);
  };

  const aplicarFiltros = () => {
    let pedidosFiltrados = [...todosPedidos];
    
    // Filtrar por data de início
    if (filtros.dataInicio) {
      const dataInicio = new Date(filtros.dataInicio);
      dataInicio.setHours(0, 0, 0, 0);
      pedidosFiltrados = pedidosFiltrados.filter(p => 
        new Date(p.data) >= dataInicio
      );
    }
    
    // Filtrar por data de fim
    if (filtros.dataFim) {
      const dataFim = new Date(filtros.dataFim);
      dataFim.setHours(23, 59, 59, 999);
      pedidosFiltrados = pedidosFiltrados.filter(p => 
        new Date(p.data) <= dataFim
      );
    }
    
    // Filtrar por status
    if (filtros.status !== 'todos') {
      pedidosFiltrados = pedidosFiltrados.filter(p => 
        p.status === filtros.status
      );
    }
    
    // Recalcular estatísticas com os dados filtrados
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const pedidosHoje = pedidosFiltrados.filter(p => 
      new Date(p.data) >= hoje
    ).length;
    
    const pedidosEntregues = pedidosFiltrados.filter(p => 
      p.status === "Entregue"
    ).length;
    
    const pedidosEmAndamento = pedidosFiltrados.filter(p => 
      p.status !== "Entregue" && p.status !== "Cancelado"
    ).length;
    
    setStats({
      totalPedidos: pedidosFiltrados.length,
      pedidosHoje,
      pedidosEntregues,
      pedidosEmAndamento
    });
    
    // Atualizar pedidos recentes
    const recentes = [...pedidosFiltrados]
      .sort((a, b) => new Date(b.data) - new Date(a.data))
      .slice(0, 5);
    setPedidosRecentes(recentes);
    
    // Atualizar gráficos
    processarDadosVendas(pedidosFiltrados);
    processarDadosProdutos(pedidosFiltrados);
  };

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const limparFiltros = () => {
    setFiltros({
      dataInicio: '',
      dataFim: '',
      status: 'todos'
    });
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        
        {/* Filtros */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-gray-500 block mb-1">Data Início</label>
                <Input 
                  type="date" 
                  value={filtros.dataInicio}
                  onChange={(e) => handleFiltroChange('dataInicio', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">Data Fim</label>
                <Input 
                  type="date" 
                  value={filtros.dataFim}
                  onChange={(e) => handleFiltroChange('dataFim', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">Status</label>
                <Select
                  value={filtros.status}
                  onValueChange={(value) => handleFiltroChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Pedido recebido">Pedido recebido</SelectItem>
                    <SelectItem value="Enviado Para Entrega">Enviado Para Entrega</SelectItem>
                    <SelectItem value="Saiu para Entrega">Saiu para Entrega</SelectItem>
                    <SelectItem value="Entregue">Entregue</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                    <SelectItem value="Agendado">Agendado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={limparFiltros}
                  className="flex-1"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Limpar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatusCard 
            title="Total de Pedidos" 
            value={stats.totalPedidos}
            icon={ShoppingCart}
            iconColor="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatusCard 
            title="Pedidos Hoje" 
            value={stats.pedidosHoje}
            icon={Clock}
            iconColor="text-yellow-600"
            bgColor="bg-yellow-100"
          />
          <StatusCard 
            title="Pedidos Entregues" 
            value={stats.pedidosEntregues}
            icon={Check}
            iconColor="text-green-600"
            bgColor="bg-green-100"
          />
          <StatusCard 
            title="Em Andamento" 
            value={stats.pedidosEmAndamento}
            icon={TrendingUp}
            iconColor="text-purple-600"
            bgColor="bg-purple-100"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <SalesChart data={dadosVendas} isLoading={isLoading} title="Vendas por Mês" />
          </div>
          <div className="lg:col-span-1">
            <ProductChart data={dadosProdutos} isLoading={isLoading} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Pedidos Recentes</h2>
          </div>
          <div className="p-4">
            <RecentOrdersTable pedidos={pedidosRecentes} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
