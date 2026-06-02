import { Link } from "react-router-dom";

function CentralAjuda() {
  const categorias = [
    {
      titulo: "Começando",
      descricao: "Aprenda o básico sobre Me Despache",
      icon: "🚀",
      artigos: [
        { titulo: "O que é Me Despache?", link: "#" },
        { titulo: "Como criar uma conta", link: "#" },
        { titulo: "Verificar sua identidade", link: "#" },
        { titulo: "Adicionar forma de pagamento", link: "#" },
      ],
    },
    {
      titulo: "Para Comerciantes",
      descricao: "Gerencie seu negócio online",
      icon: "🏪",
      artigos: [
        { titulo: "Cadastrar um estabelecimento", link: "#" },
        { titulo: "Configurar horários e localização", link: "#" },
        { titulo: "Gerenciar pedidos", link: "#" },
        { titulo: "Entender seus relatórios", link: "#" },
      ],
    },
    {
      titulo: "Para Clientes",
      descricao: "Compre com segurança e confiança",
      icon: "🛍️",
      artigos: [
        { titulo: "Buscar estabelecimentos", link: "#" },
        { titulo: "Realizar uma compra", link: "#" },
        { titulo: "Métodos de pagamento", link: "#" },
        { titulo: "Rastrear seu pedido", link: "#" },
      ],
    },
    {
      titulo: "Segurança",
      descricao: "Proteja sua conta e dados",
      icon: "🔒",
      artigos: [
        { titulo: "Manter sua senha segura", link: "#" },
        { titulo: "Autenticação de dois fatores", link: "#" },
        { titulo: "Privacidade de dados", link: "#" },
        { titulo: "Reportar atividade suspeita", link: "#" },
      ],
    },
    {
      titulo: "Pagamentos",
      descricao: "Entenda as formas de pagamento",
      icon: "💳",
      artigos: [
        { titulo: "PIX - Pagamentos instantâneos", link: "#" },
        { titulo: "Cartão de crédito", link: "#" },
        { titulo: "Parcelamento", link: "#" },
        { titulo: "Boleto bancário", link: "#" },
      ],
    },
    {
      titulo: "Problemas Comuns",
      descricao: "Resolva problemas rapidamente",
      icon: "⚠️",
      artigos: [
        { titulo: "Pagamento recusado", link: "#" },
        { titulo: "Não recebi meu pedido", link: "#" },
        { titulo: "Erro ao fazer login", link: "#" },
        { titulo: "Dúvida sobre uma transação", link: "#" },
      ],
    },
  ];

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
            Central de Ajuda
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Encontre soluções, dicas e tutoriais para aproveitar ao máximo Me Despache
          </p>
        </section>

        {/* BARRA DE BUSCA */}
        <section className="max-w-2xl mx-auto px-6 pb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Busque ajuda aqui..."
              className="w-full bg-white/10 border border-white/10 rounded-xl px-6 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300">
              🔍
            </button>
          </div>
        </section>

        {/* CATEGORIAS */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias.map((categoria, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:scale-105 transition"
              >
                <div className="text-5xl mb-4">{categoria.icon}</div>
                <h3 className="text-xl font-bold mb-2">{categoria.titulo}</h3>
                <p className="text-white/60 mb-6 text-sm">{categoria.descricao}</p>

                <ul className="space-y-3">
                  {categoria.artigos.map((artigo, i) => (
                    <li key={i}>
                      <a
                        href={artigo.link}
                        className="text-purple-400 hover:text-purple-300 transition text-sm flex items-center gap-2"
                      >
                        <span>→</span> {artigo.titulo}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* DESTAQUES */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-8">Artigos em Destaque</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">📱</span> Guia Completo: PIX
              </h3>
              <p className="text-white/80 mb-4">
                Entenda tudo sobre PIX: como configurar, fazer transferências e receber pagamentos instantaneamente.
              </p>
              <a href="#" className="text-purple-400 hover:text-purple-300 font-semibold">
                Ler artigo →
              </a>
            </div>

            <div className="bg-gradient-to-r from-fuchsia-600/20 to-indigo-600/20 border border-fuchsia-500/30 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">🏪</span> Como Maximizar Vendas
              </h3>
              <p className="text-white/80 mb-4">
                Dicas práticas para aumentar sua visibilidade, atrair mais clientes e crescer seu negócio.
              </p>
              <a href="#" className="text-fuchsia-400 hover:text-fuchsia-300 font-semibold">
                Ler artigo →
              </a>
            </div>


          </div>
        </section>

        {/* SUPORTE DIRETO */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Ainda precisa de ajuda?</h2>
            <p className="text-white/80 mb-6">
              Nossa equipe de suporte está disponível para responder suas dúvidas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contato"
                className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg"
              >
                Contate-nos
              </Link>
              <Link
                to="/faq"
                className="bg-white/10 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition"
              >
                Ver FAQ
              </Link>
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

export default CentralAjuda;
