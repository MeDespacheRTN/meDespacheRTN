import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import { useNavigate, useParams } from "react-router-dom";

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
  BiX,
  BiCamera,
  BiSave
} from "react-icons/bi";

function PainelComerciante() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  // 🔥 ESTADOS NOVOS PARA O MODAL DE EDIÇÃO DE PRODUTO
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [editNome, setEditNome] = useState("");
  const [editDescricao, setEditDescricao] = useState("");
  const [editCategoria, setEditCategoria] = useState("");
  const [editPreco, setEditPreco] = useState("");
  const [editEstoque, setEditEstoque] = useState("");
  const [editImagem, setEditImagem] = useState(null);
  const [editImagemPreview, setEditImagemPreview] = useState("");
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      if (!id || id === "undefined") {
        console.warn("ID da loja não encontrado na URL.");
        return;
      }

      try {
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

        // 2. Carregar Produtos APENAS desta Empresa
        const { data: dadosProdutos, error: erroProdutos } = await supabase
          .from("produtos")
          .select("*")
          .eq("empresa_id", id)
          .order("id", { ascending: false });

        if (erroProdutos) throw erroProdutos;
        if (dadosProdutos) setProdutos(dadosProdutos);

        // 3. Carregar Pedidos SEM buscar colunas inexistentes e FILTRADOS pela loja
        const { data: dadosPedidos, error: errorPedidos } = await supabase
          .from("pedidos")
          .select("id, status, criado_em") 
          .eq("empresa_id", id) 
          .gte("criado_em", `${dataInicio}T00:00:00.000Z`)
          .lte("criado_em", `${dataFim}T23:59:59.999Z`)
          .order("criado_em", { ascending: false });
          
        if (errorPedidos) throw errorPedidos;
        if (dadosPedidos) setPedidos(dadosPedidos);

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

      } catch (error) {
        console.error("Erro ao buscar os dados do banco:", error.message);
      }
    }

    carregarDados();
  }, [dataInicio, dataFim, id]);

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
    
    const { data, error } = await supabase
      .from("avaliacoes_produtos")
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
      .from("avaliacoes_produtos")
      .delete()
      .eq("id", id);

    if (!error) {
      setAvaliacoes((prev) => prev.filter((av) => av.id !== id));
    } else {
      alert("Erro ao apagar a avaliação.");
      console.error(error);
    }
  }

  // 🔥 LÓGICA COMPLETA DE EDIÇÃO DE PRODUTO INDEPENDENTE
  function abrirModalEditar(produto) {
    setProdutoSelecionado(produto);
    setEditNome(produto.nome || "");
    setEditDescricao(produto.descricao || "");
    setEditCategoria(produto.categoria || "");
    setEditPreco(produto.preco ? String(produto.preco) : "");
    setEditEstoque(produto.estoque ? String(produto.estoque) : "");
    setEditImagemPreview(produto.imagem_url || "");
    setEditImagem(null);
    setModalEditarAberto(true);
  }

  function fecharModalEditar() {
    setModalEditarAberto(false);
    setProdutoSelecionado(null);
    setEditImagemPreview("");
    setEditImagem(null);
  }

  async function handleSalvarEdicaoProduto() {
    if (!editNome || !editPreco) {
      alert("Nome e preço são obrigatórios.");
      return;
    }

    setSalvandoEdicao(true);
    try {
      let finalImagemUrl = produtoSelecionado.imagem_url;

      // Se o usuário selecionou uma nova foto
      if (editImagem) {
        const nomeArquivo = `${Date.now()}-${editImagem.name}`;
        const { error: uploadError } = await supabase.storage
          .from("produtos")
          .upload(nomeArquivo, editImagem);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("produtos")
          .getPublicUrl(nomeArquivo);

        finalImagemUrl = data.publicUrl;
      }

      // Atualiza os dados na tabela do Supabase
      const { error: updateError } = await supabase
        .from("produtos")
        .update({
          nome: editNome,
          descricao: editDescricao,
          categoria: editCategoria,
          preco: Number(editPreco),
          estoque: Number(editEstoque),
          imagem_url: finalImagemUrl
        })
        .eq("id", produtoSelecionado.id);

      if (updateError) throw updateError;

      // Sincroniza o estado do frontend imediatamente
      setProdutos((prev) =>
        prev.map((p) =>
          p.id === produtoSelecionado.id
            ? {
                ...p,
                nome: editNome,
                descricao: editDescricao,
                categoria: editCategoria,
                preco: Number(editPreco),
                estoque: Number(editEstoque),
                imagem_url: finalImagemUrl
              }
            : p
        )
      );

      alert("Produto atualizado com sucesso!");
      fecharModalEditar();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar alterações do produto.");
    } finally {
      setSalvandoEdicao(false);
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

      {/* DASHBOARD CARD METRICS */}
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

                  <div className="flex gap-3 mt-6">
                    {/* 🔥 MODIFICADO: Agora abre o modal de edição na própria página */}
                    <button 
                      onClick={() => abrirModalEditar(produto)}
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
                      <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-xl font-bold shadow-lg shrink-0">
                        {avaliacao.nome_usuario ? avaliacao.nome_usuario.charAt(0).toUpperCase() : "U"}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-lg">{avaliacao.nome_usuario || "Usuário Anônimo"}</h4>
                          <button 
                            onClick={() => apagarAvaliacao(avaliacao.id)} 
                            title="Apagar Avaliação"
                            className="text-red-400 hover:text-white bg-red-400/10 hover:bg-red-500 transition p-2 rounded-lg"
                          >
                            <BiTrash />
                          </button>
                        </div>
                        
                        <div className="flex text-yellow-400 text-sm mb-3">
                           <span className="bg-yellow-500/20 px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                             <BiStar /> {avaliacao.nota || 5}.0
                           </span>
                        </div>
                        
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {avaliacao.comentario || "Nenhum comentário escrito."}
                        </p>
                        
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

      {/* 🔥 NOVO: MODAL INTERATIVO DE EDIÇÃO DE PRODUTO COMPLETO 🔥 */}
      {modalEditarAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#120124] w-full max-w-4xl rounded-[30px] border border-white/10 flex flex-col max-h-[90vh] shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-4">
                <div className="bg-purple-600 p-3 rounded-xl text-white">
                  <BiPackage className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Editar Produto</h2>
                  <p className="text-gray-400 text-sm mt-0.5">Altere as informações do produto selecionado</p>
                </div>
              </div>
              <button 
                onClick={fecharModalEditar} 
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition"
              >
                <BiX className="text-2xl" />
              </button>
            </div>

            {/* Content Body Grid */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 grid md:grid-cols-2 gap-6 bg-[#0e021d]">
              
              {/* Lado Esquerdo: Formulário */}
              <div className="bg-white text-black p-5 rounded-2xl shadow-lg flex flex-col gap-4 h-fit">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Nome do Produto</label>
                  <input
                    type="text"
                    placeholder="Nome do produto"
                    value={editNome}
                    onChange={(e) => setEditNome(e.target.value)}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Descrição</label>
                  <textarea
                    placeholder="Descrição"
                    value={editDescricao}
                    onChange={(e) => setEditDescricao(e.target.value)}
                    className="w-full p-3 border rounded min-h-[90px] focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Categoria</label>
                  <select
                    value={editCategoria}
                    onChange={(e) => setEditCategoria(e.target.value)}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    <option value="">Selecione a categoria</option>
                    <option>Bebidas</option>
                    <option>Lanches</option>
                    <option>Doces</option>
                    <option>Mercado</option>
                    <option>Eletrônicos</option>
                    <option>Roupas</option>
                    <option>Outros</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Preço (R$)</label>
                    <input
                      type="number"
                      placeholder="Preço"
                      value={editPreco}
                      onChange={(e) => setEditPreco(e.target.value)}
                      className="w-full p-3 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Estoque</label>
                    <input
                      type="number"
                      placeholder="Estoque"
                      value={editEstoque}
                      onChange={(e) => setEditEstoque(e.target.value)}
                      className="w-full p-3 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Foto do Produto</label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-purple-500 transition">
                    <BiCamera className="text-3xl mb-1 text-gray-600" />
                    <span className="text-sm text-gray-600 font-medium">{editImagem ? editImagem.name : "Alterar imagem do produto"}</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setEditImagem(file);
                          setEditImagemPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Lado Direito: Preview em tempo real */}
              <div className="bg-white text-black rounded-2xl shadow-lg overflow-hidden flex flex-col h-fit">
                <div className="h-56 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  {editImagemPreview ? (
                    <img
                      src={editImagemPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BiPackage className="text-7xl text-gray-400" />
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {editCategoria || "Categoria"}
                    </span>
                    <h2 className="text-2xl font-bold mt-2 truncate">
                      {editNome || "Nome do Produto"}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1 whitespace-pre-wrap min-h-[40px] line-clamp-3">
                      {editDescricao || "Descrição do produto..."}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                    <div className="text-green-600 font-bold text-2xl">
                      {Number(editPreco || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </div>
                    <span className="bg-gray-200 px-3 py-1 rounded-lg font-semibold text-sm">
                      Estoque: {editEstoque || 0}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-white/10 flex justify-end gap-3 bg-black/20">
              <button
                onClick={fecharModalEditar}
                disabled={salvandoEdicao}
                className="bg-white/5 hover:bg-white/10 text-white transition px-5 py-2.5 rounded-xl font-semibold border border-white/10 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvarEdicaoProduto}
                disabled={salvandoEdicao}
                className="bg-purple-600 hover:bg-purple-500 text-white transition px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg disabled:opacity-50"
              >
                <BiSave className="text-lg" />
                {salvandoEdicao ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default PainelComerciante;