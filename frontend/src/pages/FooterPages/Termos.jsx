import { Link } from "react-router-dom";

function Termos() {
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
            Termos de Uso
          </h1>
          <p className="text-white/80">
            Última atualização: 2 de Junho de 2026
          </p>
        </section>

        {/* CONTEÚDO */}
        <section className="max-w-4xl mx-auto px-6 py-8 space-y-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
            <p className="text-white/80 leading-relaxed">
              Ao acessar e usar o Me Despache, você concorda em cumprir estes termos de uso. Se não concordar com qualquer parte, não use a plataforma. Me Despache se reserva o direito de modificar estes termos a qualquer momento.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">2. Descrição do Serviço</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Me Despache é uma plataforma que facilita transações comerciais entre comerciantes e clientes através de múltiplos métodos de pagamento. Nossos serviços incluem:
            </p>
            <ul className="space-y-2 text-white/80">
              <li>• Processamento de pagamentos digitais</li>
              <li>• Gestão de transações e relatórios</li>
              <li>• Comunicação entre comerciantes e clientes</li>
              <li>• Análise e dados de vendas</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">3. Responsabilidades do Usuário</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Você concorda em:
            </p>
            <ul className="space-y-2 text-white/80">
              <li>• Fornecer informações precisas e completas</li>
              <li>• Manter a confidencialidade de sua senha</li>
              <li>• Não usar a plataforma para atividades ilegais</li>
              <li>• Não tentar comprometer a segurança do sistema</li>
              <li>• Cumprir todas as leis e regulamentos aplicáveis</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">4. Transações e Pagamentos</h2>
            <p className="text-white/80 leading-relaxed">
              Todas as transações realizadas através do Me Despache são vinculantes. Os comerciantes concordam em fornecer serviços/produtos conforme anunciado. Os clientes concordam em efetuar o pagamento dentro do prazo acordado. Me Despache não se responsabiliza por disputas entre partes sobre a qualidade ou entrega de produtos/serviços.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">5. Limitação de Responsabilidade</h2>
            <p className="text-white/80 leading-relaxed">
              Me Despache é fornecido "como está" sem garantias de qualquer tipo. Não nos responsabilizamos por perda de dados, lucros perdidos ou danos diretos/indiretos resultantes do uso ou incapacidade de usar a plataforma.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">6. Propriedade Intelectual</h2>
            <p className="text-white/80 leading-relaxed">
              Todo o conteúdo, design e funcionalidades do Me Despache são protegidos por leis de propriedade intelectual. Você não pode reproduzir, distribuir ou criar trabalhos derivados sem permissão expressa.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">7. Suspensão de Conta</h2>
            <p className="text-white/80 leading-relaxed">
              Me Despache se reserva o direito de suspender ou encerrar contas que violem estes termos ou tenham atividades suspeitas. Avisos serão fornecidos quando possível.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">8. Lei Aplicável</h2>
            <p className="text-white/80 leading-relaxed">
              Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida nos tribunais competentes de Salvador, Bahia.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">9. Contato</h2>
            <p className="text-white/80 leading-relaxed">
              Para dúvidas sobre estes termos, entre em contato: contato@medespache.com.br
            </p>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="text-center py-16 max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Documentos Relacionados</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/privacidade"
                className="text-purple-400 hover:text-purple-300 transition font-semibold"
              >
                Política de Privacidade →
              </Link>
              <span className="hidden sm:inline text-white/40">|</span>
              <Link
                to="/seguranca"
                className="text-purple-400 hover:text-purple-300 transition font-semibold"
              >
                Política de Segurança →
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

export default Termos;
