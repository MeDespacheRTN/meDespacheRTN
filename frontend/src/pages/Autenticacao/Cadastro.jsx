import logo from "../../assets/midislogoE.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { BiSolidStore } from "react-icons/bi";
import Header from "../../components/Header";

function Cadastro() {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState("consumidor");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nomeLoja, setNomeLoja] = useState("");
  const [cnpj, setCnpj] = useState("");

  const formatarCnpj = (valor) => {
    return valor
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Preencha todos os campos",
      });
      return;
    }

    if (senha.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Senha fraca",
        text: "Mínimo 6 caracteres",
      });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}auth/cadastro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
          tipo,
          nomeLoja,
          cnpj,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: data.error,
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Cadastro realizado!",
      }).then(() => {
        navigate("/login");
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao conectar com servidor",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-36 pb-10 relative overflow-hidden bg-[#070014]">
      <Header />

      {/* 🔥 BACKGROUND PREMIUM */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[180px] opacity-50"></div>
      <div className="absolute top-[10%] right-[-200px] w-[600px] h-[600px] bg-fuchsia-500 rounded-full blur-[180px] opacity-50"></div>
      <div className="absolute bottom-[-250px] left-[20%] w-[700px] h-[700px] bg-indigo-500 rounded-full blur-[200px] opacity-40"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.35),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-transparent to-indigo-950/50"></div>

      {/* CARD */}
      <div className="relative z-10 bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center">

        {/* LOGO */}
        <img src={logo} className="h-16 mb-2" alt="logo" />

        {/* TÍTULO */}
        <h2 className="text-2xl font-bold text-gray-800">
          Crie sua conta
        </h2>

        <p className="text-gray-500 mb-6 text-center">
          Escolha seu perfil para começar
        </p>

        {/* SELETOR */}
        <div className="flex bg-gray-200 rounded-xl p-1 w-full mb-6">

          <button
            type="button"
            onClick={() => setTipo("consumidor")}
            className={`w-1/2 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
              tipo === "consumidor"
                ? "bg-white shadow text-gray-800"
                : "text-gray-500"
            }`}
          >
            <FaShoppingBag className="text-lg" />
            Consumidor
          </button>

          <button
            type="button"
            onClick={() => setTipo("comerciante")}
            className={`w-1/2 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
              tipo === "comerciante"
                ? "bg-white shadow text-gray-800"
                : "text-gray-500"
            }`}
          >
            <BiSolidStore className="text-lg" />
            Comerciante
          </button>

        </div>

        {/* FORM */}
        <form onSubmit={handleCadastro} className="w-full flex flex-col gap-4">

          {/* NOME */}
          <div>
            <label className="text-sm text-gray-700 font-medium">
              Nome completo *
            </label>
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-700 font-medium">
              E-mail *
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* SENHA */}
          <div>
            <label className="text-sm text-gray-700 font-medium">
              Senha *
            </label>
            <input
              type="password"
              placeholder="Mín. 6 caracteres"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* CAMPOS DE COMERCIANTE */}
          {tipo === "comerciante" && (
            <>
              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Nome da loja *
                </label>
                <input
                  type="text"
                  placeholder="Nome da sua loja"
                  value={nomeLoja}
                  onChange={(e) => setNomeLoja(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 font-medium">
                  CNPJ *
                </label>
                <input
                  type="text"
                  placeholder="00.000.000/0000-00"
                  value={cnpj}
                  onChange={(e) => setCnpj(formatarCnpj(e.target.value))}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </>
          )}

          {/* BOTÃO */}
          <button
            type="submit"
            className="bg-purple-600 text-white py-3 rounded-full font-semibold hover:bg-purple-700 transition shadow-md"
          >
            Cadastrar
          </button>

        </form>

        {/* LOGIN */}
        <p className="mt-6 text-sm text-gray-500">
          Já tem conta?{" "}
          <Link to="/login" className="text-purple-700 font-medium">
            Faça login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Cadastro;