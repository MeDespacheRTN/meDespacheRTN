export default function Perfil() {
  return (
    <div className="min-h-screen bg-[#070014] text-white relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[180px] opacity-40"></div>

      <div className="absolute top-[10%] right-[-150px] w-[400px] h-[400px] bg-fuchsia-500 rounded-full blur-[180px] opacity-40"></div>

      <div className="absolute bottom-[-200px] left-[20%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[200px] opacity-30"></div>

      {/* CONTEÚDO */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-28">
        {/* HEADER */}
        <section className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl mb-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            {/* FOTO */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-5xl font-bold shadow-2xl border-4 border-white/10">
                C
              </div>

              <button className="bg-purple-600 hover:bg-purple-700 transition px-5 py-2 rounded-xl font-medium shadow-lg">
                Alterar Foto
              </button>
            </div>

            {/* INFOS */}
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold">
                    Comerciante
                  </h1>

                  <p className="text-purple-300 mt-2 text-sm sm:text-base">
                    Cliente Premium • Salvador - BA
                  </p>
                </div>

                <button className="bg-indigo-500 hover:bg-indigo-600 transition px-6 py-3 rounded-2xl font-semibold shadow-lg">
                  Editar Perfil
                </button>
              </div>

              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Apaixonado por tecnologia, design moderno e experiências digitais.
                Utilizando o Me Despache para encontrar os melhores estabelecimentos,
                avaliações e promoções da cidade.
              </p>
            </div>
          </div>
        </section>

        {/* CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <p className="text-purple-300 text-sm mb-2">
              Pedidos
            </p>

            <h2 className="text-4xl font-bold">
              128
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <p className="text-purple-300 text-sm mb-2">
              Avaliações
            </p>

            <h2 className="text-4xl font-bold">
              46
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <p className="text-purple-300 text-sm mb-2">
              Favoritos
            </p>

            <h2 className="text-4xl font-bold">
              18
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <p className="text-purple-300 text-sm mb-2">
              Pontos
            </p>

            <h2 className="text-4xl font-bold">
              2.340
            </h2>
          </div>
        </section>

        {/* INFORMAÇÕES */}
        <section className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* DADOS */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">
              Informações Pessoais
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-purple-300 block mb-2">
                  Nome Completo
                </label>

                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-sm text-purple-300 block mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="seuemail@gmail.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-sm text-purple-300 block mb-2">
                  Telefone
                </label>

                <input
                  type="text"
                  placeholder="(71) 99999-9999"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* SEGURANÇA */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">
              Segurança
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-purple-300 block mb-2">
                  Senha Atual
                </label>

                <input
                  type="password"
                  placeholder="********"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-sm text-purple-300 block mb-2">
                  Nova Senha
                </label>

                <input
                  type="password"
                  placeholder="********"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-sm text-purple-300 block mb-2">
                  Confirmar Senha
                </label>

                <input
                  type="password"
                  placeholder="********"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* AÇÕES */}
        <section className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Preferências da Conta
              </h2>

              <p className="text-gray-300 mt-2 text-sm sm:text-base">
                Gerencie notificações, aparência e configurações da sua conta.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white/10 hover:bg-white/20 transition px-6 py-3 rounded-2xl font-medium border border-white/10">
                Cancelar
              </button>

              <button className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-2xl font-semibold shadow-lg">
                Salvar Alterações
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
