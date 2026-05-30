import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import {
  BiSearch,
  BiMap,
  BiStar,
  BiStore,
} from "react-icons/bi";

import "leaflet/dist/leaflet.css";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function Dashboard() {
  const navigate = useNavigate();
  const [comercios, setComercios] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    async function carregarComercios() {
      const { data } = await supabase
        .from("estabelecimentos")
        .select("*");

      setComercios(data || []);
    }

    carregarComercios();
  }, []);

  const comerciosSalvador = [
  {
    id: "s1",
    nome: "Acarajé da Dinha",
    categoria: "Comida Baiana",
    descricao: "Acarajé tradicional de Salvador.",
    latitude: -13.009,
    longitude: -38.532,
    imagem_url:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
  },
  {
    id: "s2",
    nome: "Bahia Burgers",
    categoria: "Hamburgueria",
    descricao: "Hambúrguer artesanal.",
    latitude: -12.979,
    longitude: -38.455,
    imagem_url:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: "s3",
    nome: "Mercado Salvador",
    categoria: "Mercado",
    descricao: "Produtos e conveniência.",
    latitude: -12.965,
    longitude: -38.495,
    imagem_url:
      "https://images.unsplash.com/photo-1542838132-92c53300491e",
  },
  {
    id: "s4",
    nome: "Pizzaria Pelourinho",
    categoria: "Pizzaria",
    descricao: "Pizzas artesanais.",
    latitude: -12.971,
    longitude: -38.508,
    imagem_url:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: "s5",
    nome: "Café Barra",
    categoria: "Cafeteria",
    descricao: "Café especial próximo ao Farol.",
    latitude: -13.0098,
    longitude: -38.5325,
    imagem_url:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  },
];

  const todosComercios = [
  ...comercios,
  ...comerciosSalvador,
];

const filtrados = todosComercios.filter((item) =>
  item.nome?.toLowerCase().includes(busca.toLowerCase())
);

  

  return (
    <div className="bg-[#070014] min-h-screen text-white">

      {/* HEADER */}
      <div className="p-6 border-b border-white/10">

        <div className="flex items-center justify-between">

         <div className="flex items-center gap-4">

  <button
    onClick={() => navigate("/home")}
    className="
      bg-white/10
      hover:bg-white/20
      transition
      p-3
      rounded-xl
    "
  >
    <BiArrowBack className="text-xl" />
  </button>

  <div>
    <h1 className="text-3xl font-bold">
      Painel do Cliente
    </h1>

    <p className="text-gray-400">
      Explore comércios próximos
    </p>
  </div>

</div>

          <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl w-[350px]">
            <BiSearch className="text-xl" />

            <input
              placeholder="Buscar comércio..."
              className="bg-transparent outline-none w-full"
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="grid lg:grid-cols-[350px_1fr]">

        {/* SIDEBAR */}
        <div className="border-r border-white/10 p-5 h-[90vh] overflow-y-auto">

          {/* CARDS */}
          <div className="grid grid-cols-2 gap-3 mb-5">

            <div className="bg-white/10 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <BiStore />
                <span className="text-sm text-gray-300">
                  Comércios
                </span>
              </div>

              <h2 className="text-2xl font-bold">
                {comercios.length}
              </h2>
            </div>

            
          </div>

          {/* LISTA */}
          <div className="space-y-4">

            {filtrados.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 rounded-2xl overflow-hidden hover:bg-white/20 transition"
              >

                <img
                  src={item.imagem_url}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">

                  <div className="flex items-center justify-between">

                    <h2 className="font-bold text-lg">
                      {item.nome}
                    </h2>

                    <div className="bg-purple-600 px-2 py-1 rounded-lg text-sm">
                      ⭐ 4.8
                    </div>

                  </div>

                  <p className="text-gray-400 text-sm mt-1">
                    {item.categoria}
                  </p>

                  <p className="text-sm mt-3 line-clamp-2">
                    {item.descricao}
                  </p>

                  <button className="mt-4 bg-purple-600 hover:bg-purple-700 transition w-full py-2 rounded-xl">
                    Ver no mapa
                  </button>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* MAPA */}
        <div className="h-[90vh]">

          <MapContainer
            center={[-12.9718, -38.5011]}
            zoom={13}
            className="h-full w-full"
          >

            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {filtrados.map((item) => (
              <Marker
                key={item.id}
                position={[item.latitude, item.longitude]}
                icon={icon}
              >

                <Popup>

                  <div className="w-[220px]">

                    <img
                      src={item.imagem_url}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />

                    <h2 className="font-bold text-lg">
                      {item.nome}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {item.categoria}
                    </p>

                    <p className="text-sm mt-2">
                      {item.descricao}
                    </p>

                    <div className="flex items-center justify-between mt-3">

                      <span className="text-yellow-500 font-bold">
                        ⭐ 4.8
                      </span>

                      <button className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm">
                        Ver mais
                      </button>

                    </div>

                  </div>

                </Popup>
              </Marker>
            ))}

          </MapContainer>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;