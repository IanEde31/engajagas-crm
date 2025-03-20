import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { X, Plus } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Pedido } from "../../entities/Pedido";

export default function PedidoForm({ isOpen, onClose, onSave, pedidoToEdit = null }) {
  const [formData, setFormData] = useState({
    cliente: "",
    telefone: "",
    endereco: {
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      complemento: ""
    },
    itens: [{ nome: "", quantidade: 1, preco: 0 }],
    status: "Pedido recebido",
    observacoes: "",
    data: new Date().toISOString()
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pedidoToEdit) {
      setFormData({
        ...pedidoToEdit,
        // Garante que sempre temos pelo menos um item
        itens: pedidoToEdit.itens?.length ? pedidoToEdit.itens : [{ nome: "", quantidade: 1, preco: 0 }]
      });
    } else {
      resetForm();
    }
  }, [pedidoToEdit, isOpen]);

  const resetForm = () => {
    setFormData({
      cliente: "",
      telefone: "",
      endereco: {
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        complemento: ""
      },
      itens: [{ nome: "", quantidade: 1, preco: 0 }],
      status: "Pedido recebido",
      observacoes: "",
      data: new Date().toISOString()
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      endereco: { ...prev.endereco, [name]: value }
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData((prev) => {
      const newItens = [...prev.itens];
      newItens[index] = { ...newItens[index], [field]: value };
      
      // Calcula o valor total
      const valor = newItens.reduce((total, item) => {
        return total + (parseFloat(item.preco) || 0) * (parseInt(item.quantidade) || 0);
      }, 0);
      
      return { ...prev, itens: newItens, valor };
    });
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      itens: [...prev.itens, { nome: "", quantidade: 1, preco: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (formData.itens.length > 1) {
      setFormData((prev) => {
        const newItens = prev.itens.filter((_, i) => i !== index);
        
        // Recalcula o valor total
        const valor = newItens.reduce((total, item) => {
          return total + (parseFloat(item.preco) || 0) * (parseInt(item.quantidade) || 0);
        }, 0);
        
        return { ...prev, itens: newItens, valor };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let result;
      
      if (pedidoToEdit?.id) {
        result = await Pedido.update(pedidoToEdit.id, formData);
      } else {
        result = await Pedido.create(formData);
      }
      
      onSave(result);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar pedido:", error);
      alert("Erro ao salvar pedido. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const produtosDisponiveis = [
    { nome: "Botijão P13", preco: 120 },
    { nome: "Botijão P45", preco: 360 },
    { nome: "Galão de Água 20L", preco: 15 },
    { nome: "Água Mineral 500ml", preco: 2.5 }
  ];

  const handleProdutoChange = (index, value) => {
    const produto = produtosDisponiveis.find(p => p.nome === value);
    if (produto) {
      handleItemChange(index, "nome", produto.nome);
      handleItemChange(index, "preco", produto.preco);
    }
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <DialogPrimitive.Content className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">
                {pedidoToEdit ? "Editar Pedido" : "Novo Pedido"}
              </h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* Informações do Cliente */}
              <div className="space-y-2">
                <h3 className="font-medium">Informações do Cliente</h3>
                
                <div>
                  <label className="text-sm text-gray-500">Nome</label>
                  <Input
                    name="cliente"
                    value={formData.cliente}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Telefone</label>
                  <Input
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-2">
                <h3 className="font-medium">Endereço</h3>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="text-sm text-gray-500">Rua</label>
                    <Input
                      name="rua"
                      value={formData.endereco.rua}
                      onChange={handleEnderecoChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500">Número</label>
                    <Input
                      name="numero"
                      value={formData.endereco.numero}
                      onChange={handleEnderecoChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm text-gray-500">Bairro</label>
                    <Input
                      name="bairro"
                      value={formData.endereco.bairro}
                      onChange={handleEnderecoChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500">Cidade</label>
                    <Input
                      name="cidade"
                      value={formData.endereco.cidade}
                      onChange={handleEnderecoChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Complemento</label>
                  <Input
                    name="complemento"
                    value={formData.endereco.complemento}
                    onChange={handleEnderecoChange}
                  />
                </div>
              </div>

              {/* Itens do Pedido */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="font-medium">Itens do Pedido</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addItem}
                    className="h-7 px-2"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Adicionar
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {formData.itens.map((item, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <label className="text-sm text-gray-500">Produto</label>
                        <Select
                          value={item.nome}
                          onValueChange={(value) => handleProdutoChange(index, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um produto" />
                          </SelectTrigger>
                          <SelectContent>
                            {produtosDisponiveis.map((p) => (
                              <SelectItem key={p.nome} value={p.nome}>
                                {p.nome} - R$ {p.preco.toFixed(2)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="w-20">
                        <label className="text-sm text-gray-500">Qtd.</label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantidade}
                          onChange={(e) => 
                            handleItemChange(index, "quantidade", parseInt(e.target.value) || 1)
                          }
                          required
                        />
                      </div>
                      
                      <div className="w-24">
                        <label className="text-sm text-gray-500">Preço</label>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.preco}
                          onChange={(e) => 
                            handleItemChange(index, "preco", parseFloat(e.target.value) || 0)
                          }
                          required
                        />
                      </div>
                      
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                        disabled={formData.itens.length <= 1}
                        className="h-10 px-2"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-2 border-t">
                  <span className="font-medium">Total:</span>
                  <span className="font-medium">
                    R$ {formData.itens.reduce((total, item) => total + (item.preco * item.quantidade), 0).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Observações */}
              <div>
                <label className="text-sm text-gray-500">Observações</label>
                <textarea
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm"
                  rows={3}
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-sm text-gray-500">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
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

              {/* Botões de Ação */}
              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </form>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
