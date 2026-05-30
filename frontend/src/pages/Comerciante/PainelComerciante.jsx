import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";

import {
  BiStore,
  BiImageAdd,
  BiDollar,
  BiTrendingUp,
  BiUser,
  BiPlus,
  BiEdit,
  BiBarChart,
  BiMedal,
} from "react-icons/bi";

import { useNavigate } from "react-router-dom";

function PainelComerciante() {
  const navigate = useNavigate();

  const [bannerPreview, setBannerPreview] = useState("");
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    async function carregarEmpresas() {
      const { data } = await supabase
        .from("estabelecimentos")
        .select("id, nome");

      if (data) {
        const empresasFormatadas = data.map((item) => ({
          id: item.id,
          nome: item.nome,
          categoria: "Comércio",
          vendas: Math.floor(Math.random() * 400),
          nota: (4 + Math.random()).toFixed(1),
        }));

        setEmpresas(empresasFormatadas);
      }
    }

    carregarEmpresas();
  }, []);

  return (
    <div className="min-h-screen bg-[#070014] text-white p-6">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-5xl font-black flex items-center gap-3">
            <BiStore className="text-purple-500" />
            Painel do Comerciante
          </h1>

  
        </div>

        <button
          onClick={() => navigate("/cad-estabelecimento")}
          className="bg-purple-600 hover:bg-purple-700 transition px-6 py-4 rounded-3xl flex items-center gap-3 font-semibold text-lg shadow-lg shadow-purple-500/20"
        >
          <BiPlus className="text-2xl" />
          Novo Comércio
        </button>
      </div>

      {/* DASHBOARD */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <div className="bg-gradient-to-br from-purple-600 to-purple-900 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <BiDollar className="text-5xl" />

            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              +18%
            </span>
          </div>

          <p className="text-white/70 text-sm">
            Faturamento
          </p>

          <h2 className="text-5xl font-black mt-2">
            R$ 18K
          </h2>
        </div>

        <div className="bg-gradient-to-br from-cyan-500 to-cyan-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <BiTrendingUp className="text-5xl" />

            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              +12%
            </span>
          </div>

          <p className="text-white/70 text-sm">
            Vendas
          </p>

          <h2 className="text-5xl font-black mt-2">
            284
          </h2>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-pink-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <BiUser className="text-5xl" />

            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              +31%
            </span>
          </div>

          <p className="text-white/70 text-sm">
            Clientes
          </p>

          <h2 className="text-5xl font-black mt-2">
            1.2K
          </h2>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <BiBarChart className="text-5xl" />

            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              TOP
            </span>
          </div>

          <p className="text-white/70 text-sm">
            Ranking
          </p>

          <h2 className="text-5xl font-black mt-2">
            #1
          </h2>
        </div>
      </div>

      {/* BANNER + RANKING */}
      <div className="grid xl:grid-cols-[420px_1fr] gap-6 mb-8">

        {/* BANNER */}
        <div className="bg-[#120124] rounded-3xl p-6 border border-white/10">

          <div className="flex items-center gap-3 mb-6">
            <BiImageAdd className="text-4xl text-purple-400" />

            <div>
              <h2 className="text-3xl font-bold">
                Banner
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                Destaque promoções e campanhas.
              </p>
            </div>
          </div>

          <label className="h-[300px] rounded-3xl border-2 border-dashed border-purple-500/30 hover:border-purple-500 transition cursor-pointer overflow-hidden flex items-center justify-center bg-black/20">

            {bannerPreview ? (
              <img
                src={bannerPreview}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <BiImageAdd className="text-7xl text-purple-500 mx-auto mb-4" />

                <p className="text-xl font-semibold">
                  Adicionar Banner
                </p>

                <span className="text-gray-400 text-sm">
                  Clique para enviar imagem
                </span>
              </div>
            )}

            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  setBannerPreview(URL.createObjectURL(file));
                }
              }}
            />
          </label>
        </div>

        {/* RANKING */}
        <div className="bg-[#120124] rounded-3xl p-6 border border-white/10">

          <div className="flex items-center gap-3 mb-8">
            <BiMedal className="text-4xl text-yellow-400" />

            <div>
              <h2 className="text-3xl font-bold">
                Ranking de Empresas
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                Empresas mais acessadas.
              </p>
            </div>
          </div>

          <div className="space-y-5">

            {empresas.map((empresa, index) => (
              <div
                key={empresa.id}
                className="bg-white/5 hover:bg-white/10 transition rounded-3xl p-5 flex items-center justify-between"
              >

                <div className="flex items-center gap-5">

                  <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center text-2xl font-black">
                    {index + 1}
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">
                      {empresa.nome}
                    </h2>

                    <p className="text-gray-400 text-sm mt-1">
                      {empresa.categoria}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <h3 className="text-2xl font-black text-green-400">
                    {empresa.vendas}
                  </h3>

                  <p className="text-yellow-400 font-semibold mt-1">
                    ⭐ {empresa.nota}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LISTA VISUAL */}
      <div>

        

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {empresas.map((empresa) => (
            <div
              key={empresa.id}
              className="bg-[#120124] rounded-[30px] overflow-hidden border border-white/10 hover:border-purple-500 hover:-translate-y-1 transition duration-300"
            >

              <div className="h-44 bg-gradient-to-br from-purple-500 to-indigo-700 relative">

                <div className="absolute inset-0 bg-black/20"></div>

                <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-semibold">
                  {empresa.categoria}
                </div>

                <div className="absolute bottom-5 left-5">
                  <h2 className="text-3xl font-black">
                    {empresa.nome}
                  </h2>
                </div>
              </div>

              <div className="p-6">

                <div className="flex items-center justify-between mb-5">

                  <div>
                    <p className="text-gray-400 text-sm">
                      Vendas
                    </p>

                    <h3 className="text-3xl font-black mt-1">
                      {empresa.vendas}
                    </h3>
                  </div>

                  <div className="bg-yellow-500/20 text-yellow-400 px-4 py-3 rounded-2xl font-bold">
                    ⭐ {empresa.nota}
                  </div>
                </div>

                <div className="flex gap-3">

                  <button className="flex-1 bg-cyan-500 hover:bg-cyan-600 transition py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold">
                    <BiEdit />
                    Editar
                  </button>

                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 transition py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold">
                    Ver Painel
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PainelComerciante;