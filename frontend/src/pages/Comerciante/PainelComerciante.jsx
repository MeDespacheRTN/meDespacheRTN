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
  BiArrowBack,
  BiCalendar,
  BiCheckCircle,
  BiPackage,
  BiBox,
  BiCommentDetail,
  BiTrash,
  BiStar,
  BiX
} from "react-icons/bi";

import { useNavigate } from "react-router-dom";

function PainelComerciante() {
  const navigate = useNavigate();

  const dataAtual = new Date();
  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(dataAtual.getDate() - 30);

  const [dataInicio, setDataInicio] = useState(trintaDiasAtras.toISOString().split("T")[0]);
  const [dataFim, setDataFim] = useState(dataAtual.toISOString().split("T")[0]);

  const [bannerPreview, setBannerPreview] = useState("");
  const [empresas, setEmpresas] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [produtos, setProdutos] = useState([]); 
  const [faturamentoTotal, setFaturamentoTotal] = useState(0);

  // Estados para o Modal de Avaliações
  const [modalAvaliacoesAberto, setModalAvaliacoesAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      // 1. Carregar Empresas (Ranking)
      const { data: dadosEmpresas } = await supabase
        .from("estabelecimentos")
        .select("id, nome");

      if (dadosEmpresas) {
        const empresasFormatadas = dadosEmpresas.map((item) => ({
          id: item.id,
          nome: item.nome,
          categoria: "Comércio",
          vendas: Math.floor(Math.random() * 400),
          nota: (4 + Math.random()).toFixed(1),
        }));
        setEmpresas(empresasFormatadas);
      }

      // 2. Carregar Produtos da Empresa
      const { data: dadosProdutos } = await supabase
        .from("produtos")
        .select("*")
        .order("id", { ascending: false });

      if (dadosProdutos) {
        setProdutos(dadosProdutos);
      }

      // 3. Carregar Pedidos no intervalo de datas
      const { data: dadosPedidos } = await supabase
        .from("pedidos")
        .select(`id, status, criado_em, usuario_id`)
        .gte("criado_em", `${dataInicio}T00:00:00.000Z`)
        .lte("criado_em", `${dataFim}T23:59:59.999Z`)
        .order("criado_em", { ascending: false });

      if (dadosPedidos) {
        setPedidos(dadosPedidos);
      }

      // 4. Calcular Faturamento
      const { data: dadosPagamentos } = await supabase
        .from("pagamentos")
        .select("valor, pedidos!inner(criado_em)")
        .gte("pedidos.criado_em", `${dataInicio}T00:00:00.000Z`)
        .lte("pedidos.criado_em", `${dataFim}T23:59:59.999Z`)
        .eq("status", "aprovado"); 

      if (dadosPagamentos) {
        const total = dadosPagamentos.reduce((acc, curr) => acc + Number(curr.valor), 0);
        setFaturamentoTotal(total);
      }
    }

    carregarDados();
  }, [dataInicio, dataFim]);

  async function concluirPedido(pedidoId) {
    const { error } = await supabase
      .from("pedidos")
      .update({ status: "enviado" }) 
      .eq("id", pedidoId);

    if (!error) {
      setPedidos((prevPedidos) =>
        prevPedidos.map((p) =>
          p.id === pedidoId ? { ...p, status: "enviado" } : p
        )
      );
    } else {
      alert("Erro ao atualizar o pedido.");
    }
  }

  // --- FUNÇÕES DE AVALIAÇÃO ---
  async function abrirModalAvaliacoes(produto) {
    setProdutoSelecionado(produto);
    setModalAvaliacoesAberto(true);
    
    // Busca as avaliações no banco. Adapte os nomes das colunas conforme sua tabela "avaliacoes"
    const { data, error } = await supabase
      .from("avaliacoes")
      .select("*")
      .eq("produto_id", produto.id)
      .order("criado_em", { ascending: false });

    if (data) {
      setAvaliacoes(data);
    } else if (error) {
      console.error("Erro ao buscar avaliações:", error);
    }
  }

  function fecharModalAvaliacoes() {
    setModalAvaliacoesAberto(false);
    setProdutoSelecionado(null);
    setAvaliacoes([]);
  }

  async function apagarAvaliacao(id) {
    const confirmar = window.confirm("Tem certeza que deseja apagar esta avaliação do cliente?");
    if (!confirmar) return;

    const { error } = await supabase
      .from("avaliacoes")
      .delete()
      .eq("id", id);

    if (!error) {
      // Remove da tela imediatamente
      setAvaliacoes((prev) => prev.filter((av) => av.id !== id));
    } else {
      alert("Erro ao apagar a avaliação.");
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-[#070014] text-white p-6 relative">
      {/* BOTÃO VOLTAR */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
        >
          <BiArrowBack className="text-xl" />
          <span>Voltar</span>
        </button>
      </div>

      {/* HEADER E FILTRO DE DATA */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-5xl font-black flex items-center gap-3">
            <BiStore className="text-purple-500" />
            Painel do Comerciante
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#120124] p-3 rounded-2xl border border-white/10 shadow-lg">
          <div className="flex items-center gap-2">
            <BiCalendar className="text-purple-400 text-2xl" />
            <div className="flex flex-col">
              <label className="text-xs text-gray-400">De:</label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="bg-black/20 text-white text-sm outline-none border border-white/10 rounded px-2 py-1 focus:border-purple-500 transition"
              />
            </div>
          </div>
          <span className="text-white/30 hidden sm:block">-</span>
          <div className="flex flex-col">
            <label className="text-xs text-gray-400">Até:</label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="bg-black/20 text-white text-sm outline-none border border-white/10 rounded px-2 py-1 focus:border-purple-500 transition"
            />
          </div>
        </div>

        <button
          onClick={() => navigate("/cad-produto")}
          className="bg-purple-600 hover:bg-purple-700 transition px-6 py-4 rounded-3xl flex items-center gap-3 font-semibold text-lg shadow-lg shadow-purple-500/20 whitespace-nowrap"
        >
          <BiPlus className="text-2xl" />
          Novo Produto
        </button>
      </div>

      {/* DASHBOARD */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div className="bg-gradient-to-br from-purple-600 to-purple-900 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <BiDollar className="text-5xl" />
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Período</span>
          </div>
          <p className="text-white/70 text-sm">Faturamento Real</p>
          <h2 className="text-5xl font-black mt-2">
            R$ {faturamentoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-cyan-500 to-cyan-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <BiTrendingUp className="text-5xl" />
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">+12%</span>
          </div>
          <p className="text-white/70 text-sm">Vendas</p>
          <h2 className="text-5xl font-black mt-2">{pedidos.length}</h2>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-pink-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <BiUser className="text-5xl" />
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">+31%</span>
          </div>
          <p className="text-white/70 text-sm">Clientes</p>
          <h2 className="text-5xl font-black mt-2">1.2K</h2>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <BiBarChart className="text-5xl" />
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">TOP</span>
          </div>
          <p className="text-white/70 text-sm">Ranking</p>
          <h2 className="text-5xl font-black mt-2">#1</h2>
        </div>
      </div>

      {/* LISTA DE PEDIDOS */}
      <div className="bg-[#120124] rounded-3xl p-6 border border-white/10 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <BiPackage className="text-4xl text-cyan-400" />
          <div>
            <h2 className="text-3xl font-bold">Pedidos Recentes</h2>
            <p className="text-gray-400 text-sm mt-1">Gerencie e envie os pedidos do período selecionado.</p>
          </div>
        </div>

        {pedidos.length === 0 ? (
          <div className="text-center py-10 bg-black/20 rounded-2xl border border-white/5">
            <p className="text-gray-400">Nenhum pedido encontrado neste período.</p>
          </div>
        ) : (
          <div className="grid gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {pedidos.map((pedido) => (
              <div
                key={pedido.id}
                className="bg-white/5 hover:bg-white/10 transition border border-white/5 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-bold text-lg font-mono">
                    ID: {pedido.id.substring(0, 8).toUpperCase()}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Data: {new Date(pedido.criado_em).toLocaleDateString("pt-BR")} às {new Date(pedido.criado_em).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${
                      pedido.status === "enviado" || pedido.status === "concluido"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {pedido.status || "Pendente"}
                  </span>

                  {(pedido.status !== "enviado" && pedido.status !== "concluido") && (
                    <button
                      onClick={() => concluirPedido(pedido.id)}
                      className="bg-cyan-600 hover:bg-cyan-700 transition px-5 py-2 rounded-xl flex items-center gap-2 font-semibold"
                    >
                      <BiCheckCircle className="text-xl" />
                      Marcar Enviado
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MEUS PRODUTOS */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6 px-2">
          <BiBox className="text-4xl text-purple-400" />
          <div>
            <h2 className="text-3xl font-bold">Meus Produtos</h2>
            <p className="text-gray-400 text-sm mt-1">Gerencie seu inventário, estoque e preços.</p>
          </div>
        </div>

        {produtos.length === 0 ? (
          <div className="text-center py-16 bg-[#120124] rounded-3xl border border-white/10">
            <BiBox className="text-7xl text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white/70">Nenhum produto cadastrado</h3>
            <p className="text-gray-500 mt-2 mb-6">Comece adicionando produtos para vender.</p>
            <button
              onClick={() => navigate("/cad-produto")}
              className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
            >
              <BiPlus className="text-xl" /> Criar Primeiro Produto
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {produtos.map((produto) => (
              <div 
                key={produto.id} 
                className="bg-[#120124] rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500 hover:-translate-y-1 transition duration-300 flex flex-col shadow-lg"
              >
                {/* Imagem do Produto */}
                <div className="h-48 bg-black/40 relative flex items-center justify-center overflow-hidden">
                  {produto.imagem_url ? (
                    <img src={produto.imagem_url} alt={produto.nome} className="w-full h-full object-cover" />
                  ) : (
                    <BiPackage className="text-6xl text-white/10" />
                  )}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold border border-white/10 uppercase tracking-wider text-purple-300">
                    {produto.categoria || "Sem Categoria"}
                  </div>
                </div>

                {/* Detalhes do Produto */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold mb-1 leading-tight">{produto.nome}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {produto.descricao || "Nenhuma descrição informada."}
                  </p>

                  <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/10">
                    <div>
                      <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Preço</p>
                      <p className="text-2xl font-black text-green-400">
                        {Number(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Estoque</p>
                      <div className={`text-lg font-bold px-3 py-1 rounded-lg inline-block ${
                        produto.estoque > 10 ? "bg-green-500/20 text-green-400" : 
                        produto.estoque > 0 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"
                      }`}>
                        {produto.estoque} un.
                      </div>
                    </div>
                  </div>

                  {/* Botões de Ação do Produto */}
                  <div className="flex gap-3 mt-6">
                    <button 
                      onClick={() => navigate(`/editar-produto/${produto.id}`)}
                      className="flex-1 bg-white/5 hover:bg-purple-600 transition-colors py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm"
                    >
                      <BiEdit className="text-lg" /> Editar
                    </button>

                    <button 
                      onClick={() => abrirModalAvaliacoes(produto)}
                      className="flex-1 bg-cyan-500/10 hover:bg-cyan-600 text-cyan-400 hover:text-white transition-colors py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm"
                    >
                      <BiCommentDetail className="text-lg" /> Avaliações
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BANNER + RANKING */}
      <div className="grid xl:grid-cols-[420px_1fr] gap-6 mt-8">
        {/* BANNER */}
        <div className="bg-[#120124] rounded-3xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <BiImageAdd className="text-4xl text-purple-400" />
            <div>
              <h2 className="text-3xl font-bold">Banner</h2>
              <p className="text-gray-400 text-sm mt-1">Destaque promoções e campanhas.</p>
            </div>
          </div>
          <label className="h-[300px] rounded-3xl border-2 border-dashed border-purple-500/30 hover:border-purple-500 transition cursor-pointer overflow-hidden flex items-center justify-center bg-black/20">
            {bannerPreview ? (
              <img src={bannerPreview} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <BiImageAdd className="text-7xl text-purple-500 mx-auto mb-4" />
                <p className="text-xl font-semibold">Adicionar Banner</p>
                <span className="text-gray-400 text-sm">Clique para enviar imagem</span>
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
              <h2 className="text-3xl font-bold">Ranking de Empresas</h2>
              <p className="text-gray-400 text-sm mt-1">Empresas mais acessadas.</p>
            </div>
          </div>
          <div className="space-y-5">
            {empresas.map((empresa, index) => (
              <div key={empresa.id} className="bg-white/5 hover:bg-white/10 transition rounded-3xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center text-2xl font-black">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{empresa.nome}</h2>
                    <p className="text-gray-400 text-sm mt-1">{empresa.categoria}</p>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="text-2xl font-black text-green-400">{empresa.vendas}</h3>
                  <p className="text-yellow-400 font-semibold mt-1">⭐ {empresa.nota}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL DE AVALIAÇÕES */}
      {modalAvaliacoesAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#120124] w-full max-w-2xl rounded-[30px] border border-white/10 flex flex-col max-h-[85vh] shadow-2xl">
            
            {/* Header do Modal */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-purple-600/20 p-3 rounded-xl text-purple-400">
                  <BiCommentDetail className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Avaliações</h2>
                  <p className="text-gray-400 text-sm mt-1">Produto: {produtoSelecionado?.nome}</p>
                </div>
              </div>
              <button 
                onClick={fecharModalAvaliacoes} 
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition"
              >
                <BiX className="text-2xl" />
              </button>
            </div>

            {/* Corpo do Modal */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              {avaliacoes.length === 0 ? (
                <div className="text-center py-16">
                  <BiStar className="text-6xl text-white/10 mx-auto mb-4" />
                  <p className="text-xl font-bold text-white/70">Nenhuma avaliação ainda</p>
                  <p className="text-gray-500 mt-2">Os clientes ainda não deixaram comentários para este produto.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {avaliacoes.map((avaliacao) => (
                    <div key={avaliacao.id} className="bg-white/5 p-5 rounded-2xl flex gap-4 border border-white/5 relative group">
                      
                      {/* Avatar do Usuário */}
                      <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-xl font-bold shadow-lg shrink-0">
                        {avaliacao.nome_usuario ? avaliacao.nome_usuario.charAt(0).toUpperCase() : "U"}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-lg">{avaliacao.nome_usuario || "Usuário Anônimo"}</h4>
                          
                          {/* Botão de Apagar */}
                          <button 
                            onClick={() => apagarAvaliacao(avaliacao.id)} 
                            title="Apagar Avaliação"
                            className="text-red-400 hover:text-white bg-red-400/10 hover:bg-red-500 transition p-2 rounded-lg"
                          >
                            <BiTrash />
                          </button>
                        </div>
                        
                        <div className="flex text-yellow-400 text-sm mb-3">
                           {/* Exibe a nota (Assumindo que seja de 1 a 5) */}
                           <span className="bg-yellow-500/20 px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                             <BiStar /> {avaliacao.nota || 5}.0
                           </span>
                        </div>
                        
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {avaliacao.comentario || "Nenhum comentário escrito."}
                        </p>
                        
                        {/* Imagem da Avaliação */}
                        {avaliacao.foto_url && (
                          <div className="mt-4">
                            <img 
                              src={avaliacao.foto_url} 
                              alt="Foto enviada pelo cliente" 
                              className="w-32 h-32 object-cover rounded-xl border border-white/10 cursor-pointer hover:opacity-80 transition" 
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PainelComerciante;