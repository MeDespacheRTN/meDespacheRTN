import { Link } from "react-router-dom";

function Planos() {
  const planos = [
    {
      nome: "Bronze",
      mensal: "R$ 19,90",
      trimestral: "R$ 53,70",
      anual: "R$ 191,00",
      cor: "bg-yellow-700",
      borda: "border-yellow-600",
      beneficios: [
        "Página do estabelecimento na plataforma",
        "Cadastro de produtos e serviços",
        "Localização no mapa da região",
        "Horário de funcionamento",
        "Botão WhatsApp direto",
        "Avaliações dos clientes",
      ],
    },
    {
      nome: "Silver",
      mensal: "R$ 29,90",
      trimestral: "R$ 80,70",
      anual: "R$ 287,00",
      cor: "bg-gray-500",
      borda: "border-gray-400",
      destaque: true,
      beneficios: [
        "Destaque nas buscas da região",
        "Badge Loja Verificada",
        "Até 100 produtos cadastrados",
        "Promoções e cupons de desconto",
        "Destaque no mapa",
        "Suporte prioritário",
      ],
    },
    {
      nome: "Gold",
      mensal: "R$ 39,90",
      trimestral: "R$ 107,70",
      anual: "R$ 383,00",
      cor: "bg-yellow-400",
      borda: "border-yellow-300",
      beneficios: [
        "Destaque premium no topo da categoria",
        "Produtos ilimitados",
        "Atendimento VIP",
        "Promoções por geolocalização",
        "Catálogo premium",
        "Maior visibilidade na plataforma",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#070014] text-white relative overflow-hidden">

      {/* EFEITOS DE FUNDO */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-700 rounded-full blur-[180px] opacity-30"></div>

      <div className="absolute top-[20%] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 rounded-full blur-[180px] opacity-30"></div>

      <div className="absolute bottom-[-200px] left-[20%] w-[700px] h-[700px] bg-indigo-600 rounded-full blur-[200px] opacity-25"></div>

      <main className="relative z-10 pt-28 pb-20">

        {/* HERO */}
        <section className="text-center px-6 mb-20">

          <h1 className="text-5xl font-bold mb-5">
            Planos para seu Comércio
          </h1>

          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Escolha o plano ideal para aumentar sua visibilidade,
            destacar sua empresa no mapa e atrair mais clientes.
          </p>

        </section>

        {/* PLANOS */}
        <section className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-3 gap-10">

            {planos.map((plano, index) => (

              <div key={index}>

                {/* CARD */}
                <div
                  className={`
                    bg-white
                    text-black
                    rounded-[30px]
                    overflow-hidden
                    border-2
                    shadow-2xl
                    ${plano.borda}
                    ${plano.destaque ? "scale-105" : ""}
                  `}
                >

                  {/* TOPO */}
                  <div
                    className={`
                      ${plano.cor}
                      text-white
                      py-6
                      text-center
                    `}
                  >
                    <h2 className="text-4xl font-bold">
                      {plano.nome}
                    </h2>
                  </div>

                  {/* CONTEÚDO */}
                  <div className="p-8">

                    {/* MENSAL */}
                    <div className="text-center mb-8">

                      <h4 className="font-bold mb-3">
                        MENSAL
                      </h4>

                      <div className="text-5xl font-bold text-purple-900">
                        {plano.mensal}
                      </div>

                    </div>

                    <hr className="border-yellow-700 mb-6" />

                    {/* TRIMESTRAL */}
                    <div className="text-center mb-8">

                      <span className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                        10% OFF
                      </span>

                      <h4 className="font-bold mt-3 mb-3">
                        TRIMESTRAL
                      </h4>

                      <div className="text-4xl font-bold text-purple-900">
                        {plano.trimestral}
                      </div>

                    </div>

                    <hr className="border-yellow-700 mb-6" />

                    {/* ANUAL */}
                    <div className="text-center">

                      <span className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                        20% OFF
                      </span>

                      <h4 className="font-bold mt-3 mb-3">
                        ANUAL
                      </h4>

                      <div className="text-4xl font-bold text-purple-900">
                        {plano.anual}
                      </div>

                    </div>

                    <Link
                      to="/cadastro"
                      className="
                        block
                        mt-8
                        bg-purple-600
                        hover:bg-purple-700
                        text-white
                        text-center
                        py-3
                        rounded-xl
                        font-semibold
                        transition
                      "
                    >
                      Assinar Plano
                    </Link>

                  </div>

                </div>

                {/* BENEFÍCIOS */}
                <div className="mt-8">

                  <ul className="space-y-3">

                    {plano.beneficios.map((beneficio, i) => (

                      <li
                        key={i}
                        className="flex items-start gap-3"
                      >
                        <span className="text-green-400 font-bold">
                          ✓
                        </span>

                        <span className="text-white/90">
                          {beneficio}
                        </span>
                      </li>

                    ))}

                  </ul>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* CTA */}
        <section className="text-center mt-24 px-6">

          <h2 className="text-3xl font-bold mb-4">
            Quer destacar seu negócio?
          </h2>

          <p className="text-white/70 mb-8">
            Escolha um plano e comece a atrair mais clientes hoje.
          </p>

          <Link
            to="/contato"
            className="
              inline-block
              bg-purple-600
              hover:bg-purple-700
              px-8 py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            Falar com nossa equipe
          </Link>

        </section>

        {/* VOLTAR */}
        <section className="text-center mt-16">

          <Link
            to="/"
            className="text-purple-400 hover:text-purple-300 underline"
          >
            ← Voltar para Home
          </Link>

        </section>

      </main>
    </div>
  );
}

export default Planos;