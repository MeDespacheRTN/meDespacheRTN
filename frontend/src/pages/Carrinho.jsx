import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { 
  FaTrash, 
  FaArrowLeft, 
  FaMinus, 
  FaPlus, 
  FaShieldAlt, 
  FaCheckCircle, 
  FaStar,
  FaTruck,
  FaShoppingCart
} from "react-icons/fa";

export default function Carrinho() {
  const [loading, setLoading] = useState(false);
  
  const { 
    carrinho, 
    adicionarAoCarrinho, 
    diminuirQuantidade, 
    removerDoCarrinho, 
    valorTotal, 
    limparCarrinho 
  } = useContext(CartContext) || {};

  const finalizarPedido = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}payment/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 🔥 MODIFICAÇÃO AQUI: Enviando os itens do carrinho para o backend
        body: JSON.stringify({ 
          items: carrinho 
        }),
      });

      const data = await response.json();
      
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Erro ao criar checkout: " + (data.error || "Tente novamente"));
      }
    } catch (error) {
      console.error("Erro na finalização:", error);
      alert("Erro de conexão com o servidor de pagamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070014] text-white pt-28 pb-20 px-6 relative overflow-hidden">
      
      {/* EFEITOS DE LUZ NO FUNDO */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-700/20 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="flex items-center gap-4 mb-8">
          <Link to="/home" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition border border-white/5 backdrop-blur-md">
            <FaArrowLeft size={18} className="text-purple-400" />
          </Link>
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Seu Carrinho
            </h1>
            <p className="text-gray-400 text-sm mt-1">Revise seus itens antes de finalizar.</p>
          </div>
        </div>

        {(!carrinho || carrinho.length === 0) ? (
          <div className="bg-[#120124]/80 backdrop-blur-xl border border-white/10 rounded-[30px] p-16 text-center shadow-2xl flex flex-col items-center justify-center">
            <div className="w-32 h-32 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
              <FaShoppingCart size={50} className="text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-400 mb-8 max-w-md">Parece que você ainda não adicionou nenhum item. Que tal explorar nossas lojas e encontrar algo delicioso?</p>
            <Link to="/home" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-purple-500/20">
              Explorar Produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LADO ESQUERDO: LISTA DE PRODUTOS */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="text-green-400 font-bold">Lojas Verificadas</h4>
                  <p className="text-gray-300 text-sm">Todos os itens no seu carrinho são fornecidos por comerciantes com selo de verificação de qualidade MeDespache.</p>
                </div>
              </div>

              {carrinho.map((item) => (
                <div key={item.id} className="bg-[#120124]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-6 shadow-xl hover:border-purple-500/30 transition-colors">
                  
                  {/* IMAGEM DO PRODUTO */}
                  <div className="h-28 w-28 sm:h-24 sm:w-24 bg-black/50 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 relative">
                    {item.imagem_url ? (
                      <img src={item.imagem_url} alt={item.nome} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">📦</div>
                    )}
                    <div className="absolute top-0 left-0 w-full h-full shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"></div>
                  </div>
                  
                  {/* INFORMAÇÕES DO PRODUTO */}
                  <div className="flex-1 text-center sm:text-left w-full">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                      <h3 className="font-bold text-xl line-clamp-1">{item.nome}</h3>
                      <span className="bg-purple-500/20 text-purple-300 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                        {item.categoria || "Produto"}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-1 text-yellow-400 text-xs mb-3">
                      <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar className="text-yellow-400/50" />
                      <span className="text-gray-400 ml-1">(4.8) - Muito bom</span>
                    </div>

                    <p className="text-green-400 font-black text-lg">
                      {Number(item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>

                  {/* CONTROLES E LIXEIRA */}
                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    <div className="flex items-center bg-black/40 border border-white/10 rounded-xl overflow-hidden">
                      <button 
                        onClick={() => diminuirQuantidade(item.id)}
                        className="p-3 text-gray-400 hover:text-white hover:bg-white/5 transition"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantidade}</span>
                      <button 
                        onClick={() => adicionarAoCarrinho(item)}
                        className="p-3 text-gray-400 hover:text-white hover:bg-white/5 transition"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>

                    <button 
                      onClick={() => removerDoCarrinho(item.id)}
                      className="text-red-500 hover:text-white hover:bg-red-500 p-3 bg-red-500/10 rounded-xl transition"
                      title="Remover produto"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={limparCarrinho}
                className="mt-2 text-sm text-gray-400 hover:text-red-400 self-start transition font-medium border-b border-transparent hover:border-red-400"
              >
                Esvaziar carrinho
              </button>
            </div>

            {/* LADO DIREITO: RESUMO DO PEDIDO */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#120124]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/20 blur-3xl rounded-full"></div>

                <h2 className="text-2xl font-black mb-6 flex items-center gap-2">Resumo</h2>
                
                <div className="space-y-4 text-gray-300">
                  <div className="flex justify-between items-center">
                    <span>Subtotal de produtos</span>
                    <span className="font-medium text-white">{valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Taxa de entrega</span>
                    <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-md font-bold text-sm">GRÁTIS</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/10">
                  <span className="text-lg font-bold text-white">Total a Pagar</span>
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                    {valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>

                <button 
                  disabled={loading}
                  onClick={finalizarPedido}
                  className="w-full mt-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-black text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:-translate-y-1 transition-all disabled:opacity-50"
                >
                  {loading ? "Processando..." : "Finalizar Pedido"}
                </button>
              </div>

              {/* SELOS DE CONFIANÇA */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5 grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <FaShieldAlt className="text-blue-400" size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-gray-200">Compra Segura</h5>
                    <p className="text-xs text-gray-400">Seus dados protegidos.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <FaTruck className="text-purple-400" size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-gray-200">Entrega Garantida</h5>
                    <p className="text-xs text-gray-400">Acompanhe em tempo real.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}