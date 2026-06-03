import { Link } from "react-router-dom";


function Landing() {
  return (
    <div className="min-h-screen flex flex-col font-sans">

     console.log(import.meta.env.VITE_API_URL);
      <section
        className="h-[85vh] flex items-center justify-center  bg-cover bg-center relative"
        style={{ backgroundImage: "url('/bg-comercios.png')" }}
      >

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 to-purple-700/70"></div>

        <div className="relative flex flex-col items-center text-center space-y-6 px-4 animate-fadeIn">

          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            Transforme seus desafios em oportunidades
          </h2>

          <p className="text-lg md:text-2xl text-gray-200 max-w-2xl">
            Descubra como nossa plataforma pode impulsionar seu negócio
            e melhorar a procura.
          </p>

          <Link to="/login">
            <button className="bg-amber-400 text-purple-900 font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-amber-500 hover:scale-105 transition duration-300">
              Comece agora!
            </button>
          </Link>

        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-20 bg-purple-50 flex flex-col items-center gap-12 px-4">

        <h2 className="text-3xl font-bold text-purple-800 text-center">
          POR QUE ESCOLHER NOSSA PLATAFORMA?
        </h2>

        <div className="flex flex-wrap justify-center gap-8">

          {/* CARD 1 */}
          <div className="w-64 p-6 bg-purple-700 text-white rounded-2xl shadow-lg text-center transform hover:scale-105 hover:shadow-2xl transition duration-300">
            <h3 className="text-lg font-semibold mb-2">
              FÁCIL DE USAR
            </h3>
            <p>
              Interface intuitiva e amigável para todos os níveis de experiência.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="w-64 p-6 bg-purple-700 text-white rounded-2xl shadow-lg text-center transform hover:scale-105 hover:shadow-2xl transition duration-300">
            <h3 className="text-lg font-semibold mb-2">
              DIGITALIZAÇÃO DO NEGÓCIO
            </h3>
            <p>
              Estímulo da economia local através da visibilidade dos comércios.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="w-64 p-6 bg-purple-700 text-white rounded-2xl shadow-lg text-center transform hover:scale-105 hover:shadow-2xl transition duration-300">
            <h3 className="text-lg font-semibold mb-2">
              SUPORTE DEDICADO
            </h3>
            <p>
              Equipe pronta para ajudar você em qualquer momento.
            </p>
          </div>

        </div>

      </section>

    {/* PLANOS */}
<section className="py-20 bg-gradient-to-b from-purple-700 to-purple-900 text-white flex flex-col items-center px-4">

  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
    ESCOLHA O MELHOR PLANO PARA VOCÊ
  </h2>

  <p className="text-purple-200 mb-10 text-center">
    Potencialize seu comércio com mais visibilidade 🚀
  </p>

  <div className="flex flex-wrap justify-center gap-8">

    {/* BRONZE */}
    <div className="bg-white text-gray-800 rounded-2xl shadow-xl p-6 w-72 text-center transform hover:scale-105 transition">

      <h3 className="text-xl font-bold text-purple-700 mb-2">
        🥉 Bronze
      </h3>

      <ul className="text-sm text-gray-600 mb-6 space-y-2">
        <li>✔ Visibilidade básica</li>
        <li>✔ Suporte padrão</li>
      </ul>

      <p className="text-2xl font-bold mb-4">
        R$19,90<span className="text-sm">/mês</span>
      </p>

      <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition">
        Escolher plano
      </button>
    </div>

    {/* PRATA */}
    <div className="bg-white text-gray-800 rounded-2xl shadow-2xl p-6 w-72 text-center transform hover:scale-110 transition border-4 border-amber-400">

      <h3 className="text-xl font-bold text-purple-700 mb-2">
        🥈 Prata
      </h3>

      <ul className="text-sm text-gray-600 mb-6 space-y-2">
        <li>✔ Destaque nos comércios</li>
        <li>✔ Suporte prioritário</li>
      </ul>

      <p className="text-2xl font-bold mb-4">
        R$29,90<span className="text-sm">/mês</span>
      </p>

      <button className="bg-amber-400 text-purple-900 px-4 py-2 rounded-lg font-semibold hover:bg-amber-500 transition">
        Escolher plano
      </button>
    </div>

    {/* OURO */}
    <div className="bg-white text-gray-800 rounded-2xl shadow-xl p-6 w-72 text-center transform hover:scale-105 transition">

      <h3 className="text-xl font-bold text-purple-700 mb-2">
        🥇 Ouro
      </h3>

      <ul className="text-sm text-gray-600 mb-6 space-y-2">
        <li>✔ Máxima visibilidade</li>
        <li>✔ Suporte VIP</li>
      </ul>

      <p className="text-2xl font-bold mb-4">
        R$39,90<span className="text-sm">/mês</span>
      </p>

      <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition">
        Escolher plano
      </button>
    </div>

  </div>

</section>
    
    </div>
  );
}

export default Landing;