-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  encrypted_password TEXT,
  nome TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar tabela de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id BIGSERIAL PRIMARY KEY,
  cliente TEXT NOT NULL,
  telefone TEXT,
  endereco JSONB,
  itens JSONB,
  status TEXT DEFAULT 'Pedido recebido',
  valor NUMERIC(10, 2) DEFAULT 0,
  observacoes TEXT,
  data TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES users(id)
);

-- Criar tabela de clientes para expansão futura
CREATE TABLE IF NOT EXISTS clientes (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT,
  email TEXT,
  endereco JSONB,
  observacoes TEXT,
  total_compras INTEGER DEFAULT 0,
  valor_total_compras NUMERIC(10, 2) DEFAULT 0,
  ultima_compra TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES users(id)
);

-- Criar tabela de produtos para expansão futura
CREATE TABLE IF NOT EXISTS produtos (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco NUMERIC(10, 2) NOT NULL,
  estoque INTEGER DEFAULT 0,
  categoria TEXT,
  imagem_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Adicionar dados de demonstração para usuário
INSERT INTO users (email, encrypted_password, nome, role)
VALUES ('admin@engajagas.com', '$2a$10$NZTyEWOhMu4TnI107/KFPuBZIfA2QZ9LM4BjL.ZYUbpqJVoJZW4BS', 'Administrador', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Adicionar dados de demonstração para pedidos
INSERT INTO pedidos (cliente, telefone, endereco, itens, status, valor, observacoes, data)
VALUES 
('João Silva', '(11) 98765-4321', 
 '{"rua": "Av. Paulista", "numero": "1000", "bairro": "Bela Vista", "cidade": "São Paulo", "complemento": "Apto 42"}',
 '[{"nome": "Botijão P13", "quantidade": 1, "preco": 120}]',
 'Pedido recebido', 120.00, 'Entregar no período da tarde', NOW() - INTERVAL '1 day'),
 
('Maria Santos', '(11) 91234-5678', 
 '{"rua": "Rua Augusta", "numero": "500", "bairro": "Consolação", "cidade": "São Paulo", "complemento": ""}',
 '[{"nome": "Botijão P13", "quantidade": 1, "preco": 120}, {"nome": "Água Mineral 500ml", "quantidade": 2, "preco": 2.50}]',
 'Enviado Para Entrega', 125.00, '', NOW() - INTERVAL '12 hours'),
 
('Carlos Oliveira', '(11) 92345-6789', 
 '{"rua": "Rua Oscar Freire", "numero": "800", "bairro": "Jardins", "cidade": "São Paulo", "complemento": "Casa"}',
 '[{"nome": "Botijão P45", "quantidade": 1, "preco": 360}]',
 'Saiu para Entrega', 360.00, 'Cliente vai pagar com Pix', NOW() - INTERVAL '6 hours'),
 
('Ana Pereira', '(11) 93456-7890', 
 '{"rua": "Av. Brigadeiro Faria Lima", "numero": "2000", "bairro": "Pinheiros", "cidade": "São Paulo", "complemento": "Sala 303"}',
 '[{"nome": "Galão de Água 20L", "quantidade": 2, "preco": 15}, {"nome": "Botijão P13", "quantidade": 1, "preco": 120}]',
 'Entregue', 150.00, '', NOW() - INTERVAL '2 days'),
 
('Paulo Costa', '(11) 94567-8901', 
 '{"rua": "Rua da Consolação", "numero": "1500", "bairro": "Consolação", "cidade": "São Paulo", "complemento": ""}',
 '[{"nome": "Botijão P13", "quantidade": 1, "preco": 120}]',
 'Cancelado', 120.00, 'Cliente desistiu do pedido', NOW() - INTERVAL '3 days'),
 
('Fernanda Lima', '(11) 95678-9012', 
 '{"rua": "Av. Rebouças", "numero": "300", "bairro": "Pinheiros", "cidade": "São Paulo", "complemento": "Apto 15"}',
 '[{"nome": "Botijão P13", "quantidade": 1, "preco": 120}, {"nome": "Galão de Água 20L", "quantidade": 1, "preco": 15}]',
 'Agendado', 135.00, 'Entregar amanhã pela manhã', NOW() + INTERVAL '1 day');

-- Criar políticas de segurança RLS
-- Ativar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;

-- Políticas para usuários
CREATE POLICY "Usuários podem ver seus próprios dados" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins podem visualizar todos os usuários" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Políticas para pedidos
CREATE POLICY "Todos podem ver pedidos" ON pedidos
  FOR SELECT USING (true);

CREATE POLICY "Todos podem criar pedidos" ON pedidos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Todos podem atualizar pedidos" ON pedidos
  FOR UPDATE USING (true);

CREATE POLICY "Admins podem excluir pedidos" ON pedidos
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Políticas para clientes
CREATE POLICY "Todos podem ver clientes" ON clientes
  FOR SELECT USING (true);

CREATE POLICY "Todos podem criar clientes" ON clientes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Todos podem atualizar clientes" ON clientes
  FOR UPDATE USING (true);

CREATE POLICY "Admins podem excluir clientes" ON clientes
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Políticas para produtos
CREATE POLICY "Todos podem ver produtos" ON produtos
  FOR SELECT USING (true);

CREATE POLICY "Admins podem gerenciar produtos" ON produtos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );
