## Estrutura de Dados
// Utilize essa estrutura para adaptar ao uso do supabase que é PostgresSQL

### Dados do Supabase:
Project URL: https://tpydkmmatleydmdncras.supabase.co

anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRweWRrbW1hdGxleWRtZG5jcmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxODIwMzUsImV4cCI6MjA1Nzc1ODAzNX0.060WAZSuIV5fTFZqSGuMJ3yMbMvNNUXXD0erf8jgP7g

service_role secret: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRweWRrbW1hdGxleWRtZG5jcmFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjE4MjAzNSwiZXhwIjoyMDU3NzU4MDM1fQ.o0o29dQBokX3_ASa89BziSzfa7oxMkZV5BUX32nnrQU

### Entidade Principal: Pedido
O sistema utiliza uma estrutura de dados baseada em documentos, com a entidade principal sendo o **Pedido**, que armazena todas as informações relacionadas a um pedido feito por um cliente.

| Campo                  | Tipo         | Descrição                                          | Obrigatório |
|------------------------|--------------|----------------------------------------------------|-------------|
| `id`                   | string       | Identificador único do pedido (gerado automaticamente) | Sim         |
| `numero`               | string       | Número do pedido para exibição (ex: GAS-2023-001)      | Sim         |
| `cliente`              | string       | Nome do cliente                                        | Sim         |
| `telefone`             | string       | Telefone de contato do cliente                         | Sim         |
| `endereco`             | objeto       | Dados do endereço de entrega                           | Não         |
| `itens`                | array        | Lista de produtos do pedido                            | Sim         |
| `pagamento`            | string       | Forma de pagamento (Pix, Cartão de crédito, etc.)      | Sim         |
| `parcelas`             | number       | Número de parcelas (para cartão de crédito)            | Não         |
| `valor_total`          | number       | Valor total do pedido                                  | Sim         |
| `status`               | string       | Status atual do pedido                                 | Sim         |
| `data_recebimento`     | date-time    | Data e hora de recebimento do pedido                   | Não         |
| `data_entrega_prevista`| date-time    | Data e hora prevista para entrega                      | Não         |
| `data_entrega_real`    | date-time    | Data e hora em que o pedido foi entregue               | Não         |
| `observacoes`          | string       | Observações adicionais sobre o pedido                  | Não         |
| `created_date`         | date-time    | Data de criação do registro (automático)               | Sim         |
| `updated_date`         | date-time    | Data da última atualização (automático)                | Sim         |

### Subestruturas

#### Estrutura de Endereço

| Campo       | Tipo   |
|-------------|--------|
| `rua`       | string |
| `numero`    | string |
| `complemento` | string |
| `bairro`    | string |
| `cidade`    | string |
| `estado`    | string |
| `cep`       | string |

#### Estrutura de Item

| Campo            | Tipo   |
|------------------|--------|
| `produto`        | string |
| `quantidade`     | number |
| `valor_unitario` | number |
| `valor_total`    | number |

### Valores Enumerados

#### Status de Pedido

| Valor                | Descrição                                           |
|----------------------|-----------------------------------------------------|
| Pedido recebido      | Pedido foi recebido e está aguardando processamento |
| Enviado Para Entrega | Pedido foi processado e está pronto para ser entregue |
| Saiu para Entrega    | Pedido está a caminho do cliente                    |
| Entregue             | Pedido foi entregue ao cliente                      |
| Cancelado            | Pedido foi cancelado                                |
| Agendado             | Pedido com entrega agendada para data futura        |

#### Formas de Pagamento

| Valor            | Descrição                                |
|------------------|------------------------------------------|
| Pix              | Pagamento via Pix                        |
| Cartão de crédito| Pagamento com cartão de crédito (até 3x) |
| Cartão de débito | Pagamento com cartão de débito           |
| Dinheiro         | Pagamento em dinheiro                    |

### Armazenamento de Dados

O sistema utiliza um banco de dados **NoSQL (MongoDB)** para armazenamento, o que permite flexibilidade no esquema de dados e rápido desenvolvimento. Os dados são armazenados em formato de documentos JSON.

