"use client";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { 
  ArrowDownCircle, 
  Pencil, 
  Trash2, 
  PlusCircle, 
  User, 
  AlignLeft, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Search,
  ChevronDown
} from "lucide-react";

export default function ContasPagarPage() {
  const [contas, setContas] = useState<any[]>([]);
  const [form, setForm] = useState({ ID_FORNECEDOR: "", DESCRICAO: "", VALOR: "", DATA_VENCIMENTO: "", STATUS: "" });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => { carregar(); }, []);

  const carregar = async () => {
    try {
      const res = await api.get("/contas-pagar");
      setContas(res.data);
    } catch (error) {
      console.error("Erro ao carregar contas a pagar:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/contas-pagar/${editId}`, form);
        setEditId(null);
      } else {
        await api.post("/contas-pagar", form);
      }
      setForm({ ID_FORNECEDOR: "", DESCRICAO: "", VALOR: "", DATA_VENCIMENTO: "", STATUS: "" });
      carregar();
    } catch (error) {
      console.error("Erro ao salvar conta a pagar:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Deseja excluir esta conta a pagar?")) {
      try {
        await api.delete(`/contas-pagar/${id}`);
        carregar();
      } catch (error) {
        console.error("Erro ao excluir conta a pagar:", error);
      }
    }
  };

  const handleEdit = (c: any) => {
    setForm({ ID_FORNECEDOR: c.ID_FORNECEDOR, DESCRICAO: c.DESCRICAO, VALOR: c.VALOR, DATA_VENCIMENTO: c.DATA_VENCIMENTO, STATUS: c.STATUS });
    setEditId(c.ID_CONTA_PAGAR);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PAGO": return <CheckCircle2 size={14} />;
      case "ABERTO": return <Clock size={14} />;
      case "ATRASADO": return <AlertCircle size={14} />;
      default: return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "PAGO": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "ABERTO": return "bg-amber-50 text-amber-600 border-amber-100";
      case "ATRASADO": return "bg-rose-50 text-rose-600 border-rose-100";
      default: return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 lg:p-14">
      {/* Integrated Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <ArrowDownCircle size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Contas a Pagar</h1>
            <p className="text-slate-400 text-sm font-medium">Gestão de obrigações e despesas</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar obrigações..." 
              className="bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-sm w-64 focus:ring-2 focus:ring-emerald-500/10 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Form Column */}
        <div className="lg:col-span-4">
          <div className="sticky top-8">
            <h2 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2">
              {editId ? "Editar Lançamento" : "Nova Despesa"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Fornecedor (ID)</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm font-medium"
                    placeholder="ID do fornecedor" value={form.ID_FORNECEDOR}
                    onChange={e => setForm({ ...form, ID_FORNECEDOR: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Descrição do Pagamento</label>
                <div className="relative">
                  <AlignLeft size={18} className="absolute left-4 top-4 text-slate-300" />
                  <textarea 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm font-medium min-h-[100px] resize-none"
                    placeholder="Ex: Manutenção Mensal" value={form.DESCRICAO}
                    onChange={e => setForm({ ...form, DESCRICAO: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Valor (R$)</label>
                  <div className="relative">
                    <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input 
                      type="number"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm font-medium"
                      placeholder="0.00" value={form.VALOR}
                      onChange={e => setForm({ ...form, VALOR: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Vencimento</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input 
                      type="date"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-200 outline-none transition-all text-xs font-medium"
                      value={form.DATA_VENCIMENTO}
                      onChange={e => setForm({ ...form, DATA_VENCIMENTO: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Status Atual</label>
                <div className="relative">
                  <select 
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm font-medium appearance-none"
                    value={form.STATUS}
                    onChange={e => setForm({ ...form, STATUS: e.target.value })}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="ABERTO">Aberto</option>
                    <option value="PAGO">Pago</option>
                    <option value="ATRASADO">Atrasado</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                </div>
              </div>

              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-100 active:scale-[0.98] flex items-center justify-center gap-2">
                <PlusCircle size={18} />
                {editId ? "Atualizar Registro" : "Lançar Despesa"}
              </button>
              
              {editId && (
                <button 
                  type="button"
                  onClick={() => { setEditId(null); setForm({ ID_FORNECEDOR: "", DESCRICAO: "", VALOR: "", DATA_VENCIMENTO: "", STATUS: "" }); }}
                  className="w-full text-slate-400 font-bold text-xs uppercase tracking-widest py-2 hover:text-slate-600 transition-colors"
                >
                  Cancelar Edição
                </button>
              )}
            </form>
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-800">Compromissos Financeiros</h2>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{contas.length} Lançamentos</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-slate-400">
                  <th className="px-6 py-2 text-xs font-bold uppercase tracking-widest">Descrição / Credor</th>
                  <th className="px-6 py-2 text-xs font-bold uppercase tracking-widest">Vencimento</th>
                  <th className="px-6 py-2 text-xs font-bold uppercase tracking-widest">Status</th>
                  <th className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {contas.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center text-slate-300 font-medium">Nenhuma conta pendente.</td>
                  </tr>
                ) : (
                  contas.map((c: any) => (
                    <tr key={c.ID_CONTA_PAGAR} className="group">
                      <td className="px-6 py-5 bg-slate-50/50 rounded-l-[1.5rem] border-y border-l border-slate-100 group-hover:bg-emerald-50/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white border border-slate-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold shadow-sm">
                            <ArrowDownCircle size={20} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-700 leading-tight">{c.DESCRICAO}</span>
                            <span className="text-xs text-emerald-600 font-bold">R$ {Number(c.VALOR).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 bg-slate-50/50 border-y border-slate-100 group-hover:bg-emerald-50/30 transition-colors">
                        <span className="text-sm font-medium text-slate-500">
                          {new Date(c.DATA_VENCIMENTO).toLocaleDateString('pt-BR')}
                        </span>
                      </td>
                      <td className="px-6 py-5 bg-slate-50/50 border-y border-slate-100 group-hover:bg-emerald-50/30 transition-colors">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black border uppercase tracking-widest ${getStatusClass(c.STATUS)} shadow-sm`}>
                          {getStatusIcon(c.STATUS)}
                          {c.STATUS}
                        </span>
                      </td>
                      <td className="px-6 py-5 bg-slate-50/50 rounded-r-[1.5rem] border-y border-r border-slate-100 text-right group-hover:bg-emerald-50/30 transition-colors">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(c)} 
                            className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-white rounded-xl transition-all shadow-sm active:scale-95"
                            title="Editar"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(c.ID_CONTA_PAGAR)} 
                            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-xl transition-all shadow-sm active:scale-95"
                            title="Excluir"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
