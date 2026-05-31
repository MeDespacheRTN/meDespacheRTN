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
      <div className="flex items-center bg-[#140c2a] px-4 py-2 rounded-full w-[40%]">
        <Search size={18} className="opacity-70" />
        <input
          type="text"
          placeholder="Buscar Celular"
          className="bg-transparent outline-none px-3 w-full text-sm"
        />
        <div className="flex items-center gap-1 border-l border-white/10 pl-3">
          <MapPin size={16} />
          <span className="text-sm">BA</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1 cursor-pointer hover:text-purple-400">
          <Grid size={18} />
          <span className="text-sm">Meus Anúncios</span>
        </div>

        <MessageCircle className="cursor-pointer hover:text-purple-400" />
        <Bell className="cursor-pointer hover:text-purple-400" />

        <button className="px-4 py-1 rounded-full border border-white/20 hover:bg-white/10 text-sm">
          Entrar
        </button>

        <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
          + Anunciar
        </button>
      </div>
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

      {/* BANNER */}
      <div className="h-[250px] bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
        <h2 className="text-3xl font-bold">Promoções do Dia 🔥</h2>
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