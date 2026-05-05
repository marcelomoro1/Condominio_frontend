"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  Briefcase, 
  Truck, 
  UserCheck, 
  Building, 
  MapPin, 
  Calendar, 
  FileText, 
  Megaphone, 
  FileSignature, 
  ArrowDownCircle, 
  ArrowUpCircle,
  LogOut,
  ChevronRight
} from "lucide-react";

const menuItems = [
  { name: "Painel", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pessoas", href: "/pessoas", icon: Users },
  { name: "Moradores", href: "/moradores", icon: Home },
  { name: "Funcionários", href: "/funcionarios", icon: Briefcase },
  { name: "Fornecedores", href: "/fornecedores", icon: Truck },
  { name: "Visitantes", href: "/visitantes", icon: UserCheck },
  { name: "Unidades", href: "/unidades", icon: Building },
  { name: "Áreas Comuns", href: "/areas-comuns", icon: MapPin },
  { name: "Reservas", href: "/reservas", icon: Calendar },
  { name: "Boletos", href: "/boletos", icon: FileText },
  { name: "Comunicados", href: "/comunicados", icon: Megaphone },
  { name: "Contratos", href: "/contratos", icon: FileSignature },
  { name: "Contas a Pagar", href: "/contas-pagar", icon: ArrowDownCircle },
  { name: "Contas a Receber", href: "/contas-receber", icon: ArrowUpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-6 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Building size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-800 leading-tight">Condomínio</span>
            <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Gestão Inteligente</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 pb-8">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? "bg-emerald-50 text-emerald-600 font-semibold shadow-sm" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-emerald-700"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-emerald-600"} />
                <span className="text-sm">{item.name}</span>
              </div>
              {isActive && <ChevronRight size={16} className="text-emerald-400" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Sair da conta</span>
        </button>
      </div>
    </aside>
  );
}
