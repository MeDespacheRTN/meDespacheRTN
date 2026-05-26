import { useState, useEffect } from "react";
import Map from "../components/Map";
import { useNavigate } from "react-router-dom";

// IMPORT DAS IMAGENS
import banner1 from "../assets/banners/banner1.png";
import banner2 from "../assets/banners/banner2.png";
import banner3 from "../assets/banners/banner3.png";

function Home() {
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);

  const [showCategorias, setShowCategorias] = useState(false);
  const [showConfiguracoes, setShowConfiguracoes] =
    useState(false);

  const [melhoresEmpresas, setMelhoresEmpresas] = useState([]);

  const banners = [banner1, banner2, banner3];

  const [estabelecimentos, setEstabelecimentos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function buscarEstabelecimentos() {
      try {
        const response = await fetch(
          "http://localhost:5005/estabelecimentos"
        );

        const data = await response.json();

        setEstabelecimentos(data);
      } catch (erro) {
        console.log(erro);
      }
    }

    buscarEstabelecimentos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    const buscarMelhoresAvaliacoes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5005/auth/melhores_avaliacoes"
        );

        const data = await response.json();

        if (response.ok) {
          setMelhoresEmpresas(data);
        }
      } catch (error) {
        console.error(
          "Erro ao buscar avaliações:",
          error
        );
      }
    };

    buscarMelhoresAvaliacoes();
  }, []);

  function AbrirLoja(id) {
    navigate(`/loja/${id}`);
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#070014] text-white">
      {/* BLOBS */}
      <div
        className="
          absolute -top-40 -left-40
          w-[300px] h-[300px]
          md:w-[600px] md:h-[600px]
          bg-purple-600 rounded-full
          blur-[180px] opacity-50
        "
      ></div>

      <div
        className="
          absolute top-[10%] right-[-100px]
          w-[300px] h-[300px]
          md:w-[600px] md:h-[600px]
          bg-fuchsia-500 rounded-full
          blur-[180px] opacity-50
        "
      ></div>

      <div
        className="
          absolute bottom-[-250px] left-[20%]
          w-[350px] h-[350px]
          md:w-[700px] md:h-[700px]
          bg-indigo-500 rounded-full
          blur-[200px] opacity-40
        "
      ></div>

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.35),transparent_50%)]"></div>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-transparent to-indigo-950/50"></div>

      {/* SIDEBAR */}
      <aside
        className="
          hidden md:flex
          w-64 fixed top-0 left-0 h-full pt-28 z-10
          flex-col
          bg-gradient-to-b from-purple-950/70 via-purple-900/60 to-indigo-950/70
          backdrop-blur-2xl border-r border-white/10 shadow-2xl
        "
      >
        <div className="px-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-200">
            Menu
          </h2>

          <p className="text-sm text-purple-400">
            Navegação
          </p>
        </div>

        <nav className="flex flex-col gap-2 px-4">

          {/* CATEGORIAS */}
          <div>
            <button
              onClick={() =>
                setShowCategorias(!showCategorias)
              }
              className="
                w-full
                px-4 py-3
                rounded-xl
                text-purple-200
                hover:bg-white/10 hover:text-white
                transition-all duration-200
                flex items-center justify-between
              "
            >
              <span>Categorias</span>

              <span
                className={`transition-transform duration-300 ${
                  showCategorias ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {/* POPUP CATEGORIAS */}
            <div
              className={`
                overflow-hidden
                transition-all duration-300
                ${
                  showCategorias
                    ? "max-h-96 mt-2"
                    : "max-h-0"
                }
              `}
            >
              <div
                className="
                  bg-white/5
                  border border-white/10
                  rounded-2xl
                  p-3
                  flex flex-col gap-2
                  backdrop-blur-xl
                "
              >
                {[
                  "🍔 Lanches",
                  "🍕 Pizza",
                  "🍣 Japonesa",
                  "🥗 Saudável",
                  "🍰 Doces",
                  "🛒 Mercados",
                ].map((categoria, i) => (
                  <button
                    key={i}
                    className="
                      text-left
                      px-3 py-2
                      rounded-xl
                      text-sm
                      text-purple-100
                      hover:bg-white/10
                      transition
                    "
                  >
                    {categoria}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PRÓXIMOS */}
          <button
            className="
              text-left
              px-4 py-3
              rounded-xl
              text-purple-200
              hover:bg-white/10 hover:text-white
              transition-all duration-200
              hover:pl-6
            "
          >
            Próximos
          </button>

          {/* AVALIADOS */}
          <button
            className="
              text-left
              px-4 py-3
              rounded-xl
              text-purple-200
              hover:bg-white/10 hover:text-white
              transition-all duration-200
              hover:pl-6
            "
          >
            Avaliados
          </button>

          {/* CONFIGURAÇÕES */}
<div>
  <button
    onClick={() =>
      setShowConfiguracoes(!showConfiguracoes)
    }
    className="
      w-full
      px-4 py-3
      rounded-xl
      text-purple-200
      hover:bg-white/10 hover:text-white
      transition-all duration-200
      flex items-center justify-between
    "
  >
    <span>Configurações</span>

    <span
      className={`transition-transform duration-300 ${
        showConfiguracoes ? "rotate-180" : ""
      }`}
    >
      ▼
    </span>
  </button>

  {/* POPUP CONFIG */}
  <div
    className={`
      overflow-hidden
      transition-all duration-300
      ${
        showConfiguracoes
          ? "max-h-96 mt-2"
          : "max-h-0"
      }
    `}
  >
    <div
      className="
        bg-white/5
        border border-white/10
        rounded-2xl
        p-3
        flex flex-col gap-2
        backdrop-blur-xl
      "
    >
      {[
        {
          nome: "👤 Perfil",
          rota: "/perfil",
        },
        {
          nome: "🔔 Notificações",
        },
        {
          nome: "🔒 Privacidade",
        },
        {
          nome: "💳 Pagamentos",
        },
      ].map((config, i) => (
        <button
          key={i}
          onClick={() => {
            if (config.rota) {
              navigate(config.rota);
            }
          }}
          className="
            text-left
            px-3 py-2
            rounded-xl
            text-sm
            text-purple-100
            hover:bg-white/10
            transition
          "
        >
          {config.nome}
        </button>
      ))}
    </div>
  </div>
</div>

        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main
        className="
          relative z-10 flex-1
          md:ml-64
          flex flex-col
          p-4 md:p-6
          gap-6
          pt-24 md:pt-32
        "
      >
        {/* BUSCA */}
        <div className="w-full flex justify-center">
          <input
            type="text"
            placeholder="Buscar comércios..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full max-w-2xl
              px-4 sm:px-5 py-3
              rounded-xl
              bg-white/90 text-black
              border border-gray-300
              shadow-sm
              focus:outline-none
              focus:ring-2 focus:ring-purple-600
            "
          />
        </div>

        {/* CARROSSEL */}
        <section>
          <h2 className="text-xl font-bold text-purple-200 mb-4">
            🎯 Promoções
          </h2>

          <div className="w-full h-52 sm:h-64 md:h-80 relative overflow-hidden rounded-2xl shadow-lg">
            <div
              className="flex transition-transform duration-700"
              style={{
                transform: `translateX(-${
                  index * 100
                }%)`,
              }}
            >
              {banners.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Banner ${i}`}
                  className="w-full h-52 sm:h-64 md:h-80 object-cover flex-shrink-0"
                />
              ))}
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === index
                      ? "bg-white"
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* MAIS BEM AVALIADOS */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">
            ⭐ Mais bem avaliados
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {melhoresEmpresas.length > 0 ? (
              melhoresEmpresas.map((empresa) => (
                <div
                  key={empresa.id}
                  onClick={() =>
                    AbrirLoja(empresa.id)
                  }
                  className="
                    min-w-[160px]
                    sm:min-w-[200px]
                    bg-white p-3 sm:p-4
                    rounded-xl shadow
                    hover:scale-105
                    transition cursor-pointer
                  "
                >
                  <div className="h-24 bg-gray-200 rounded mb-2 flex items-center justify-center text-gray-400 text-xs">
                    Sem Imagem
                  </div>

                  <h3
                    className="font-semibold truncate text-black"
                    title={empresa.nome_loja}
                  >
                    {empresa.nome_loja}
                  </h3>

                  <p className="text-sm text-gray-500">
                    ⭐{" "}
                    {empresa.nota
                      ? empresa.nota.toFixed(1)
                      : "N/A"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-300">
                Nenhuma empresa encontrada...
              </p>
            )}
          </div>
        </section>

        {/* MAPA */}
        <div className="w-full h-[300px] sm:h-[400px] md:h-[420px] rounded-2xl shadow-inner overflow-hidden">
          <Map
            estabelecimentos={estabelecimentos}
          />
        </div>
      </main>
    </div>
  );
}

export default Home;