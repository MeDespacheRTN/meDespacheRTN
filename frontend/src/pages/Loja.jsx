import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {ShoppingCart,Star,Search,MapPin,Bell,MessageCircle,Grid,} from "lucide-react";
import logo from "../assets/midislogoE.png";
import { Link } from "react-router-dom";


import ChatPopup from "../components/chat/Chatpopup";

function Navbar() {
  return (
    <div className="w-full bg-gray text-white px-6 py-3 flex items-center justify-between border-b border-white/10">
      
      {/* LOGO */}
      <Link to="/home" className="flex items-center gap-2 hover:opacity-80 transition">
        <img src={logo} alt="Logo" className="h-9 drop-shadow-md" />
      </Link>

      {/* SEARCH */}
      
      </div>
  );
}

export default function Loja() {

  const { id } = useParams();

  const [loja, setLoja] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarLoja = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}auth/loja/${id}`);
        const data = await response.json();

        if (response.ok) {
          setLoja(data);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Erro ao buscar loja:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) buscarLoja();
  }, [id]);
    
  const [produtos] = useState([
    {
      id: 1,
      nome: "Hambúrguer Artesanal",
      preco: 25.9,
      avaliacao: 4.8,
      imagem: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      nome: "Pizza Calabresa",
      preco: 39.9,
      avaliacao: 4.6,
      imagem: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      nome: "Açaí 500ml",
      preco: 18.5,
      avaliacao: 4.9,
      imagem: "https://via.placeholder.com/300",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#070014] text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* HEADER */}
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Minha Loja</h1>
        <ShoppingCart className="cursor-pointer" />
      </div>

      {/* BANNER PROMOCIONAL */}
<div className="relative overflow-hidden">

  {/* Fundo */}
  <div className="h-[320px] bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600 relative">

    {/* Efeitos */}
    <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>

    <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

    <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl"></div>

    {/* Conteúdo */}
    <div className="relative h-full max-w-7xl mx-auto px-8 flex items-center justify-between">

      <div>

        <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold">
          🔥 Oferta Especial
        </span>

        <h2 className="text-5xl font-black mt-5 leading-tight">
          Promoções do Dia
        </h2>

        <p className="text-lg text-white/80 mt-4 max-w-xl">
          Aproveite descontos exclusivos em produtos selecionados da loja.
          Ofertas limitadas por tempo e estoque.
        </p>

        <button className="mt-6 bg-white text-purple-700 font-bold px-6 py-3 rounded-2xl hover:scale-105 transition">
          Ver Ofertas
        </button>

      </div>

      {/* Card destaque */}
      <div className="hidden lg:block">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl w-[320px]">

          <h3 className="text-2xl font-bold mb-4">
            Destaques
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Produtos em promoção</span>
              <span className="font-bold text-green-400">+32</span>
            </div>

            <div className="flex justify-between">
              <span>Descontos de até</span>
              <span className="font-bold text-yellow-400">50%</span>
            </div>

            <div className="flex justify-between">
              <span>Avaliação média</span>
              <span className="font-bold">⭐ 4.8</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  </div>

</div>

      {/* PRODUTOS */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-[#0f0a1f] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition"
          >
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold">{produto.nome}</h3>

              <div className="flex items-center gap-1 text-yellow-400 mt-1">
                <Star size={16} />
                <span>{produto.avaliacao}</span>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold">
                  R$ {produto.preco.toFixed(2)}
                </span>

                <button className="bg-purple-600 px-4 py-2 rounded-xl hover:bg-purple-700">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 💬 CHAT FLUTUANTE */}
      <ChatPopup
        user={{ id: "cliente1" }}       // ⚠️ temporário
        vendedorId={"vendedor1"}       // ⚠️ temporário
      />

    </div>
  );
}