import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Contato() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setFormData({ nome: "", email: "", assunto: "", mensagem: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#070014] text-white">
      {/* 🔥 BACKGROUND */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[180px] opacity-50"></div>
      <div className="absolute top-[10%] right-[-200px] w-[600px] h-[600px] bg-fuchsia-500 rounded-full blur-[180px] opacity-50"></div>
      <div className="absolute bottom-[-250px] left-[20%] w-[700px] h-[700px] bg-indigo-500 rounded-full blur-[200px] opacity-40"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.35),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-transparent to-indigo-950/50"></div>

      {/* CONTEÚDO */}
      <main className="relative z-10 pt-32 pb-20">
        {/* HERO */}
        <section className="text-center px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Fale Conosco
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Estamos aqui para ajudar. Entre em contato conosco e responderemos assim que possível.
          </p>
        </section>

        {/* CONTATO */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* FORMULÁRIO */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Envie uma Mensagem</h2>

              {enviado && (
                <div className="bg-green-500/20 border border-green-500 p-4 rounded-xl mb-6">
                  <p className="text-green-300">✓ Mensagem enviada com sucesso!</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition"
                    placeholder="João Silva"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Assunto
                  </label>
                  <input
                    type="text"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition"
                    placeholder="Como posso ajudar?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Mensagem
                  </label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition resize-none"
                    placeholder="Conte-nos mais..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>

            {/* INFORMAÇÕES DE CONTATO */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Outras Formas de Contato</h2>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <span className="text-2xl">📧</span> Email
                  </h3>
                  <p className="text-white/80">
                    contato@medespache.com.br
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    Resposta em até 24 horas
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <span className="text-2xl">📱</span> Telefone
                  </h3>
                  <p className="text-white/80">
                    (71) 3366-8899
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    Seg-Sex, 09h às 18h
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <span className="text-2xl">📍</span> Localização
                  </h3>
                  <p className="text-white/80">
                    Salvador, Bahia - Brasil
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    Operando em toda a cidade
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <span className="text-2xl">💬</span> Chat ao Vivo
                  </h3>
                  <p className="text-white/80">
                    Disponível no aplicativo
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    Resposta média de 5 minutos
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 p-6 rounded-2xl">
                <h3 className="font-semibold mb-2">Central de Ajuda</h3>
                <p className="text-white/80 mb-4">
                  Encontre respostas rápidas para as perguntas mais comuns
                </p>
                <Link
                  to="/ajuda"
                  className="text-purple-400 hover:text-purple-300 transition font-semibold"
                >
                  Acessar Central →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* VOLTAR */}
        <section className="text-center py-8">
          <Link
            to="/"
            className="text-purple-400 hover:text-purple-300 transition underline"
          >
            ← Voltar para Home
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Contato;
