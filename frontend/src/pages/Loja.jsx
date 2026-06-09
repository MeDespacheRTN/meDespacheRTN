import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../contexts/CartContext"; 

import {
  ShoppingCart,
  Star,
  Search,
  MapPin,
  Bell,
  MessageCircle,
  Grid,
  X,
  Camera,
  Send,
  Package
} from "lucide-react";

import logo from "../assets/midislogoE.png";
import ChatPopup from "../components/chat/Chatpopup";

function Navbar() {
  // 🔥 TRAVA DE SEGURANÇA ADICIONADA AQUI
  const { totalItens } = useContext(CartContext) || { totalItens: 0 };

  return (
    <div className="w-full bg-[#070014] text-white px-6 py-3 flex items-center justify-between border-b border-white/10">
      {/* LOGO */}
      <Link to="/home" className="flex items-center gap-2 hover:opacity-80 transition">
        <img src={logo} alt="Logo" className="h-9 drop-shadow-md" />
      </Link>
      
      <div className="flex items-center gap-6">
        <Search className="cursor-pointer text-gray-400 hover:text-white transition" size={20} />
        
        {/* ÍCONE DO CARRINHO NA NAVBAR DA LOJA */}
        <Link to="/carrinho" className="relative text-gray-400 hover:text-white transition flex items-center">
          <ShoppingCart size={22} />
          {totalItens > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItens}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}

export default function Loja() {
  const { id } = useParams();

  const [loja, setLoja] = useState(null);
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState([]);
  
  // USUÁRIO LOGADO
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // Estados para o Modal e Avaliações
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [novaNota, setNovaNota] = useState(5);
  const [novoComentario, setNovoComentario] = useState("");
  const [novaFoto, setNovaFoto] = useState(null);
  const [enviandoAvaliacao, setEnviandoAvaliacao] = useState(false);

  // 🔥 TRAVA DE SEGURANÇA ADICIONADA AQUI
  const { adicionarAoCarrinho } = useContext(CartContext) || {};

  useEffect(() => {
    // Pega o usuário do localStorage para saber o nome dele na hora de avaliar
    const userStorage = localStorage.getItem("usuario");
    if (userStorage) {
      setUsuarioLogado(JSON.parse(userStorage));
    }
  }, []);

  useEffect(() => {
    async function carregarDados() {
      try {
        // 1. Buscar dados da Loja
        const responseLoja = await fetch(`${import.meta.env.VITE_API_URL}auth/loja/${id}`);
        if (responseLoja.ok) {
          const dataLoja = await responseLoja.json();
          setLoja(dataLoja);
        }

        // 2. Buscar Produtos da Loja via API
        const responseProdutos = await fetch(`${import.meta.env.VITE_API_URL}comerciante/loja/${id}/produtos`);
        if (responseProdutos.ok) {
          const dataProdutos = await responseProdutos.json();
          setProdutos(dataProdutos);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) carregarDados();
  }, [id]);

  // Função para abrir o Modal e buscar avaliações daquele produto via API
  async function abrirProduto(produto) {
    setProdutoSelecionado(produto);
    setNovaNota(5);
    setNovoComentario("");
    setNovaFoto(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}comerciante/produtos/${produto.id}/avaliacoes`);
      if (response.ok) {
        const data = await response.json();
        setAvaliacoes(data);
      }
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    }
  }

  function fecharModal() {
    setProdutoSelecionado(null);
    setAvaliacoes([]);
  }

  // Função para o cliente enviar uma nova avaliação via API
  async function enviarAvaliacao() {
    if (!novoComentario.trim()) {
      alert("Escreva um comentário para avaliar.");
      return;
    }

    setEnviandoAvaliacao(true);
    try {
      const formData = new FormData();
      formData.append("produto_id", produtoSelecionado.id);
      
      // Envia o nome real do usuário, se estiver logado
      const nomeParaSalvar = usuarioLogado?.nome || "Visitante";
      formData.append("nome_usuario", nomeParaSalvar);
      
      formData.append("nota", novaNota);
      formData.append("comentario", novoComentario);
      if (novaFoto) {
        formData.append("foto", novaFoto);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}comerciante/avaliacoes`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const resData = await response.json();
        // Atualiza a lista na tela com a nova avaliação retornada pela API
        setAvaliacoes([resData.avaliacao, ...avaliacoes]); 
        setNovoComentario("");
        setNovaNota(5);
        setNovaFoto(null);
        alert("Avaliação enviada com sucesso!");
      } else {
        throw new Error("Falha ao salvar a avaliação.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar avaliação.");
    } finally {
      setEnviandoAvaliacao(false);
    }
  }

  // Derivando "Mais Vendidos" (Pegando os 4 primeiros produtos como exemplo)
  const maisVendidos = produtos.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#070014] text-white pb-20">
      <Navbar />

      {/* HEADER */}
      <div className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold">{loja?.nome_loja}</h1>
      </div>

      {/* BANNER PROMOCIONAL */}
      <div className="relative overflow-hidden max-w-7xl mx-auto rounded-3xl mx-6 mb-10 shadow-2xl shadow-purple-500/10">
        <div className="h-[320px] bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600 relative">
          <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl"></div>

          <div className="relative h-full px-8 flex items-center justify-between">
            <div>
              <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold">
                🔥 Oferta Especial
              </span>
              <h2 className="text-5xl font-black mt-5 leading-tight">Promoções do Dia</h2>
              <p className="text-lg text-white/80 mt-4 max-w-xl">
                Aproveite descontos exclusivos em produtos selecionados da loja.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* SESSÃO: MAIS VENDIDOS */}
        {maisVendidos.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400" /> Mais Vendidos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {maisVendidos.map((produto) => (
                <div
                  key={`top-${produto.id}`}
                  onClick={() => abrirProduto(produto)}
                  className="bg-[#120124] border border-white/5 rounded-2xl overflow-hidden shadow-lg hover:border-purple-500 hover:-translate-y-1 transition cursor-pointer group"
                >
                  <div className="h-40 bg-black/40 relative overflow-hidden flex items-center justify-center">
                    {produto.imagem_url ? (
                      <img src={produto.imagem_url} alt={produto.nome} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    ) : (
                      <Package className="text-4xl text-white/10" />
                    )}
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-yellow-400 border border-white/10">
                      Top Vendas
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold truncate">{produto.nome}</h3>
                    <div className="flex justify-between items-end mt-3">
                      <span className="text-xl font-black text-green-400">
                        {Number(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SESSÃO: TODOS OS PRODUTOS */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Grid className="text-purple-400" /> Todos os Produtos
          </h2>
          
          {loading ? (
            <p className="text-gray-400">Carregando produtos...</p>
          ) : produtos.length === 0 ? (
            <div className="text-center py-10 bg-white/5 rounded-2xl">
              <p className="text-gray-400">Esta loja ainda não possui produtos cadastrados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {produtos.map((produto) => (
                <div
                  key={produto.id}
                  onClick={() => abrirProduto(produto)}
                  className="bg-[#120124] border border-white/5 rounded-2xl overflow-hidden shadow-lg hover:border-purple-500 hover:-translate-y-1 transition cursor-pointer flex flex-col"
                >
                  <div className="h-48 bg-black/40 relative flex items-center justify-center">
                    {produto.imagem_url ? (
                      <img src={produto.imagem_url} alt={produto.nome} className="w-full h-full object-cover" />
                    ) : (
                      <Package className="text-5xl text-white/10" />
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold line-clamp-1">{produto.nome}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mt-1">{produto.descricao}</p>

                    <div className="flex justify-between items-center mt-auto pt-4">
                      <span className="text-2xl font-black text-white">
                        {Number(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                      <button className="bg-purple-600 px-4 py-2 rounded-xl font-semibold hover:bg-purple-700 transition">
                        Ver
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL DO PRODUTO E AVALIAÇÕES */}
      {produtoSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#120124] w-full max-w-4xl rounded-[30px] border border-white/10 flex flex-col lg:flex-row max-h-[90vh] overflow-hidden shadow-2xl">
            
            {/* Lado Esquerdo: Detalhes do Produto */}
            <div className="lg:w-1/2 bg-black/20 p-6 overflow-y-auto custom-scrollbar border-r border-white/5">
              <button onClick={fecharModal} className="lg:hidden absolute top-4 right-4 bg-white/10 p-2 rounded-full">
                <X size={20} />
              </button>

              <div className="h-64 bg-black/40 rounded-2xl overflow-hidden flex items-center justify-center mb-6">
                {produtoSelecionado.imagem_url ? (
                  <img src={produtoSelecionado.imagem_url} className="w-full h-full object-cover" />
                ) : (
                  <Package className="text-6xl text-white/10" />
                )}
              </div>

              <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {produtoSelecionado.categoria}
              </span>
              <h2 className="text-3xl font-black mt-3">{produtoSelecionado.nome}</h2>
              <p className="text-green-400 text-3xl font-black mt-2">
                {Number(produtoSelecionado.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              
              <div className="mt-6">
                <h4 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-2">Descrição</h4>
                <p className="text-gray-300 leading-relaxed">{produtoSelecionado.descricao}</p>
              </div>

              {/* BOTÃO ADICIONAR AO CARRINHO COM A INTEGRAÇÃO DO CONTEXTO */}
              <button 
                onClick={() => {
                  if (adicionarAoCarrinho) {
                    adicionarAoCarrinho(produtoSelecionado);
                    alert(`${produtoSelecionado.nome} adicionado ao carrinho!`);
                    fecharModal();
                  }
                }}
                className="w-full mt-8 bg-green-500 hover:bg-green-600 text-black font-black text-lg py-4 rounded-xl flex justify-center items-center gap-2 transition"
              >
                <ShoppingCart size={24} /> Adicionar ao Carrinho
              </button>
            </div>

            {/* Lado Direito: Avaliações */}
            <div className="lg:w-1/2 p-6 flex flex-col h-[50vh] lg:h-auto overflow-y-auto custom-scrollbar relative">
              <button onClick={fecharModal} className="hidden lg:flex absolute top-4 right-4 bg-white/5 hover:bg-white/10 p-2 rounded-full transition">
                <X size={20} />
              </button>

              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageCircle className="text-cyan-400" /> Avaliações do Produto
              </h3>

              {/* Formulário para Nova Avaliação */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 mb-6 shrink-0">
                <p className="font-bold text-sm mb-2">Deixe sua avaliação:</p>
                
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((estrela) => (
                    <button key={estrela} onClick={() => setNovaNota(estrela)}>
                      <Star className={estrela <= novaNota ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} size={24} />
                    </button>
                  ))}
                </div>

                <textarea
                  placeholder="O que você achou deste produto?"
                  value={novoComentario}
                  onChange={(e) => setNovoComentario(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-purple-500 resize-none h-20 mb-3"
                />

                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 text-sm text-gray-400 hover:text-white cursor-pointer transition">
                    <Camera size={20} />
                    <span>{novaFoto ? novaFoto.name : "Anexar Foto"}</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setNovaFoto(e.target.files[0])} />
                  </label>

                  <button 
                    onClick={enviarAvaliacao} 
                    disabled={enviandoAvaliacao}
                    className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm disabled:opacity-50 transition"
                  >
                    {enviandoAvaliacao ? "Enviando..." : <><Send size={16} /> Enviar</>}
                  </button>
                </div>
              </div>

              {/* Lista de Avaliações */}
              <div className="flex-1 space-y-4">
                {avaliacoes.length === 0 ? (
                  <p className="text-center text-gray-500 py-6">Seja o primeiro a avaliar este produto!</p>
                ) : (
                  avaliacoes.map((av) => (
                    <div key={av.id} className="bg-black/20 p-4 rounded-2xl border border-white/5">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-sm">{av.nome_usuario || "Visitante"}</span>
                        <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
                          <Star size={12} className="fill-yellow-400" /> {av.nota}.0
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{av.comentario}</p>
                      
                      {av.foto_url && (
                        <img src={av.foto_url} alt="Foto da avaliação" className="w-20 h-20 object-cover rounded-lg border border-white/10" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* CHAT FLUTUANTE */}
      <ChatPopup user={{ id: "cliente1" }} vendedorId={"vendedor1"} />
    </div>
  );
}