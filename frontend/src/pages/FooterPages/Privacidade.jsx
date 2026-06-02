import { Link } from "react-router-dom";

function Privacidade() {
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
            Política de Privacidade
          </h1>
          <p className="text-white/80">
            Última atualização: 2 de Junho de 2026
          </p>
        </section>

        {/* CONTEÚDO */}
        <section className="max-w-4xl mx-auto px-6 py-8 space-y-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">1. Coleta de Informações</h2>
            <p className="text-white/80 leading-relaxed">
              Me Despache coleta informações que você fornece voluntariamente, como nome, email, telefone e dados bancários. Também coletamos informações automaticamente através de cookies e análise de uso para melhorar nossos serviços.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">2. Como Usamos Seus Dados</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Seus dados são utilizados para:
            </p>
            <ul className="space-y-2 text-white/80">
              <li>• Processar transações e pagamentos</li>
              <li>• Melhorar e otimizar a plataforma</li>
              <li>• Comunicação sobre sua conta</li>
              <li>• Prevenção de fraude e detecção de abuso</li>
              <li>• Cumprir obrigações legais</li>
              <li>• Marketing (com seu consentimento)</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">3. Segurança de Dados</h2>
            <p className="text-white/80 leading-relaxed">
              Implementamos medidas de segurança robustas incluindo criptografia SSL/TLS, autenticação segura e conformidade com PCI-DSS. Seus dados financeiros são protegidos em servidores criptografados.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">4. Compartilhamento de Dados</h2>
            <p className="text-white/80 leading-relaxed">
              Não vendemos seus dados pessoais. Podemos compartilhar dados com parceiros de pagamento, provedores de serviço e quando exigido por lei. Todos os parceiros concordam em manter a confidencialidade.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
            <p className="text-white/80 leading-relaxed">
              Usamos cookies para melhorar sua experiência. Você pode desabilitar cookies em seu navegador, mas algumas funcionalidades podem não funcionar corretamente. Cookies ajudam com autenticação e análise de uso.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">6. Direitos do Usuário</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Você tem direito a:
            </p>
            <ul className="space-y-2 text-white/80">
              <li>• Acessar seus dados pessoais</li>
              <li>• Corrigir dados inexatos</li>
              <li>• Solicitar exclusão de dados</li>
              <li>• Exercer portabilidade de dados</li>
              <li>• Retirar consentimento a qualquer momento</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">7. Retenção de Dados</h2>
            <p className="text-white/80 leading-relaxed">
              Retemos dados pelo tempo necessário para fornecer serviços e cumprir obrigações legais. Você pode solicitar exclusão de dados a qualquer momento, sujeito a exigências legais de retenção.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">8. Privacidade de Menores</h2>
            <p className="text-white/80 leading-relaxed">
              Me Despache não é destinado a menores de 18 anos. Não coletamos dados deliberadamente de menores. Se descobrirmos, excluiremos imediatamente.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">9. Alterações na Política</h2>
            <p className="text-white/80 leading-relaxed">
              Podemos atualizar esta política ocasionalmente. Alterações significativas serão comunicadas por email. Continuar usando significa aceitar as mudanças.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">10. Contato</h2>
            <p className="text-white/80 leading-relaxed">
              Para dúvidas sobre privacidade: contato@medespache.com.br ou (71) 3366-8899
            </p>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="text-center py-16 max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Documentos Relacionados</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/termos"
                className="text-purple-400 hover:text-purple-300 transition font-semibold"
              >
                Termos de Uso →
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

export default Privacidade;
