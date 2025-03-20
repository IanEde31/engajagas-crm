import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  LayoutDashboard, 
  ClipboardList, 
  Home, 
  LogOut, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Webhook
} from "lucide-react";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Layout({ children, currentPageName }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (pageName) => {
    return currentPageName === pageName;
  };

  const handleLogout = async () => {
    await User.logout();
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* Mobile header */}
      <header className="lg:hidden bg-blue-700 text-white p-4 flex items-center justify-between sticky top-0 z-30">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-blue-600"
          onClick={() => setSidebarMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <div className="font-bold text-xl">GasControl</div>
        <div className="w-6"></div> {/* Spacer for centering */}
      </header>

      {/* Backdrop for mobile */}
      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarMobileOpen(false)}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - For mobile */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-blue-700 text-white transition-transform duration-300 ease-in-out lg:hidden",
            sidebarMobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 flex items-center justify-between">
              <Link to={createPageUrl("Dashboard")} className="flex items-center gap-2">
                <Home className="h-6 w-6" />
                <span className="font-bold text-xl">GasControl</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-blue-600"
                onClick={() => setSidebarMobileOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              <Link
                to={createPageUrl("Dashboard")}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive("Dashboard")
                    ? "bg-white text-blue-700 font-medium"
                    : "text-white hover:bg-blue-600"
                )}
                onClick={() => setSidebarMobileOpen(false)}
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                to={createPageUrl("CRM")}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive("CRM")
                    ? "bg-white text-blue-700 font-medium"
                    : "text-white hover:bg-blue-600"
                )}
                onClick={() => setSidebarMobileOpen(false)}
              >
                <ClipboardList className="h-5 w-5" />
                Gerenciamento de Pedidos
              </Link>
              <Link
                to={createPageUrl("NovoPedido")}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive("NovoPedido")
                    ? "bg-white text-blue-700 font-medium"
                    : "text-white hover:bg-blue-600"
                )}
                onClick={() => setSidebarMobileOpen(false)}
              >
                <PlusCircle className="h-5 w-5" />
                Novo Pedido
              </Link>
              <Link
                to={createPageUrl("Integracao")}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive("Integracao")
                    ? "bg-white text-blue-700 font-medium"
                    : "text-white hover:bg-blue-600"
                )}
                onClick={() => setSidebarMobileOpen(false)}
              >
                <Webhook className="h-5 w-5" />
                Integração
              </Link>
            </nav>

            <div className="p-4 mt-auto">
              <Button
                variant="outline"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white border-blue-500"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </aside>

        {/* Sidebar - For desktop (expandable) */}
        <div 
          className={cn(
            "hidden lg:block bg-blue-700 text-white transition-all duration-300 ease-in-out z-10 h-screen",
            sidebarExpanded ? "w-64" : "w-16"
          )}
        >
          <div className="flex flex-col h-full">
            <div className={cn(
              "p-4 flex items-center", 
              sidebarExpanded ? "justify-between" : "justify-center"
            )}>
              {sidebarExpanded && (
                <Link to={createPageUrl("Dashboard")} className="flex items-center gap-2">
                  <Home className="h-6 w-6" />
                  <span className="font-bold text-xl">GasControl</span>
                </Link>
              )}
              {!sidebarExpanded && (
                <Link to={createPageUrl("Dashboard")} className="flex items-center justify-center">
                  <Home className="h-6 w-6" />
                </Link>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-blue-600"
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
              >
                {sidebarExpanded ? (
                  <ChevronLeft className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </Button>
            </div>

            <nav className="flex-1 p-2 space-y-2">
              <Link
                to={createPageUrl("Dashboard")}
                className={cn(
                  "flex items-center px-3 py-3 rounded-lg transition-colors",
                  sidebarExpanded ? "gap-3" : "justify-center",
                  isActive("Dashboard")
                    ? "bg-white text-blue-700 font-medium"
                    : "text-white hover:bg-blue-600"
                )}
              >
                <LayoutDashboard className="h-5 w-5" />
                {sidebarExpanded && <span>Dashboard</span>}
              </Link>
              <Link
                to={createPageUrl("CRM")}
                className={cn(
                  "flex items-center px-3 py-3 rounded-lg transition-colors",
                  sidebarExpanded ? "gap-3" : "justify-center",
                  isActive("CRM")
                    ? "bg-white text-blue-700 font-medium"
                    : "text-white hover:bg-blue-600"
                )}
              >
                <ClipboardList className="h-5 w-5" />
                {sidebarExpanded && <span>Gerenciamento de Pedidos</span>}
              </Link>
              <Link
                to={createPageUrl("NovoPedido")}
                className={cn(
                  "flex items-center px-3 py-3 rounded-lg transition-colors",
                  sidebarExpanded ? "gap-3" : "justify-center",
                  isActive("NovoPedido")
                    ? "bg-white text-blue-700 font-medium"
                    : "text-white hover:bg-blue-600"
                )}
              >
                <PlusCircle className="h-5 w-5" />
                {sidebarExpanded && <span>Novo Pedido</span>}
              </Link>
              <Link
                to={createPageUrl("Integracao")}
                className={cn(
                  "flex items-center px-3 py-3 rounded-lg transition-colors",
                  sidebarExpanded ? "gap-3" : "justify-center",
                  isActive("Integracao")
                    ? "bg-white text-blue-700 font-medium"
                    : "text-white hover:bg-blue-600"
                )}
              >
                <Webhook className="h-5 w-5" />
                {sidebarExpanded && <span>Integração</span>}
              </Link>
            </nav>

            <div className={cn(
              "p-4 mt-auto",
              !sidebarExpanded && "flex justify-center"
            )}>
              <Button
                variant="outline"
                className={cn(
                  "bg-blue-600 hover:bg-blue-500 text-white border-blue-500",
                  sidebarExpanded ? "w-full" : "w-10 h-10 p-0"
                )}
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                {sidebarExpanded && <span className="ml-2">Sair</span>}
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto w-full">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}