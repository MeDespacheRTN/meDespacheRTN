import { useState, useEffect } from "react";
import Map from "../components/Map";
import { useNavigate } from "react-router-dom";
import { Star, Package, Trophy, Gift, Crown, TrendingUp, BadgeCheck } from "lucide-react";
import { supabase } from "../config/supabase"; // 🔥 CORREÇÃO: Importando o supabase para buscar o ID da empresa

// IMPORT DAS IMAGENS
import banner1 from "../assets/banners/banner1.png";
import banner2 from "../assets/banners/banner2.png";
import banner3 from "../assets/banners/banner3.png";

function Home() {
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);

  const [showCategorias, setShowCategorias] = useState(false);
  const [showConfiguracoes, setShowConfiguracoes] = useState(false);

  const [melhoresEmpresas, setMelhoresEmpresas] = useState([]);
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  
  // RANKING MENSAL
  const [rankingMensal, setRankingMensal] = useState([]);

  // BANNERS DO CARROSSEL
  const banners = [banner1, banner2, banner3];

  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [empresaId, setEmpresaId] = useState(null); // 🔥 NOVO ESTADO: Guarda o ID da empresa real

  const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([]);
  const [produtosBemAvaliados, setProdutosBemAvaliados] = useState([]);
  const [produtosDescobertas, setProdutosDescobertas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userStorage = localStorage.getItem("usuario"); 
    if (userStorage) {
      const usuario = JSON.parse(userStorage);
      setUsuarioLogado(usuario);

      // 🔥 CORREÇÃO: Se for comerciante, busca o ID da empresa dele no banco
      if (usuario.tipo === "comerciante" || usuario.role === "comerciante") {
        async function obterIdEmpresa() {
          const { data } = await supabase
            .from("empresas")
            .select("id")
            .eq("usuario_id", usuario.id)
            .single();
          
          if (data) {
            setEmpresaId(data.id);
          }
        }
        obterIdEmpresa();
      }
    }
  }, []);

  useEffect(() => {
    async function buscarDados() {
      try {
        // BUSCANDO ESTABELECIMENTOS PARA O MAPA
        const resMap = await fetch(`${import.meta.env.VITE_API_URL}comerciante/estabelecimentos`);
        if (resMap.ok) {
          const dataMap = await resMap.json();
          setEstabelecimentos(dataMap.filter((local) => local.latitude != null && local.longitude != null));
        }

        // BUSCANDO EMPRESAS E PRODUTOS
        const resAvaliacoes = await fetch(`${import.meta.env.VITE_API_URL}auth/melhores_avaliacoes`);
        if (resAvaliacoes.ok) setMelhoresEmpresas(await resAvaliacoes.json());

        const resVendidos = await fetch(`${import.meta.env.VITE_API_URL}comerciante/produtos/mais-vendidos`);
        if (resVendidos.ok) setProdutosMaisVendidos(await resVendidos.json());

        const resBemAvaliados = await fetch(`${import.meta.env.VITE_API_URL}comerciante/produtos/melhores-avaliacoes`);
        if (resBemAvaliados.ok) setProdutosBemAvaliados(await resBemAvaliados.json());

        const resDescobertas = await fetch(`${import.meta.env.VITE_API_URL}comerciante/produtos/descubra`);
        if (resDescobertas.ok) setProdutosDescobertas(await resDescobertas.json());

        // BUSCANDO RANKING MENSAL
        const resRanking = await fetch(`${import.meta.env.VITE_API_URL}auth/ranking`);
        if (resRanking.ok) setRankingMensal(await resRanking.json());

      } catch (erro) {
        console.log("Erro ao buscar dados:", erro);
      }
    }

    buscarDados();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  function AbrirLoja(id) {
    if (id) navigate(`/loja/${id}`);
  }

  // 🔥 LÓGICA DO SEARCH FUNCIONAL
  const termo = search.toLowerCase();
  
  // Filtra as listas com base no que foi digitado
  const rankingFiltrado = rankingMensal.filter(r => r.nome_loja?.toLowerCase().includes(termo));
  const lojasFiltradas = melhoresEmpresas.filter(e => e.nome_loja?.toLowerCase().includes(termo));
  const vendidosFiltrados = produtosMaisVendidos.filter(p => p.nome?.toLowerCase().includes(termo));
  const avaliadosFiltrados = produtosBemAvaliados.filter(p => p.nome?.toLowerCase().includes(termo));
  const descobertasFiltradas = produtosDescobertas.filter(p => p.nome?.toLowerCase().includes(termo));

  // 🔥 FUNÇÃO QUE CARIMBA O SELO VERIFICADO NO PRODUTO SE A LOJA FOR TOP 10
  function renderSeloTopSeller(empresa_id) {
    const rankIndex = rankingMensal.findIndex(r => r.id === empresa_id);
    if (rankIndex === -1) return null; // Se não tá no ranking, não mostra selo

    const badgeColor = rankIndex === 0 ? "text-yellow-400" : rankIndex === 1 ? "text-gray-300" : rankIndex === 2 ? "text-amber-600" : "text-purple-400";

    return (
      <div className="flex items-center gap-1 mt-1 bg-white/5 w-fit px-2 py-0.5 rounded-md border border-white/5">
        <BadgeCheck size={12} className={badgeColor} />
        <span className={`text-[9px] font-black uppercase tracking-wider ${badgeColor}`}>
          Top {rankIndex + 1} Seller
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#070014] text-white">
      {/* BLOBS */}
      <div className="absolute -top-40 -left-40 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-purple-600 rounded-full blur-[180px] opacity-50"></div>
      <div className="absolute top-[10%] right-[-100px] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-fuchsia-500 rounded-full blur-[180px] opacity-50"></div>
      <div className="absolute bottom-[-250px] left-[20%] w-[350px] h-[350px] md:w-[700px] md:h-[700px] bg-indigo-500 rounded-full blur-[200px] opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.35),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-transparent to-indigo-950/50"></div>

      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 fixed top-0 left-0 h-full pt-28 z-10 flex-col bg-gradient-to-b from-purple-950/70 via-purple-900/60 to-indigo-950/70 backdrop-blur-2xl border-r border-white/10 shadow-2xl">
        <div className="px-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-200">Menu</h2>
          <p className="text-sm text-purple-400">Navegação</p>
        </div>

        <nav className="flex flex-col gap-2 px-4">
          {/* CATEGORIAS */}
          <div>
            <button onClick={() => setShowCategorias(!showCategorias)} className="w-full px-4 py-3 rounded-xl text-purple-200 hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center justify-between">
              <span>Categorias</span>
              <span className={`transition-transform duration-300 ${showCategorias ? "rotate-180" : ""}`}>▼</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${showCategorias ? "max-h-96 mt-2" : "max-h-0"}`}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col gap-2 backdrop-blur-xl">
                {["🍔 Lanches", "🍕 Pizza", "🍣 Japonesa", "🥗 Saudável", "🍰 Doces", "🛒 Mercados"].map((categoria, i) => (
                  <button key={i} className="text-left px-3 py-2 rounded-xl text-sm text-purple-100 hover:bg-white/10 transition">{categoria}</button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate("/dashboard")}
            className="text-left px-4 py-3 rounded-xl bg-purple-600/20 text-purple-200 hover:bg-purple-600/40 hover:text-white transition-all duration-200 font-bold border border-purple-500/30 flex items-center gap-2 hover:pl-6"
          >
            📍 Mapa e Lojas Próximas
          </button>

          {/* CONFIGURAÇÕES */}
          <div>
            <button onClick={() => setShowConfiguracoes(!showConfiguracoes)} className="w-full px-4 py-3 rounded-xl text-purple-200 hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center justify-between">
              <span>Configurações</span>
              <span className={`transition-transform duration-300 ${showConfiguracoes ? "rotate-180" : ""}`}>▼</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${showConfiguracoes ? "max-h-96 mt-2" : "max-h-0"}`}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col gap-2 backdrop-blur-xl">
                <button onClick={() => navigate("/perfil")} className="text-left px-3 py-2 rounded-xl text-sm text-purple-100 hover:bg-white/10 transition">👤 Perfil</button>
                <button className="text-left px-3 py-2 rounded-xl text-sm text-purple-100 hover:bg-white/10 transition">🔔 Notificações</button>
                <button className="text-left px-3 py-2 rounded-xl text-sm text-purple-100 hover:bg-white/10 transition">🔒 Privacidade</button>
                {(usuarioLogado?.tipo === "comerciante" || usuarioLogado?.role === "comerciante") && (
                  /* 🔥 CORREÇÃO: Agora usa a variável empresaId mapeada do banco, evitando IDs fantasmas */
                  <button onClick={() => navigate(`/painel-comerciante/${empresaId || 1}`)} className="text-left px-3 py-2 rounded-xl text-sm text-purple-100 hover:bg-white/10 transition">📊 Dashboard</button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="relative z-10 flex-1 md:ml-64 flex flex-col p-4 md:p-6 gap-6 pt-24 md:pt-32">
        
        {/* BUSCA */}
        <div className="relative w-full max-w-3xl mx-auto mb-4">
          <input
            type="text"
            placeholder="Buscar restaurantes, mercados, produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-4 pl-14 pr-5 rounded-2xl bg-white text-black shadow-xl outline-none focus:ring-4 focus:ring-purple-500"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">🔍</div>
        </div>

        {/* SÓ MOSTRA O BANNER E O CARROSSEL SE NÃO ESTIVER BUSCANDO NADA */}
        {search === "" && (
          <>
            <section className="mb-8">
              <div className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-700 rounded-[32px] p-8 md:p-12 shadow-2xl">
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">🚀 Evolua seu negócio</span>
                <h1 className="text-4xl md:text-6xl font-black mt-5">Bem-vindo ao <span className="block text-yellow-300">MeDespache</span></h1>
                <p className="text-purple-100 text-lg mt-4 max-w-2xl">Encontre restaurantes, mercados, farmácias e lojas próximas.</p>
                <div className="flex gap-4 mt-8 flex-wrap">
                  <button 
                    onClick={() => navigate("/dashboard")}
                    className="bg-white text-purple-700 font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    📍 Explorar Lojas no Mapa
                  </button>
                  <button className="border border-white/30 px-6 py-3 rounded-2xl hover:bg-white/10 transition-colors">Ver Promoções</button>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-purple-200 mb-4">🎯 Promoções</h2>
              <div className="w-full h-52 sm:h-64 md:h-80 relative overflow-hidden rounded-2xl shadow-lg">
                <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${index * 100}%)` }}>
                  {banners.map((img, i) => (
                    <img key={i} src={img} alt={`Banner ${i}`} className="w-full h-52 sm:h-64 md:h-80 object-cover flex-shrink-0" />
                  ))}
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {banners.map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`} />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* 🔥 SESSÃO DO RANKING MENSAL 🔥 */}
        {(search === "" || rankingFiltrado.length > 0) && (
          <section className="mt-8 bg-gradient-to-br from-[#120124] to-[#1e053a] border border-yellow-500/20 rounded-[32px] p-6 md:p-8 shadow-[0_0_40px_rgba(234,179,8,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10 blur-xl pointer-events-none">
              <Trophy size={200} className="text-yellow-500" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 flex items-center gap-3">
                  <Trophy size={32} className="text-yellow-400" /> Ranking Mensal
                </h2>
                <p className="text-gray-300 mt-2">As 10 lojas com mais vendas neste mês. Renova todo dia 1º!</p>
              </div>

              {/* BENEFÍCIOS DO TOP 3 */}
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 w-full md:w-auto">
                <h3 className="text-sm font-bold text-gray-200 mb-2 flex items-center gap-2">
                  <Gift size={16} className="text-pink-400" /> Recompensas do Top 3
                </h3>
                <ul className="text-xs text-gray-400 space-y-2">
                  <li className="flex items-center gap-2"><span className="text-yellow-400 font-bold">1º</span> 1 ano de assinatura Gold + Selo Gold</li>
                  <li className="flex items-center gap-2"><span className="text-gray-300 font-bold">2º</span> 1 ano de assinatura Prata + Selo Prata</li>
                  <li className="flex items-center gap-2"><span className="text-amber-600 font-bold">3º</span> 1 ano de assinatura Bronze + Selo Prata</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar relative z-10">
              {rankingFiltrado.map((loja, index) => {
                // LÓGICA DE CORES DO TOP 10 SELLER
                const badgeColor = index === 0 ? "text-yellow-400" : index === 1 ? "text-gray-300" : index === 2 ? "text-amber-600" : "text-purple-400";
                const borderColor = index === 0 ? "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.2)]" : index === 1 ? "border-gray-400" : index === 2 ? "border-amber-600" : "border-white/5";
                const numberBg = index === 0 ? "bg-yellow-400 text-black" : index === 1 ? "bg-gray-300 text-black" : index === 2 ? "bg-amber-600 text-white" : "bg-purple-900 text-white";

                return (
                  <div key={loja.id} onClick={() => AbrirLoja(loja.id)} className={`min-w-[160px] relative bg-black/50 border rounded-2xl p-4 cursor-pointer hover:-translate-y-2 transition-transform duration-300 flex-shrink-0 ${borderColor}`}>
                    <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-lg z-20 ${numberBg}`}>
                      {index + 1}
                    </div>

                    <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full mb-3 overflow-hidden border-2 border-white/10 relative z-10">
                      {loja.foto_perfil || loja.imagem_url ? (
                        <img src={loja.foto_perfil || loja.imagem_url} alt={loja.nome_loja} className="w-full h-full object-cover" />
                      ) : (
                        <Crown className="w-full h-full p-4 text-white/20" />
                      )}
                    </div>
                    <h3 className="text-center font-bold text-sm truncate" title={loja.nome_loja}>{loja.nome_loja}</h3>
                    
                    {/* 🔥 SELO TOP X SELLER COM VERIFICADO */}
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <BadgeCheck size={14} className={badgeColor} />
                      <span className={`text-[11px] font-black uppercase tracking-wider ${badgeColor}`}>
                        Top {index + 1} Seller
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-1 mt-3 text-green-400 text-xs font-bold bg-green-500/10 py-1 rounded-lg">
                      <TrendingUp size={12} /> {loja.vendas_mes} vendas
                    </div>
                  </div>
                );
              })}
              {rankingFiltrado.length === 0 && <p className="text-gray-400">Nenhuma loja no ranking encontrada na busca.</p>}
            </div>
          </section>
        )}

        {/* PRODUTOS MAIS VENDIDOS */}
        {(search === "" || vendidosFiltrados.length > 0) && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-white mb-4">🔥 Produtos Mais Vendidos</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {vendidosFiltrados.length > 0 ? vendidosFiltrados.map(produto => (
                <div key={`vendidos-${produto.id}`} onClick={() => AbrirLoja(produto.empresa_id)} className="min-w-[160px] sm:min-w-[200px] bg-[#120124] border border-white/10 p-3 sm:p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer flex flex-col">
                  <div className="h-24 bg-black/40 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                    {produto.imagem_url ? <img src={produto.imagem_url} alt={produto.nome} className="w-full h-full object-cover" /> : <Package className="text-4xl text-white/10" />}
                  </div>
                  <h3 className="font-semibold truncate text-white text-sm" title={produto.nome}>{produto.nome}</h3>
                  
                  {/* NOME DA LOJA DO PRODUTO */}
                  <p className="text-[11px] text-gray-400 truncate mb-1">{produto.nome_loja || "Loja Parceira"}</p>
                  
                  {/* 🔥 SELO TOP SELLER ADICIONADO AQUI */}
                  {renderSeloTopSeller(produto.empresa_id)}

                  {/* ESTRELAS E TOTAL DE AVALIAÇÕES */}
                  <div className="flex items-center gap-1 mt-1 text-yellow-400 text-xs font-bold">
                    <Star size={12} className="fill-yellow-400" />
                    <span>{produto.avaliacao ? Number(produto.avaliacao).toFixed(1) : "0.0"}</span>
                    <span className="text-gray-500 font-normal text-[10px] ml-1">
                      ({produto.total_avaliacoes !== undefined ? produto.total_avaliacoes : 0} avaliações)
                    </span>
                  </div>

                  <p className="text-green-400 font-bold text-sm mt-2">{Number(produto.preco || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
              )) : <p className="text-gray-400 text-sm">Nenhum produto encontrado...</p>}
            </div>
          </section>
        )}

        {/* MAIS BEM AVALIADOS */}
        {(search === "" || avaliadosFiltrados.length > 0) && (
          <section className="mt-6">
            <h2 className="text-xl font-bold text-white mb-4">💎 Mais Bem Avaliados</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {avaliadosFiltrados.length > 0 ? avaliadosFiltrados.map(produto => (
                <div key={`avaliados-${produto.id}`} onClick={() => AbrirLoja(produto.empresa_id)} className="min-w-[160px] sm:min-w-[200px] bg-[#120124] border border-white/10 p-3 sm:p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer flex flex-col">
                  <div className="h-24 bg-black/40 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                    {produto.imagem_url ? <img src={produto.imagem_url} alt={produto.nome} className="w-full h-full object-cover" /> : <Package className="text-4xl text-white/10" />}
                  </div>
                  <h3 className="font-semibold truncate text-white text-sm" title={produto.nome}>{produto.nome}</h3>
                  
                  {/* NOME DA LOJA DO PRODUTO */}
                  <p className="text-[11px] text-gray-400 truncate mb-1">{produto.nome_loja || "Loja Parceira"}</p>

                  {/* 🔥 SELO TOP SELLER ADICIONADO AQUI */}
                  {renderSeloTopSeller(produto.empresa_id)}

                  {/* ESTRELAS E TOTAL DE AVALIAÇÕES */}
                  <div className="flex items-center gap-1 mt-1 text-yellow-400 text-xs font-bold">
                    <Star size={12} className="fill-yellow-400" />
                    <span>{produto.avaliacao ? Number(produto.avaliacao).toFixed(1) : "0.0"}</span>
                    <span className="text-gray-500 font-normal text-[10px] ml-1">
                      ({produto.total_avaliacoes !== undefined ? produto.total_avaliacoes : 0} avaliações)
                    </span>
                  </div>

                  <p className="text-green-400 font-bold text-sm mt-2">{Number(produto.preco || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
              )) : <p className="text-gray-400 text-sm">Nenhum produto encontrado...</p>}
            </div>
          </section>
        )}

        {/* DESCOBRIR */}
        {(search === "" || descobertasFiltradas.length > 0) && (
          <section className="mt-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">🛍️ Descubra</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {descobertasFiltradas.length > 0 ? descobertasFiltradas.map(produto => (
                <div key={`descobrir-${produto.id}`} onClick={() => AbrirLoja(produto.empresa_id)} className="min-w-[160px] sm:min-w-[200px] bg-[#120124] border border-white/10 p-3 sm:p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer flex flex-col">
                  <div className="h-24 bg-black/40 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                    {produto.imagem_url ? <img src={produto.imagem_url} alt={produto.nome} className="w-full h-full object-cover" /> : <Package className="text-4xl text-white/10" />}
                  </div>
                  <h3 className="font-semibold truncate text-white text-sm" title={produto.nome}>{produto.nome}</h3>
                  
                  {/* NOME DA LOJA DO PRODUTO */}
                  <p className="text-[11px] text-gray-400 truncate mb-1">{produto.nome_loja || "Loja Parceira"}</p>

                  {/* 🔥 SELO TOP SELLER ADICIONADO AQUI */}
                  {renderSeloTopSeller(produto.empresa_id)}

                  {/* ESTRELAS E TOTAL DE AVALIAÇÕES */}
                  <div className="flex items-center gap-1 mt-1 text-yellow-400 text-xs font-bold">
                    <Star size={12} className="fill-yellow-400" />
                    <span>{produto.avaliacao ? Number(produto.avaliacao).toFixed(1) : "0.0"}</span>
                    <span className="text-gray-500 font-normal text-[10px] ml-1">
                      ({produto.total_avaliacoes !== undefined ? produto.total_avaliacoes : 0} avaliações)
                    </span>
                  </div>

                  <p className="text-green-400 font-bold text-sm mt-2">{Number(produto.preco || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
              )) : <p className="text-gray-400 text-sm">Nenhum produto encontrado...</p>}
            </div>
          </section>
        )}

        {/* LOJAS BEM AVALIADAS */}
        {(search === "" || lojasFiltradas.length > 0) && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4">⭐ Lojas Mais bem avaliadas</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {lojasFiltradas.length > 0 ? lojasFiltradas.map((empresa) => (
                <div key={empresa.id} onClick={() => AbrirLoja(empresa.id)} className="min-w-[160px] sm:min-w-[200px] bg-white p-3 sm:p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer">
                  <div className="h-24 bg-gray-200 rounded mb-2 flex items-center justify-center text-gray-400 text-xs overflow-hidden">
                    {empresa.imagem_url || empresa.foto_perfil || empresa.foto_url ? (
                      <img src={empresa.imagem_url || empresa.foto_perfil || empresa.foto_url} alt={empresa.nome_loja} className="w-full h-full object-cover" />
                    ) : ("Sem Imagem")}
                  </div>
                  <h3 className="font-semibold truncate text-black mt-2" title={empresa.nome_loja}>{empresa.nome_loja}</h3>
                  
                  {/* ESTRELA E TOTAL DE AVALIAÇÕES PARA AS LOJAS TAMBÉM */}
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-700">{empresa.nota ? empresa.nota.toFixed(1) : "0.0"}</span>
                    <span className="text-gray-400 text-[10px] ml-1">
                      ({empresa.quantidade_avaliacoes !== undefined ? empresa.quantidade_avaliacoes : 0} avaliações)
                    </span>
                  </div>
                </div>
              )) : <p className="text-gray-300">Nenhuma empresa encontrada...</p>}
            </div>
          </section>
        )}

        {/* MAPA (SÓ MOSTRA SE NÃO ESTIVER BUSCANDO) */}
        {search === "" && (
          <div className="w-full h-[300px] sm:h-[400px] md:h-[420px] rounded-2xl shadow-inner overflow-hidden mt-8">
            <Map estabelecimentos={estabelecimentos} />
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;