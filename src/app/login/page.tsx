"use client";
import { useState } from "react";
import api from "../../services/api"; 
import { useRouter } from "next/navigation";
import { Building } from "lucide-react";

export default function LoginPage() {
  const [form, setForm] = useState({ CPF_CNPJ: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      const { access_token } = res.data;

      localStorage.setItem("token", access_token);
      router.push("/dashboard");
    } catch (error) {
      alert("Falha no login. Verifique CPF e Senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
      {/* Card de Login */}
      <div className="w-full max-w-md bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
        
        {/* Banner Superior com Logo */}
        <div className="bg-white px-8 pt-12 pb-6 text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl shadow-emerald-200">
              <Building size={24} />
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tighter">
              Condomínio
            </h1>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Bem-vindo de volta</h2>
          <p className="text-slate-500 mt-2 text-sm">Insira suas credenciais para acessar o painel.</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="px-10 pb-12 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">CPF ou CNPJ</label>
            <input 
              required
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400 font-medium" 
              placeholder="000.000.000-00" 
              onChange={e => setForm({...form, CPF_CNPJ: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Senha</label>
            <input 
              required
              type="password" 
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400 font-medium" 
              placeholder="••••••••" 
              onChange={e => setForm({...form, password: e.target.value})}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-100 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center text-lg"
          >
            {loading ? "Autenticando..." : "Entrar no Sistema"}
          </button>

          <div className="pt-6 text-center">
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black">
              Gestão Condominial Inteligente
            </p>
          </div>
        </form>
      </div>

      {/* Detalhe Decorativo de Fundo */}
      <div className="fixed -bottom-32 -left-32 w-96 h-96 bg-emerald-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="fixed -top-32 -right-32 w-96 h-96 bg-emerald-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
    </div>
  );
}