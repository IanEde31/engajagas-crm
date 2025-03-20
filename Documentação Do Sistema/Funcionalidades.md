## Funcionalidades do Sistema

### Dashboard
**Painel com indicadores em tempo real sobre o desempenho da revenda.**

- Métricas gerais de pedidos (total, em andamento, entregues, cancelados)
- Indicadores financeiros (faturamento, ticket médio)
- Gráfico de vendas por período
- Gráfico de produtos mais vendidos
- Tabela de pedidos recentes
- Filtros por período (7 dias, 30 dias, 90 dias, todos)

### Quadro Kanban
**Gestão visual dos pedidos em diferentes estágios do processo.**

- Visualização de pedidos por status
- Drag-and-drop para mover pedidos entre colunas
- Seis colunas de status: Pedido recebido, Enviado Para Entrega, Saiu para Entrega, Entregue, Cancelado e Agendado
- Cards com informações resumidas do pedido
- Detalhe completo do pedido em modal ao clicar
- Filtros por texto e status

### Cadastro de Pedidos
**Formulário para criação manual de novos pedidos.**

- Geração automática de número de pedido
- Campos para dados do cliente (nome, telefone)
- Endereço completo para entrega
- Seleção de itens com preços pré-cadastrados
- Cálculo automático de subtotais e total
- Opções de forma de pagamento (Pix, cartão, dinheiro)
- Campo para observações

### Integração via API
**Recebimento de pedidos via integração com sistemas externos.**

- Documentação de API para integração
- Instruções para configuração em N8N
- Webhook para recebimento de pedidos
- Autenticação via chave API
- Especificação do formato de dados (JSON Schema)
- Exemplos práticos de payloads

### Detalhes do Pedido
**Visualização completa das informações de um pedido.**

- Dados completos do cliente
- Endereço de entrega
- Lista de itens do pedido
- Valores unitários e totais
- Forma de pagamento
- Datas de recebimento e entrega prevista
- Status atual e histórico
- Observações do pedido

### Controle de Status
**Gerenciamento do ciclo de vida do pedido.**

- Alteração de status via drag-and-drop no Kanban
- Alteração de status via dropdown no detalhe do pedido
- Botão de ação rápida para marcar como entregue
- Atualização em tempo real no Kanban
- Histórico de alterações de status

### Fluxos de Operação

#### Fluxo de Criação de Pedido
- Acesso à página "Novo Pedido"
- Preenchimento dos dados do cliente
- Adição dos itens do pedido
- Seleção da forma de pagamento
- Salvar pedido
- Pedido aparece no Kanban na coluna "Pedido recebido"

#### Fluxo de Entrega de Pedido
- Movimentação do pedido para "Enviado Para Entrega"
- Atualização para "Saiu para Entrega" quando o entregador sai
- Visualização dos detalhes do pedido pelo entregador
- Confirmação da entrega movendo para status "Entregue"
- Registro da data/hora de entrega