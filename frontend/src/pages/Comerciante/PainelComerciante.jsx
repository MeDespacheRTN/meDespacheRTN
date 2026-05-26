export default function PainelComerciante() {
  const produtos = [
    {
      id: 1,
      nome: "X-Burger Artesanal",
      preco: "R$ 24,90",
      estoque: 18,
    },
    {
      id: 2,
      nome: "Pizza Calabresa",
      preco: "R$ 49,90",
      estoque: 7,
    },
    {
      id: 3,
      nome: "Açaí 700ml",
      preco: "R$ 19,90",
      estoque: 23,
    },
  ];

  const avaliacoes = [
    {
      id: 1,
      nome: "Carlos",
      nota: 5,
      comentario: "Entrega rápida e comida muito boa.",
    },
    {
      id: 2,
      nome: "Amanda",
      nota: 4,
      comentario: "Gostei bastante do atendimento.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070014] text-white flex overflow-hidden relative">
      {/* BACKGROUND */}
      <div
        className="
          absolute -top-40 -left-40
          w-[300px] h-[300px]
          md:w-[600px] md:h-[600px]
          bg-purple-600 rounded-full
          blur-[180px] opacity-40
        "
      ></div>

      <div
        className="
          absolute top-[10%] right-[-100px]
          w-[300px] h-[300px]
          md:w-[600px] md:h-[600px]
          bg-fuchsia-500 rounded-full
          blur-[180px] opacity-40
        "
      ></div>

      <div
        className="
          absolute bottom-[-250px] left-[20%]
          w-[350px] h-[350px]
          md:w-[700px] md:h-[700px]
          bg-indigo-500 rounded-full
          blur-[200px] opacity-30
        "
      ></div>

      {/* SIDEBAR */}
      <aside
        className="
          hidden md:flex
          w-72 h-screen fixed top-0 left-0 z-20
          flex-col
          bg-gradient-to-b from-purple-950/70 via-purple-900/60 to-indigo-950/70
          backdrop-blur-2xl border-r border-white/10 shadow-2xl
          p-6
        "
      >
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-purple-200">
            Painel
          </h1>

          <p className="text-purple-400 text-sm mt-1">
            Área do vendedor
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          {[
            "Dashboard",
            "Meu Estabelecimento",
            "Produtos",
            "Avaliações",
            "Configurações",
          ].map((item) => (
            <button
              key={item}
              className="
                text-left px-4 py-3 rounded-xl
                bg-white/5 hover:bg-white/10
                transition border border-white/5
                hover:border-purple-400/30
              "
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main
        className="
          relative z-10 flex-1
          md:ml-72
          p-4 sm:p-6 md:p-8
          space-y-6 md:space-y-8
          pb-20
        "
      >
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Dashboard do Comerciante
            </h2>

            <p className="text-purple-300 mt-2 text-sm sm:text-base">
              Gerencie seu estabelecimento
            </p>
          </div>

          <button
            className="
              w-full sm:w-fit
              bg-purple-600 hover:bg-purple-700
              px-6 py-3 rounded-xl
              font-semibold shadow-lg transition
            "
          >
            + Novo Produto
          </button>
        </div>

        {/* CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-6 shadow-xl">
            <p className="text-purple-300 text-sm mb-2">
              Avaliação Média
            </p>

            <h3 className="text-3xl md:text-4xl font-bold">
              0.0 ⭐
            </h3>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-6 shadow-xl">
            <p className="text-purple-300 text-sm mb-2">
              Visualizações
            </p>

            <h3 className="text-3xl md:text-4xl font-bold">
              0
            </h3>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-6 shadow-xl">
            <p className="text-purple-300 text-sm mb-2">
              Pedidos Hoje
            </p>

            <h3 className="text-3xl md:text-4xl font-bold">
              0
            </h3>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-6 shadow-xl">
            <p className="text-purple-300 text-sm mb-2">
              Faturamento
            </p>

            <h3 className="text-3xl md:text-4xl font-bold">
              R$ 0,00
            </h3>
          </div>
        </section>

        {/* ESTABELECIMENTO */}
        <section className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">
              Meu Estabelecimento
            </h2>

            <button className="w-full sm:w-fit bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-xl transition">
              Editar
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div
                className="
                  h-48 sm:h-64
                  rounded-2xl overflow-hidden
                  bg-gray-300 mb-4
                  flex items-center justify-center
                  text-black font-semibold
                "
              >
                Banner da Loja
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2">
                {[1, 2, 3].map((img) => (
                  <div
                    key={img}
                    className="
                      min-w-[100px] sm:min-w-[120px]
                      h-24 sm:h-28
                      rounded-2xl bg-gray-300
                      flex items-center justify-center
                      text-black
                    "
                  >
                    Foto {img}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-purple-300 text-sm">
                  Nome
                </p>

                <h3 className="text-xl sm:text-2xl font-bold">
                  Midis Burgers
                </h3>
              </div>

              <div>
                <p className="text-purple-300 text-sm">
                  Categoria
                </p>

                <h3 className="text-lg font-semibold">
                  Hamburgueria
                </h3>
              </div>

              <div>
                <p className="text-purple-300 text-sm">
                  Endereço
                </p>

                <h3 className="text-lg font-semibold">
                  Salvador - BA
                </h3>
              </div>

              <div>
                <p className="text-purple-300 text-sm mb-2">
                  Descrição
                </p>

                <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                  Hamburgueria artesanal focada em qualidade,
                  entrega rápida e experiência premium para os
                  clientes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUTOS */}
        <section className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">
              Produtos
            </h2>

            <button className="w-full sm:w-fit bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl transition">
              Adicionar Produto
            </button>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="
                  bg-white/5 border border-white/10
                  rounded-2xl overflow-hidden
                  hover:scale-[1.02] transition
                "
              >
                <div className="h-40 sm:h-44 bg-gray-300 flex items-center justify-center text-black">
                  Imagem Produto
                </div>

                <div className="p-4">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">
                    {produto.nome}
                  </h3>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-green-400 font-semibold">
                      {produto.preco}
                    </span>

                    <span className="text-sm text-purple-300">
                      Estoque: {produto.estoque}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AVALIAÇÕES */}
        <section className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            Avaliações
          </h2>

          <div className="space-y-4">
            {avaliacoes.map((avaliacao) => (
              <div
                key={avaliacao.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="font-bold text-lg">
                    {avaliacao.nome}
                  </h3>

                  <span className="text-yellow-400 font-semibold">
                    {avaliacao.nota} ⭐
                  </span>
                </div>

                <p className="text-gray-300 text-sm sm:text-base">
                  {avaliacao.comentario}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CONFIGURAÇÕES */}
        <section className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            Configurações
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-purple-300">
                Nome do estabelecimento
              </label>

              <input
                type="text"
                placeholder="Nome"
                className="
                  w-full bg-white/5
                  border border-white/10
                  rounded-xl p-3
                  outline-none
                  focus:border-purple-500
                "
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-purple-300">
                Telefone
              </label>

              <input
                type="text"
                placeholder="(71) 99999-9999"
                className="
                  w-full bg-white/5
                  border border-white/10
                  rounded-xl p-3
                  outline-none
                  focus:border-purple-500
                "
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-purple-300">
                Descrição
              </label>

              <textarea
                rows={5}
                placeholder="Descrição"
                className="
                  w-full bg-white/5
                  border border-white/10
                  rounded-xl p-3
                  outline-none
                  focus:border-purple-500
                  resize-none
                "
              />
            </div>
          </div>

          <button
            className="
              mt-6 w-full sm:w-fit
              bg-purple-600 hover:bg-purple-700
              px-6 py-3 rounded-xl
              font-semibold transition
            "
          >
            Salvar Alterações
          </button>
        </section>
      </main>
    </div>
  );
}