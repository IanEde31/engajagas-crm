# EngajaGás CRM

Sistema de gerenciamento de pedidos para distribuidoras de gás, desenvolvido com Next.js e Supabase.

## 📋 Características

- **Dashboard**: Visualize estatísticas de vendas, pedidos recentes e produtos mais vendidos
- **Gestão de Pedidos**: Sistema Kanban para acompanhamento de status dos pedidos
- **Clientes**: Cadastro e gerenciamento de clientes
- **Autenticação**: Sistema de login seguro com Supabase

## 🚀 Tecnologias

- **Frontend**: Next.js, Tailwind CSS
- **Backend/Database**: Supabase (PostgreSQL)
- **Bibliotecas**: Lucide React (ícones), date-fns (formatação de datas), recharts (gráficos)

## 💻 Como executar localmente

### Pré-requisitos

- Node.js 14.x ou superior
- npm ou yarn
- Conta no Supabase

### Configuração do Supabase

1. Crie uma conta em [supabase.com](https://supabase.com) se ainda não tiver
2. Crie um novo projeto
3. Navegue até as configurações do projeto e copie a URL e a chave anônima
4. Crie um arquivo `.env.local` na raiz do projeto (ou atualize o existente) com as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=sua-url-do-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-do-supabase
```

### Estrutura do banco de dados

No Supabase, você precisa criar as seguintes tabelas:

#### Tabela: users
- id (uuid, primary key)
- email (text, unique)
- password (text)
- nome (text)
- role (text)
- created_at (timestamp with time zone)

#### Tabela: pedidos
- id (bigint, primary key)
- cliente (text)
- telefone (text)
- endereco (jsonb)
- itens (jsonb)
- status (text)
- valor (numeric)
- observacoes (text)
- data (timestamp with time zone)
- user_id (uuid, foreign key references users.id)

### Instalação e execução

1. Clone este repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador

## 📱 Páginas

- `/login` - Página de autenticação
- `/dashboard` - Visão geral do negócio
- `/pedidos` - Gestão de pedidos (Kanban)
- `/clientes` - Gestão de clientes

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, sinta-se à vontade para submeter um Pull Request.

## 📄 Licença

Este projeto está licenciado sob a licença MIT.
