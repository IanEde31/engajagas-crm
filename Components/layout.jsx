import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  LayoutGrid, 
  Package, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Link2
} from 'lucide-react';

export default function Layout({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white shadow-sm py-3 px-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-20 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-blue-600">EngajaGás CRM</h1>
          </div>

          <nav className="flex-1 py-4">
            <ul className="space-y-1 px-2">
              <li>
                <Link href="/dashboard">
                  <span className={`
                    flex items-center px-4 py-2 text-sm rounded-md cursor-pointer
                    ${isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}
                  `}>
                    <LayoutGrid className="mr-3 h-5 w-5" />
                    Dashboard
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/pedidos">
                  <span className={`
                    flex items-center px-4 py-2 text-sm rounded-md cursor-pointer
                    ${isActive('/pedidos') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}
                  `}>
                    <Package className="mr-3 h-5 w-5" />
                    Pedidos
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/clientes">
                  <span className={`
                    flex items-center px-4 py-2 text-sm rounded-md cursor-pointer
                    ${isActive('/clientes') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}
                  `}>
                    <Users className="mr-3 h-5 w-5" />
                    Clientes
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/integracao">
                  <span className={`
                    flex items-center px-4 py-2 text-sm rounded-md cursor-pointer
                    ${isActive('/integracao') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}
                  `}>
                    <Link2 className="mr-3 h-5 w-5" />
                    Integração
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/configuracoes">
                  <span className={`
                    flex items-center px-4 py-2 text-sm rounded-md cursor-pointer
                    ${isActive('/configuracoes') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}
                  `}>
                    <Settings className="mr-3 h-5 w-5" />
                    Configurações
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mt-auto p-4 border-t">
            <Link href="/login">
              <span className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100 cursor-pointer">
                <LogOut className="mr-3 h-5 w-5" />
                Sair
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`
        transition-all duration-200 ease-in-out
        lg:ml-64
        ${sidebarOpen ? 'ml-64' : 'ml-0'}
      `}>
        <div className="pt-16 lg:pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}
