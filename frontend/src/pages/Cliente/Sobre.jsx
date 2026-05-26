import { Link } from "react-router-dom";

function Sobre() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#070014] text-white">

      {/* 🔥 BACKGROUND */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[180px] opacity-50"></div>
      <div className="absolute top-[10%] right-[-200px] w-[600px] h-[600px] bg-fuchsia-500 rounded-full blur-[180px] opacity-50"></div>
      <div className="absolute bottom-[-250px] left-[20%] w-[700px] h-[700px] bg-indigo-500 rounded-full blur-[200px] opacity-40"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.35),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-transparent to-indigo-950/50"></div>

      {/* CONTEÚDO (SEPARADO DO HEADER) */}
      <main className="relative z-10 pt-32">

        {/* HERO */}
        <section className="text-center px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white-200">
            Sobre o Me Despache
          </h1>
          <p className="text-lg text-white-300 max-w-2xl mx-auto">
            Simplificando pagamentos e conectando pessoas com tecnologia de forma rápida, segura e moderna.
          </p>
        </section>

        {/* QUEM SOMOS */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-3xl text-white-300 font-bold mb-4">
              Quem somos
            </h2>

            <p className="text-white-200 mb-4">
              O <span className="font-semibold">Me Despache</span> nasceu com o objetivo de facilitar a vida dos comerciantes e consumidores, oferecendo uma plataforma de pagamentos digitais que é rápida, segura e fácil de usar.
            </p>

            <p className="text-white-200">
              Nossa plataforma integra soluções modernas como PIX, cartões e gestão de transações em um só lugar.
            </p>
          </div>

          {/* CARD GLASS */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 h-64 rounded-2xl flex items-center justify-center">
            <span className="text-white-200">
              Ilustração / Imagem
            </span>
          </div>

        </section>

        {/* MISSÃO VISÃO VALORES */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

            {[
              {
                titulo: "Missão",
                texto: "Aumentar a visibilidade de pequenos comércios.",
              },
              {
                titulo: "Visão",
                texto: "Ser referência em soluções digitais em Salvador.",
              },
              {
                titulo: "Valores",
                texto: "Inovação, transparência e foco no cliente.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-lg hover:scale-105 transition"
              >
                <h3 className="text-xl font-bold mb-2 text-white-200">
                  {item.titulo}
                </h3>
                <p className="text-white-300">{item.texto}</p>
              </div>
            ))}

          </div>
        </section>

        {/* CTA FINAL */}
        <section className="text-center py-16">
          <h2 className="text-3xl font-bold mb-4 text-white-200">
            Pronto para começar?
          </h2>

          <p className="text-white-300 mb-6">
            Crie sua conta e comece a usar agora mesmo.
          </p>

          <Link
            to="/cadastro"
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg"
          >
            Criar conta
          </Link>
        </section>

      </main>
    </div>
  );
}

export default Sobre;