import React from 'react';
import Layout from '../components/layout';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Copy, CheckCircle as CheckIcon } from 'lucide-react';

export default function IntegracaoPage() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const webhookUrl = typeof window !== 'undefined' 
    ? `${window.location.protocol}//${window.location.host}/api/webhook/pedidos`
    : 'https://seu-site.com/api/webhook/pedidos';

  const apiKey = 'engajagas-api-key-2025';

  const examplePayload = {
    cliente: "João Silva",
    telefone: "(11) 99999-9999",
    endereco: {
      rua: "Rua das Flores",
      numero: "123",
      bairro: "Jardim Primavera",
      cidade: "São Paulo",
      complemento: "Apto 45"
    },
    itens: [
      {
        nome: "Botijão P13",
        quantidade: 1,
        preco: 120
      },
      {
        nome: "Água Mineral 500ml",
        quantidade: 2,
        preco: 2.5
      }
    ],
    observacoes: "Entregar no final da tarde, após as 17h",
    status: "Pedido recebido"
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Integração com n8n</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Webhook para Recebimento de Pedidos</h2>
            <p className="mb-4">
              Esta API permite que você envie novos pedidos para o sistema CRM-EngajaGás diretamente do n8n.
              Abaixo você encontrará todas as informações necessárias para configurar a integração.
            </p>

            <Tabs defaultValue="configuracao">
              <TabsList className="mb-4">
                <TabsTrigger value="configuracao">Configuração do n8n</TabsTrigger>
                <TabsTrigger value="documentacao">Documentação API</TabsTrigger>
                <TabsTrigger value="exemplo">Exemplo</TabsTrigger>
              </TabsList>

              <TabsContent value="configuracao">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Passo a passo para configurar o n8n</h3>
                  
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Acesse sua instância do n8n e crie um novo workflow</li>
                    <li>Adicione um trigger conforme sua necessidade (HTTP, Schedule, etc.)</li>
                    <li>Adicione um nó "HTTP Request" e configure-o conforme abaixo:</li>
                  </ol>

                  <div className="bg-gray-100 p-4 rounded-md space-y-2 mt-4">
                    <div>
                      <span className="font-medium">Método:</span> POST
                    </div>
                    <div>
                      <span className="font-medium">URL:</span> 
                      <div className="flex items-center mt-1">
                        <code className="bg-gray-200 p-2 rounded flex-1 text-sm">{webhookUrl}</code>
                        <button 
                          onClick={() => handleCopy(webhookUrl)} 
                          className="ml-2 p-2 rounded hover:bg-gray-200"
                        >
                          {copied ? <CheckIcon className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Headers:</span>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <code className="bg-gray-200 p-2 rounded text-sm">Content-Type</code>
                        <code className="bg-gray-200 p-2 rounded text-sm">application/json</code>
                        <code className="bg-gray-200 p-2 rounded text-sm">x-api-key</code>
                        <div className="flex items-center">
                          <code className="bg-gray-200 p-2 rounded flex-1 text-sm">{apiKey}</code>
                          <button 
                            onClick={() => handleCopy(apiKey)} 
                            className="ml-2 p-2 rounded hover:bg-gray-200"
                          >
                            {copied ? <CheckIcon className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documentacao">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Documentação da API</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Endpoint</h4>
                      <code className="block bg-gray-200 p-2 rounded mt-1">{webhookUrl}</code>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Método</h4>
                      <code className="block bg-gray-200 p-2 rounded mt-1">POST</code>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Headers Requeridos</h4>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <code className="bg-gray-200 p-2 rounded">Content-Type</code>
                        <code className="bg-gray-200 p-2 rounded">application/json</code>
                        <code className="bg-gray-200 p-2 rounded">x-api-key</code>
                        <code className="bg-gray-200 p-2 rounded">{apiKey}</code>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Corpo da Requisição (JSON)</h4>
                      <div className="mt-1 relative">
                        <pre className="bg-gray-200 p-2 rounded overflow-x-auto">
                          <code>{JSON.stringify({
                            cliente: "Nome do cliente (obrigatório)",
                            telefone: "Telefone do cliente (obrigatório)",
                            endereco: {
                              rua: "Nome da rua (obrigatório)",
                              numero: "Número (obrigatório)",
                              bairro: "Bairro (obrigatório)",
                              cidade: "Cidade (obrigatório)",
                              complemento: "Complemento (opcional)"
                            },
                            itens: [
                              {
                                nome: "Nome do produto",
                                quantidade: 1,
                                preco: 100.0
                              }
                            ],
                            observacoes: "Observações do pedido (opcional)",
                            status: "Status inicial (opcional, padrão: 'Pedido recebido')"
                          }, null, 2)}</code>
                        </pre>
                        <button 
                          onClick={() => handleCopy(JSON.stringify({
                            cliente: "Nome do cliente (obrigatório)",
                            telefone: "Telefone do cliente (obrigatório)",
                            endereco: {
                              rua: "Nome da rua (obrigatório)",
                              numero: "Número (obrigatório)",
                              bairro: "Bairro (obrigatório)",
                              cidade: "Cidade (obrigatório)",
                              complemento: "Complemento (opcional)"
                            },
                            itens: [
                              {
                                nome: "Nome do produto",
                                quantidade: 1,
                                preco: 100.0
                              }
                            ],
                            observacoes: "Observações do pedido (opcional)",
                            status: "Status inicial (opcional, padrão: 'Pedido recebido')"
                          }, null, 2))} 
                          className="absolute top-2 right-2 p-2 rounded hover:bg-gray-300"
                        >
                          {copied ? <CheckIcon className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Resposta de Sucesso (201 Created)</h4>
                      <pre className="bg-gray-200 p-2 rounded mt-1 overflow-x-auto">
                        <code>{JSON.stringify({
                          success: true,
                          message: "Pedido criado com sucesso",
                          pedido: {
                            id: 123,
                            /* outros campos do pedido */
                          }
                        }, null, 2)}</code>
                      </pre>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Respostas de Erro</h4>
                      <ul className="list-disc list-inside space-y-2 mt-1">
                        <li><strong>400 Bad Request</strong>: Dados insuficientes ou inválidos</li>
                        <li><strong>401 Unauthorized</strong>: API key inválida ou não fornecida</li>
                        <li><strong>405 Method Not Allowed</strong>: Método HTTP não suportado</li>
                        <li><strong>500 Internal Server Error</strong>: Erro no servidor</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="exemplo">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Exemplo de Integração</h3>
                  
                  <p>Aqui está um exemplo completo de um pedido que pode ser enviado via n8n:</p>
                  
                  <div className="relative">
                    <pre className="bg-gray-200 p-2 rounded overflow-x-auto">
                      <code>{JSON.stringify(examplePayload, null, 2)}</code>
                    </pre>
                    <button 
                      onClick={() => handleCopy(JSON.stringify(examplePayload, null, 2))} 
                      className="absolute top-2 right-2 p-2 rounded hover:bg-gray-300"
                    >
                      {copied ? <CheckIcon className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>

                  <div className="bg-blue-100 p-4 rounded mt-4 border-l-4 border-blue-500">
                    <h4 className="font-medium flex items-center">
                      <span className="mr-2">Dica para uso no n8n</span>
                    </h4>
                    <p className="mt-1">
                      No n8n, você pode mapear dinamicamente os campos usando a sintaxe de 
                      expressão (por exemplo, <code>{'{{$json.nome}}'}</code>) para preencher 
                      os dados do pedido com informações provenientes de nós anteriores no fluxo.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
