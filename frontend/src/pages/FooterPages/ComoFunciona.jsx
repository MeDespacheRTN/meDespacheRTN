import { Link } from "react-router-dom";

function ComoFunciona() {
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
            Como Funciona
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Descubra como o Me Despache facilita a conexão entre pequenos comerciantes e clientes.
          </p>
        </section>

        {/* PASSOS */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Passo 1 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:scale-105 transition">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Cadastre-se</h3>
              <p className="text-white/80">
                Crie sua conta gratuitamente como comerciante ou cliente e comece a usar a plataforma em minutos
              </p>
            </div>

            {/* Passo 2 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:scale-105 transition">
              <div className="w-16 h-16 bg-fuchsia-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Conecte Seus Dados</h3>
              <p className="text-white/80">
                Adicione seus dados bancários ou cartão de forma segura
              </p>
            </div>

            {/* Passo 3 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:scale-105 transition">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Comece a Transacionar</h3>
              <p className="text-white/80">
                Realize pagamentos e recebimentos com PIX, cartão e outras formas rápidas e seguras
              </p>
            </div>
          </div>

          {/* Para Comerciantes */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl mb-16">
            <h2 className="text-3xl font-bold mb-6">Para Comerciantes</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-2xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Cadastre seu Estabelecimento</h4>
                    <p className="text-white/70">Adicione informações sobre seu negócio e ative seu perfil de vendedor</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-2xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Configure Seus Horários</h4>
                    <p className="text-white/70">Defina quando sua loja está aberta e gerenciável de forma remota</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-2xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Receba Pagamentos em Tempo Real</h4>
                    <p className="text-white/70">Suas transações são processadas instantaneamente</p>
                  </div>
                </li>
              </ul>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-2xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Gerencie seu Painel</h4>
                    <p className="text-white/70">Controle pedidos, vendas e relatórios em um único dashboard intuitivo</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-2xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Análises Detalhadas</h4>
                    <p className="text-white/70">Tenha acesso a dados sobre seus clientes e vendas para crescer</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-2xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Suporte 24/7</h4>
                    <p className="text-white/70">Nossa equipe está sempre disponível para ajudar</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Para Clientes */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl mb-16">
            <h2 className="text-3xl font-bold mb-6">Para Clientes</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-2xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Busque Estabelecimentos</h4>
                    <p className="text-white/70">Encontre comerciantes próximos com seus produtos favoritos</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-2xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Pagamentos Seguros</h4>
                    <p className="text-white/70">Pague com PIX, cartão ou outras formas protegidas</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-2xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Histórico de Transações</h4>
                    <p className="text-white/70">Veja todos seus pagamentos e pedidos em um só lugar</p>
                  </div>
                </li>
              </ul>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-2xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Suporte em Chat</h4>
                    <p className="text-white/70">Converse com o comerciante para tirar dúvidas antes de comprar</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-2xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Dados Protegidos</h4>
                    <p className="text-white/70">Sua privacidade e dados são nossa prioridade máxima</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-2xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Interface Intuitiva</h4>
                    <p className="text-white/70">Navegação simples e rápida para encontrar o que precisa</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Métodos de Pagamento */}
          <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6">Métodos de Pagamento</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-5xl mb-3">💳</div>
                <h3 className="font-semibold text-lg mb-2">Cartão de Crédito</h3>
                <p className="text-white/70">Parcelado em até 12x</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-3">📱</div>
                <h3 className="font-semibold text-lg mb-2">PIX</h3>
                <p className="text-white/70">Transferência instantânea</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-3">🔐</div>
                <h3 className="font-semibold text-lg mb-2">Segurança</h3>
                <p className="text-white/70">Criptografia em todos os dados</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="text-center py-16 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-white/80 mb-8">
            Junte-se a milhares de comerciantes e clientes satisfeitos
          </p>
          <Link
            to="/cadastro"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg"
          >
            Criar minha conta
          </Link>
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

export default ComoFunciona;