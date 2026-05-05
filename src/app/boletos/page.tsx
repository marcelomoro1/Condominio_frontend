"use client";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { 
  FileText, 
  Pencil, 
  Trash2, 
  PlusCircle, 
  User, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Search,
  ChevronDown
} from "lucide-react";

export default function BoletosPage() {
  const [boletos, setBoletos] = useState<any[]>([]);
  const [form, setForm] = useState({ ID_MORADOR: "", VL_BOLETO: "", DT_VENCIMENTO: "", STATUS: "" });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => { carregar(); }, []);

  const carregar = async () => {
    try {
      const res = await api.get("/boletos");
      setBoletos(res.data);
    } catch (error) {
      console.error("Erro ao carregar boletos:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/boletos/${editId}`, form);
        setEditId(null);
      } else {
        await api.post("/boletos", form);
      }
      setForm({ ID_MORADOR: "", VL_BOLETO: "", DT_VENCIMENTO: "", STATUS: "" });
      carregar();
    } catch (error) {
      console.error("Erro ao salvar boleto:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Deseja excluir este boleto?")) {
      try {
        await api.delete(`/boletos/${id}`);
        carregar();
      } catch (error) {
        console.error("Erro ao excluir boleto:", error);
      }
    }
  };

  const handleEdit = (b: any) => {
    setForm({ ID_MORADOR: b.ID_MORADOR, VL_BOLETO: b.VL_BOLETO, DT_VENCIMENTO: b.DT_VENCIMENTO, STATUS: b.STATUS });
    setEditId(b.ID_BOLETO);
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
            <FileText size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Financeiro / Boletos</h1>
            <p className="text-slate-400 text-sm font-medium">Gestão de cobranças e recebíveis</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar boletos..." 
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
              {editId ? "Editar Boleto" : "Gerar Boleto"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">ID do Morador</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm font-medium"
                    placeholder="ID do cadastro" value={form.ID_MORADOR}
                    onChange={e => setForm({ ...form, ID_MORADOR: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Valor da Cobrança</label>
                <div className="relative">
                  <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="number"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm font-medium"
                    placeholder="0.00" value={form.VL_BOLETO}
                    onChange={e => setForm({ ...form, VL_BOLETO: e.target.value })}
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
                    value={form.DT_VENCIMENTO}
                    onChange={e => setForm({ ...form, DT_VENCIMENTO: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Status de Pagamento</label>
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
                {editId ? "Atualizar Boleto" : "Gerar Boleto"}
              </button>
              
              {editId && (
                <button 
                  type="button"
                  onClick={() => { setEditId(null); setForm({ ID_MORADOR: "", VL_BOLETO: "", DT_VENCIMENTO: "", STATUS: "" }); }}
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
            <h2 className="text-lg font-bold text-slate-800">Boletos Emitidos</h2>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{boletos.length} Títulos</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-slate-400">
                  <th className="px-6 py-2 text-xs font-bold uppercase tracking-widest">Morador / Título</th>
                  <th className="px-6 py-2 text-xs font-bold uppercase tracking-widest">Vencimento</th>
                  <th className="px-6 py-2 text-xs font-bold uppercase tracking-widest">Status</th>
                  <th className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {boletos.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center text-slate-300 font-medium">Nenhum boleto encontrado.</td>
                  </tr>
                ) : (
                  boletos.map((b: any) => (
                    <tr key={b.ID_BOLETO} className="group">
                      <td className="px-6 py-5 bg-slate-50/50 rounded-l-[1.5rem] border-y border-l border-slate-100 group-hover:bg-emerald-50/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white border border-slate-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold shadow-sm">
                            <FileText size={20} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-700 leading-tight">Morador {b.ID_MORADOR}</span>
                            <span className="text-xs text-emerald-600 font-bold">R$ {Number(b.VL_BOLETO).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 bg-slate-50/50 border-y border-slate-100 group-hover:bg-emerald-50/30 transition-colors">
                        <span className="text-sm font-medium text-slate-500">
                          {new Date(b.DT_VENCIMENTO).toLocaleDateString('pt-BR')}
                        </span>
                      </td>
                      <td className="px-6 py-5 bg-slate-50/50 border-y border-slate-100 group-hover:bg-emerald-50/30 transition-colors">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black border uppercase tracking-widest ${getStatusClass(b.STATUS)} shadow-sm`}>
                          {getStatusIcon(b.STATUS)}
                          {b.STATUS}
                        </span>
                      </td>
                      <td className="px-6 py-5 bg-slate-50/50 rounded-r-[1.5rem] border-y border-r border-slate-100 text-right group-hover:bg-emerald-50/30 transition-colors">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(b)} 
                            className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-white rounded-xl transition-all shadow-sm active:scale-95"
                            title="Editar"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(b.ID_BOLETO)} 
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
