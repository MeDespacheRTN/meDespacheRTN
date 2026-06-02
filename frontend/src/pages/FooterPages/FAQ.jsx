import { Link } from "react-router-dom";
import { useState } from "react";

function FAQ() {
  const [expandido, setExpandido] = useState(null);

  const faqs = [
    {
      categoria: "Geral",
      perguntas: [
        {
          id: 1,
          pergunta: "O que é o Me Despache?",
          resposta:
            "Me Despache é uma plataforma digital que conecta comerciantes e clientes, facilitando a visibilidade do pequeno e médio empreendimento no mapa.",
        },
        {
          id: 2,
          pergunta: "Como me cadastro?",
          resposta:
            "Acesse nosso site, clique em 'Cadastro' e siga os passos. Você precisará informar seus dados pessoais ou da empresa. O processo leva cerca de 5 minutos.",
        },
       
      ],
    },
    {
      categoria: "Para Comerciantes",
      perguntas: [
        {
          id: 4,
          pergunta: "Qual é a taxa de transação?",
          resposta:
            "Nossas taxas variam de acordo com o plano e forma de pagamento. No plano Profissional, PIX sai por 0% e cartão por 2,99%.",
        },
      ],
    },
    {
      categoria: "Para Clientes",
      perguntas: [
        {
          id: 8,
          pergunta: "Como encontrar comerciantes?",
          resposta:
            "Use o mapa ou a busca na página inicial. Você pode filtrar por categoria, localização e avaliações para encontrar exatamente o que procura.",
        },
        {
          id: 11,
          pergunta: "Posso falar com o comerciante?",
          resposta:
            "Sim! Há um chat integrado em cada perfil de estabelecimento. Você pode conversar com o comerciante antes e depois de comprar.",
        },
      ],
    },
    {
      categoria: "Pagamentos",
      perguntas: [
        {
          id: 12,
          pergunta: "Quais formas de pagamento são aceitas?",
          resposta:
            "Aceitamos PIX (instantâneo), Cartão de Crédito (com parcelamento), Débito.",
        },
        {
          id: 14,
          pergunta: "Meu pagamento foi recusado. O que fazer?",
          resposta:
            "Verifique seus dados (número, validade, CVC). Se persistir, contate seu banco. Você pode tentar outro cartão ou PIX.",
        },
      ],
    },
    {
      categoria: "Suporte",
      perguntas: [
        {
          id: 15,
          pergunta: "Como contatar o suporte?",
          resposta:
            "Você pode nos contatar via email (contato@medespache.com.br), telefone (71) 3366-8899 ou chat ao vivo no aplicativo. Respondemos em até 24 horas.",
        },
        {
          id: 16,
          pergunta: "Qual é o horário de atendimento?",
          resposta:
            "Estamos disponíveis de segunda a sexta, das 09h às 18h. Clientes premium têm suporte 24/7.",
        },
        {
          id: 17,
          pergunta: "Como reportar um problema?",
          resposta:
            "Acesse a seção 'Suporte' no aplicativo ou site, clique em 'Reportar Problema' e descreva o ocorrido. Investigaremos e responderemos rapidamente.",
        },
      ],
    },
  ];

  const togglePergunta = (id) => {
    setExpandido(expandido === id ? null : id);
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
            Perguntas Frequentes
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre Me Despache
          </p>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          {faqs.map((categoria, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-white/90">
                {categoria.categoria}
              </h2>

              <div className="space-y-4">
                {categoria.perguntas.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition hover:border-white/20"
                  >
                    <button
                      onClick={() => togglePergunta(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition"
                    >
                      <h3 className="font-semibold text-lg">{faq.pergunta}</h3>
                      <span
                        className={`text-xl transition ${
                          expandido === faq.id
                            ? "text-purple-400 rotate-180"
                            : "text-white/60"
                        }`}
                      >
                        ▼
                      </span>
                    </button>

                    {expandido === faq.id && (
                      <div className="px-6 py-4 bg-white/5 border-t border-white/10">
                        <p className="text-white/80 leading-relaxed">
                          {faq.resposta}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* CTA FINAL */}
        <section className="max-w-4xl mx-auto px-6 py-16 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">Ainda não encontrou a resposta?</h2>
          <p className="text-white/80 mb-6">
            Nossa equipe de suporte está pronta para ajudar
          </p>
          <Link
            to="/contato"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg"
          >
            Fale Conosco
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

export default FAQ;
