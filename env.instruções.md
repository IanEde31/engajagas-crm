# Configuração do Arquivo .env.local

Para configurar corretamente a integração com n8n, adicione a seguinte variável ao seu arquivo `.env.local`:

```
# n8n Webhook API Key
WEBHOOK_API_KEY=engajagas-api-key-2025
```

Este é o valor padrão usado em desenvolvimento. Em produção, você deve usar uma chave API mais segura e aleatória.

## Instruções:

1. Abra o arquivo `.env.local` na raiz do projeto
2. Adicione a linha acima ao final do arquivo
3. Salve o arquivo
4. Reinicie o servidor Next.js se estiver em execução
