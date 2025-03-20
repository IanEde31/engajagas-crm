## Visão Geral do Sistema

### Sobre o GasControl
O **GasControl** é um sistema CRM (Customer Relationship Management) completo desenvolvido especificamente para revendas de gás, permitindo o controle eficiente de pedidos, desde o recebimento até a entrega aos clientes.

O sistema conta com:
- Um dashboard para visualização em tempo real de métricas importantes do negócio.
- Um quadro Kanban para gestão visual dos pedidos.
- Possibilidade de cadastro manual de pedidos.
- Integração com sistemas externos via API.

### Arquitetura do Sistema
O GasControl foi desenvolvido como uma aplicação web moderna usando a plataforma **Base44**, que fornece a infraestrutura necessária para armazenamento de dados, autenticação de usuários e hospedagem. A arquitetura segue o padrão **MVC (Model-View-Controller)** adaptado:

- **Model:** Entidades definidas como JSON Schema que descrevem os dados armazenados.
- **View:** Interface do usuário construída com React e Tailwind CSS para estilização.
- **Controller:** Lógica de negócios implementada nos componentes React e nas funções de manipulação de dados.

### Principais Características Técnicas:
- Frontend construído em React com componentes reutilizáveis.
- Estilização usando Tailwind CSS para interfaces responsivas.
- Armazenamento de dados em banco NoSQL.
- API RESTful para integração com sistemas externos.
- Autenticação e controle de acesso baseado em usuários.

### Fluxo Principal de Operação
1. Recebimento de pedido (via cadastro manual ou integração API).
2. Visualização do pedido no quadro Kanban na coluna "Pedido recebido".
3. Movimentação do pedido para as próximas etapas do processo.
4. Entrega do pedido ao cliente.
5. Finalização com status "Entregue" ou "Cancelado".

### Ciclo de Vida do Pedido
O sistema acompanha todo o ciclo de vida do pedido, desde a criação até a entrega, permitindo o controle completo do processo e fornecendo dados para análise de desempenho.