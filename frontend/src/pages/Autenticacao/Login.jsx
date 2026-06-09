import logo from "../../assets/midislogoE.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Header from "../../components/Header";
import { supabase } from "../../config/supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Faz o login normal no backend
      const response = await axios.post(`${import.meta.env.VITE_API_URL}auth/login`, {
        email,
        senha,
      });

      const usuario = response.data;
      localStorage.setItem("usuario", JSON.stringify(usuario));

      Swal.fire({
        icon: "success",
        title: "Login realizado!",
        text: `Bem-vindo, ${usuario.nome}`,
      });

      // 2. Se for comerciante, vai DIRETO para o painel dele!
      if (usuario.tipo === "comerciante" || usuario.role === "comerciante") {
        
        // Puxa o ID da empresa vinculada a esse usuário
        const { data: empresaData } = await supabase
          .from("empresas")
          .select("id")
          .eq("usuario_id", usuario.id)
          .single();

        if (empresaData && empresaData.id) {
          // 🔥 VAI DIRETO PRO PAINEL! Sem checar mapa, sem barreira.
          navigate(`/painel-comerciante/${empresaData.id}`);
        } else {
          // Fallback de segurança caso o banco de dados tenha falhado ao criar a empresa dele
          navigate("/home");
        }
      } else {
        // Se for cliente comum, vai pra home
        navigate("/home");
      }
    } catch (err) {
      console.log(err.response?.data);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: err.response?.data?.error || "Erro ao fazer login",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-36 pb-10 relative overflow-hidden bg-[#070014]">
      <Header />

      {/* 🔥 BACKGROUND */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[180px] opacity-50"></div>
      <div className="absolute top-[10%] right-[-200px] w-[600px] h-[600px] bg-fuchsia-500 rounded-full blur-[180px] opacity-50"></div>
      <div className="absolute bottom-[-250px] left-[20%] w-[700px] h-[700px] bg-indigo-500 rounded-full blur-[200px] opacity-40"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.35),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-transparent to-indigo-950/50"></div>

      {/* CARD */}
      <div className="relative z-10 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-10 w-full max-w-md flex flex-col items-center">
        <img src={logo} className="h-20 mb-4" alt="logo" />
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Entrar na Conta</h2>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="seuemail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Senha</label>
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500 hover:text-purple-700"
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-purple-700 transition duration-300"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-gray-600 text-sm">
          Ainda não tem conta?{" "}
          <Link to="/cadastro" className="text-purple-600 font-semibold hover:text-purple-800">
            Criar cadastro
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;