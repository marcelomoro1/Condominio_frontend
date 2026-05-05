"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { 
  Users, 
  Building, 
  UserCheck, 
  DollarSign, 
  TrendingDown,
  Calendar,
  Search,
  Bell,
  ChevronDown,
  ArrowUpRight,
  Wallet
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pessoas: 0,
    unidades: 0,
    visitantes: 0,
    boletosTotal: 0,
    contasPagarTotal: 0
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      fetchData();
    }
  }, [router]);

  const fetchData = async () => {
    try {
      const [p, u, v, b, c] = await Promise.all([
        api.get("/pessoas"),
        api.get("/unidades"),
        api.get("/visitantes"),
        api.get("/boletos"),
        api.get("/contas-pagar")
      ]);

      const bTotal = b.data.reduce((acc: number, item: any) => acc + Number(item.VL_BOLETO || 0), 0);
      const cTotal = c.data.reduce((acc: number, item: any) => acc + Number(item.VALOR || 0), 0);

      setStats({
        pessoas: p.data.length,
        unidades: u.data.length,
        visitantes: v.data.length,
        boletosTotal: bTotal,
        contasPagarTotal: cTotal
      });
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const saldoTotal = stats.boletosTotal - stats.contasPagarTotal;

  return (
    <div className="min-h-screen bg-white p-8 lg:p-14">
      {/* Modern Top Header */}

      {/* Modern Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 p-0.5 flex items-center justify-center">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Avatar" 
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Painel de Controle</h1>
            <p className="text-slate-400 text-sm font-medium">Condomínio • Bem-vindo de volta!</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              className="bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-sm w-64 focus:ring-2 focus:ring-emerald-500/10 transition-all outline-none"
            />
          </div>
          <button className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 hover:text-emerald-600 transition-all">
            <Bell size={20} />
          </button>
        </div>
      </div>

      {/* Integrated Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* Subtle Consolidated Balance - The version you liked */}
          <div className="relative group">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white border border-slate-100 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500 rounded-l-full"></div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Wallet size={32} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Fluxo de Caixa Consolidado</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-slate-900 tracking-tight">R$ {saldoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    <span className="text-emerald-500 text-xs font-bold flex items-center gap-1"><ArrowUpRight size={14} /> Em dia</span>
                  </div>
                </div>
              </div>
              <button className="w-full md:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all">
                Ver Relatório
              </button>
            </div>
          </div>

          {/* Integrated Stats with Bars - The version you liked */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {/* Stat Item */}
            <div className="group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                  <Users size={22} />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">População</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-slate-900 tracking-tighter">{stats.pessoas}</span>
              </div>
              <div className="h-1 w-full bg-slate-100 mt-5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[70%] rounded-full"></div>
              </div>
            </div>

            {/* Stat Item */}
            <div className="group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                  <Building size={22} />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estrutura</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-slate-900 tracking-tighter">{stats.unidades}</span>
              </div>
              <div className="h-1 w-full bg-slate-100 mt-5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 w-full rounded-full"></div>
              </div>
            </div>

            {/* Stat Item */}
            <div className="group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                  <UserCheck size={22} />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fluxo Hoje</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-slate-900 tracking-tighter">{stats.visitantes}</span>
              </div>
              <div className="h-1 w-full bg-slate-100 mt-5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-[30%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-4 space-y-12">
          <div className="bg-slate-50/50 rounded-[2.5rem] p-8 border border-slate-100">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-8">Saúde Financeira</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Receitas</span>
                  <span className="text-sm font-bold text-emerald-600">R$ {stats.boletosTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full rounded-full"></div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Despesas</span>
                  <span className="text-sm font-bold text-rose-500">R$ {stats.contasPagarTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${(stats.contasPagarTotal / stats.boletosTotal) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Date Box */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 capitalize">{new Date().toLocaleDateString('pt-BR', { month: 'long' })}</p>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">{new Date().getFullYear()}</p>
              </div>
            </div>
            <span className="text-3xl font-bold text-slate-900">{new Date().getDate()}</span>
          </div>
        </div>

      </div>
    </div>
  );
}