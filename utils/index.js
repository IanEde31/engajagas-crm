export function createPageUrl(pageName) {
  const routes = {
    dashboard: '/',
    crm: '/crm',
    novoPedido: '/novo-pedido',
    integracao: '/integracao'
  };
  
  return routes[pageName] || '/';
}
