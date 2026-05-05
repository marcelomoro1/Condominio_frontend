"use client";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { 
  Truck, 
  Pencil, 
  Trash2, 
  PlusCircle, 
  User, 
  Wrench,
  Search,
  ChevronDown
} from "lucide-react";

export default function FornecedoresPage() {
  const [fornecedores, setFornecedores] = useState<any[]>([]);
  const [form, setForm] = useState({ ID_PESSOA: "", AREA_ATUACAO: "" });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => { carregar(); }, []);

  const carregar = async () => {
    try {
      const res = await api.get("/fornecedores");
      setFornecedores(res.data);
    } catch (error) {
      console.error("Erro ao carregar fornecedores:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/fornecedores/${editId}`, form);
        setEditId(null);
      } else {
        await api.post("/fornecedores", form);
      }
      setForm({ ID_PESSOA: "", AREA_ATUACAO: "" });
      carregar();
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Deseja excluir este fornecedor?")) {
      try {
        await api.delete(`/fornecedores/${id}`);
        carregar();
      } catch (error) {
        console.error("Erro ao excluir fornecedor:", error);
      }
    }
  };

  const handleEdit = (f: any) => {
    setForm({ ID_PESSOA: f.ID_PESSOA, AREA_ATUACAO: f.AREA_ATUACAO });
    setEditId(f.ID_FORNECEDOR);
  };

  return (
    <div className="min-h-screen bg-white p-8 lg:p-14">
      {/* Integrated Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Truck size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestão de Fornecedores</h1>
            <p className="text-slate-400 text-sm font-medium">Cadastro de parceiros e prestadores</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar parceiros..." 
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
              {editId ? "Editar Fornecedor" : "Novo Parceiro"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">ID da Pessoa / Empresa</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm font-medium"
                    placeholder="ID do cadastro" value={form.ID_PESSOA}
                    onChange={e => setForm({ ...form, ID_PESSOA: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Área de Atuação</label>
                <div className="relative">
                  <Wrench size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm font-medium"
                    placeholder="Ex: Elétrica, Hidráulica..." value={form.AREA_ATUACAO}
                    onChange={e => setForm({ ...form, AREA_ATUACAO: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-100 active:scale-[0.98] flex items-center justify-center gap-2">
                <PlusCircle size={18} />
                {editId ? "Atualizar Parceiro" : "Salvar Fornecedor"}
              </button>
              
              {editId && (
                <button 
                  type="button"
                  onClick={() => { setEditId(null); setForm({ ID_PESSOA: "", AREA_ATUACAO: "" }); }}
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
            <h2 className="text-lg font-bold text-slate-800">Parceiros Cadastrados</h2>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{fornecedores.length} Ativos</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-slate-400">
                  <th className="px-6 py-2 text-xs font-bold uppercase tracking-widest">Fornecedor</th>
                  <th className="px-6 py-2 text-xs font-bold uppercase tracking-widest">Especialidade</th>
                  <th className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {fornecedores.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-20 text-center text-slate-300 font-medium">Nenhum fornecedor registrado.</td>
                  </tr>
                ) : (
                  fornecedores.map((f: any) => (
                    <tr key={f.ID_FORNECEDOR} className="group">
                      <td className="px-6 py-5 bg-slate-50/50 rounded-l-[1.5rem] border-y border-l border-slate-100 group-hover:bg-emerald-50/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white border border-slate-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold shadow-sm">
                            <Truck size={20} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-700 leading-tight">Pessoa (ID: {f.ID_PESSOA})</span>
                            <span className="text-xs text-slate-400 font-medium">Parceiro registrado</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 bg-slate-50/50 border-y border-slate-100 group-hover:bg-emerald-50/30 transition-colors">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-white border border-slate-100 text-emerald-600 shadow-sm uppercase tracking-wider">
                          <Wrench size={12} /> {f.AREA_ATUACAO}
                        </span>
                      </td>
                      <td className="px-6 py-5 bg-slate-50/50 rounded-r-[1.5rem] border-y border-r border-slate-100 text-right group-hover:bg-emerald-50/30 transition-colors">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(f)} 
                            className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-white rounded-xl transition-all shadow-sm active:scale-95"
                            title="Editar"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(f.ID_FORNECEDOR)} 
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
