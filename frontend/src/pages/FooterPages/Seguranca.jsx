import { Link } from "react-router-dom";

function Seguranca() {
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
            Segurança
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Sua segurança e privacidade são nossa prioridade máxima. Conheça as medidas que implementamos.
          </p>
        </section>

        {/* CONTEÚDO */}
        <section className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          {/* MEDIDAS DE SEGURANÇA */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Medidas de Segurança</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔐</span> Criptografia
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Todos os dados em trânsito são protegidos com criptografia SSL/TLS 256-bit. Dados sensíveis são armazenados com encriptação AES-256.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">✓</span> Conformidade PCI-DSS
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Estamos em conformidade com as normas PCI-DSS Level 1, garantindo o padrão mais alto de segurança para dados de cartão.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🛡️</span> Autenticação 2FA
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Autenticação de dois fatores disponível para todas as contas. Use app authenticator ou SMS para maior proteção.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔄</span> Monitoramento 24/7
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Sistema de monitoramento contínuo detecta atividades suspeitas e potenciais fraudes em tempo real.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔍</span> Testes de Segurança
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Realizamos testes de penetração, auditorias de segurança e análise de vulnerabilidades regulares.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">👨‍💼</span> Equipe Dedicada
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Equipe especializada em segurança que monitora ameaças e responde rapidamente a incidentes.
                </p>
              </div>
            </div>
          </div>

          {/* DICAS DE SEGURANÇA */}
          <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Dicas de Segurança para Você</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <h4 className="font-semibold mb-2">Senha Forte</h4>
                  <p className="text-white/80">Use senhas com letras, números e símbolos. Mude regularmente.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <h4 className="font-semibold mb-2">Ative 2FA</h4>
                  <p className="text-white/80">Use autenticação de dois fatores para proteção extra.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <h4 className="font-semibold mb-2">Não Compartilhe</h4>
                  <p className="text-white/80">Nunca compartilhe sua senha ou código de segurança com ninguém.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">4️⃣</span>
                <div>
                  <h4 className="font-semibold mb-2">Link Legítimo</h4>
                  <p className="text-white/80">Sempre visite medespache.com.br direto, não por links de email.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">5️⃣</span>
                <div>
                  <h4 className="font-semibold mb-2">WiFi Segura</h4>
                  <p className="text-white/80">Evite redes públicas para transações. Use VPN se necessário.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">6️⃣</span>
                <div>
                  <h4 className="font-semibold mb-2">Denuncie Suspeitos</h4>
                  <p className="text-white/80">Reporte atividades suspeitas imediatamente para nossa equipe.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CERTIFICAÇÕES */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Certificações e Parcerias</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center">
                <div className="text-4xl mb-3">🔒</div>
                <h4 className="font-semibold mb-2">SSL/TLS</h4>
                <p className="text-white/70 text-sm">Certificado de segurança</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center">
                <div className="text-4xl mb-3">✓</div>
                <h4 className="font-semibold mb-2">PCI-DSS</h4>
                <p className="text-white/70 text-sm">Padrão de segurança de cartão</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center">
                <div className="text-4xl mb-3">🏛️</div>
                <h4 className="font-semibold mb-2">LGPD</h4>
                <p className="text-white/70 text-sm">Lei de proteção de dados</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h4 className="font-semibold mb-2">ISO 27001</h4>
                <p className="text-white/70 text-sm">Gestão de segurança informática</p>
              </div>
            </div>
          </div>

          {/* RELATÓRIO DE VULNERABILIDADES */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Relatório de Vulnerabilidades</h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Se encontrar uma vulnerabilidade de segurança, por favor, nos notifique responsavelmente. Não divulgue publicamente até que tenhamos oportunidade de corrigir.
            </p>
            <p className="text-white/80 leading-relaxed">
              Envie detalhes para: security@medespache.com.br
            </p>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="text-center py-16 max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Tem dúvidas sobre segurança?</h2>
            <p className="text-white/80 mb-6">
              Nossa equipe está pronta para ajudar com questões de segurança
            </p>
            <Link
              to="/contato"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg"
            >
              Entrar em Contato
            </Link>
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

export default Seguranca;
