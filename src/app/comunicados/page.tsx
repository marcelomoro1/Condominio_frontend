"use client";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { 
  Megaphone, 
  Pencil, 
  Trash2, 
  PlusCircle, 
  Heading, 
  MessageSquare, 
  Calendar, 
  Clock, 
  Tag,
  Search,
  ChevronDown
} from "lucide-react";

export default function ComunicadosPage() {
  const [comunicados, setComunicados] = useState<any[]>([]);
  const [form, setForm] = useState({ TITULO: "", MENSAGEM: "", DT_COMUNICADO: "", HR_COMUNICADO: "", TIPO: "" });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => { carregar(); }, []);

  const carregar = async () => {
    try {
      const res = await api.get("/comunicados");
      setComunicados(res.data);
    } catch (error) {
      console.error("Erro ao carregar comunicados:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/comunicados/${editId}`, form);
        setEditId(null);
      } else {
        await api.post("/comunicados", form);
      }
      setForm({ TITULO: "", MENSAGEM: "", DT_COMUNICADO: "", HR_COMUNICADO: "", TIPO: "" });
      carregar();
    } catch (error) {
      console.error("Erro ao salvar comunicado:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Deseja excluir este comunicado?")) {
      try {
        await api.delete(`/comunicados/${id}`);
        carregar();
      } catch (error) {
        console.error("Erro ao excluir comunicado:", error);
      }
    }
  };

  const handleEdit = (c: any) => {
    setForm({ TITULO: c.TITULO, MENSAGEM: c.MENSAGEM, DT_COMUNICADO: c.DT_COMUNICADO, HR_COMUNICADO: c.HR_COMUNICADO, TIPO: c.TIPO });
    setEditId(c.ID_COMUNICADO);
  };

  return (
    <div className="min-h-screen bg-white p-8 lg:p-14">
      {/* Integrated Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Megaphone size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Comunicados</h1>
            <p className="text-slate-400 text-sm font-medium">Divulgue informativos e avisos importantes</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar comunicados..." 
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
              {editId ? "Editar Comunicado" : "Nova Publicação"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Título do Aviso</label>
                <div className="relative">
                  <Heading size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm font-medium"
                    placeholder="Ex: Reunião Geral" value={form.TITULO}
                    onChange={e => setForm({ ...form, TITULO: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Conteúdo da Mensagem</label>
                <div className="relative">
                  <MessageSquare size={18} className="absolute left-4 top-4 text-slate-300" />
                  <textarea 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm font-medium min-h-[160px] resize-none"
                    placeholder="Descreva o comunicado..." value={form.MENSAGEM}
                    onChange={e => setForm({ ...form, MENSAGEM: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Data</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input 
                      type="date"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-200 outline-none transition-all text-xs font-medium"
                      value={form.DT_COMUNICADO}
                      onChange={e => setForm({ ...form, DT_COMUNICADO: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Horário</label>
                  <div className="relative">
                    <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input 
                      type="time"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-200 outline-none transition-all text-xs font-medium"
                      value={form.HR_COMUNICADO}
                      onChange={e => setForm({ ...form, HR_COMUNICADO: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Categoria / Tag</label>
                <div className="relative">
                  <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-200 outline-none transition-all text-sm font-medium"
                    placeholder="Ex: Geral, Manutenção..." value={form.TIPO}
                    onChange={e => setForm({ ...form, TIPO: e.target.value })}
                  />
                </div>
              </div>

              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-100 active:scale-[0.98] flex items-center justify-center gap-2">
                <PlusCircle size={18} />
                {editId ? "Atualizar Publicação" : "Publicar Comunicado"}
              </button>
              
              {editId && (
                <button 
                  type="button"
                  onClick={() => { setEditId(null); setForm({ TITULO: "", MENSAGEM: "", DT_COMUNICADO: "", HR_COMUNICADO: "", TIPO: "" }); }}
                  className="w-full text-slate-400 font-bold text-xs uppercase tracking-widest py-2 hover:text-slate-600 transition-colors"
                >
                  Cancelar Edição
                </button>
              )}
            </form>
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Mural de Avisos</h2>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{comunicados.length} Publicados</span>
          </div>

          <div className="space-y-6">
            {comunicados.length === 0 ? (
              <div className="px-6 py-20 text-center text-slate-300 font-medium bg-slate-50/50 rounded-[2rem] border border-slate-100">
                Nenhum comunicado ativo.
              </div>
            ) : (
              comunicados.map((c: any) => (
                <div key={c.ID_COMUNICADO} className="group relative bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-emerald-100 rounded-[2.5rem] p-8 transition-all hover:shadow-xl hover:shadow-emerald-900/5">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white border border-slate-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <Megaphone size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-emerald-700 transition-colors">{c.TITULO}</h3>
                        <div className="flex flex-wrap gap-4 mt-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black bg-emerald-100/50 text-emerald-700 uppercase tracking-widest border border-emerald-100">
                            {c.TIPO || 'GERAL'}
                          </span>
                          <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                            <Calendar size={14} className="text-slate-300" /> {new Date(c.DT_COMUNICADO).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                            <Clock size={14} className="text-slate-300" /> {c.HR_COMUNICADO}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(c)} 
                        className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-white rounded-xl transition-all shadow-sm active:scale-95 border border-transparent hover:border-slate-100"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(c.ID_COMUNICADO)} 
                        className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-xl transition-all shadow-sm active:scale-95 border border-transparent hover:border-slate-100"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-medium">
                      {c.MENSAGEM}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
