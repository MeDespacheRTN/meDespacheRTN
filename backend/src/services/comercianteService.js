const Empresa = require("../models/Empresa");
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const PainelDoComerciante = async (id, dataInicio, dataFim) => {
    try {
        const empresa = await Empresa.findByUsuarioId(id);
        if (!empresa) throw new Error("Painel do comerciante não encontrada");

        let inicio = dataInicio;
        let fim = dataFim;

        if (!inicio || !fim) {
            const dataAtual = new Date();
            const dataTrintaDiasAtras = new Date();
            dataTrintaDiasAtras.setDate(dataAtual.getDate() - 30);
            inicio = dataTrintaDiasAtras.toISOString();
            fim = dataAtual.toISOString();
        }

        return { empresa, periodo: { inicio, fim } };
    } catch (error) {
        throw new Error(error.message);
    }
}

async function salvarProduto(dados) {
  let imagemUrl = "";

  if (dados.imagem) {
    const nomeArquivo = `${Date.now()}-${dados.imagem.originalname}`;
    const { error: uploadError } = await supabase.storage
      .from("produtos")
      .upload(nomeArquivo, dados.imagem.buffer, { contentType: dados.imagem.mimetype });

    if (uploadError) throw uploadError;
    const { data: urlData } = supabase.storage.from("produtos").getPublicUrl(nomeArquivo);
    imagemUrl = urlData.publicUrl;
  }

  const { data: produto, error: dbError } = await supabase
    .from("produtos")
    .insert([{
        nome: dados.nome,
        descricao: dados.descricao,
        categoria: dados.categoria,
        preco: dados.preco,
        estoque: dados.estoque,
        imagem_url: imagemUrl,
      }])
    .select(); 

  if (dbError) throw dbError;
  return produto;
}

async function listarProdutosDaLoja(lojaId) {
  const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .eq('empresa_id', lojaId)
    .order('id', { ascending: false });
    
  if (error) throw new Error(error.message);
  return data;
}

async function listarAvaliacoesProduto(produtoId) {
  const { data, error } = await supabase
    .from('avaliacoes_produtos') 
    .select('*')
    .eq('produto_id', produtoId)
    .order('criado_em', { ascending: false });
    
  if (error) throw new Error(error.message);
  return data;
}

async function salvarAvaliacao(dados) {
  let fotoUrl = "";
  
  if (dados.foto) {
    const nomeArquivo = `${Date.now()}-${dados.foto.originalname}`;
    const { error: uploadError } = await supabase.storage
      .from("produtos")
      .upload(nomeArquivo, dados.foto.buffer, { contentType: dados.foto.mimetype });
      
    if (uploadError) throw uploadError;
    const { data: urlData } = supabase.storage.from("produtos").getPublicUrl(nomeArquivo);
    fotoUrl = urlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("avaliacoes_produtos")
    .insert([{
      produto_id: dados.produto_id,
      nome_usuario: dados.nome_usuario || "Cliente Anônimo", 
      nota: dados.nota,
      comentario: dados.comentario,
      foto_url: fotoUrl
    }])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
}

async function listarEstabelecimentos() {
  const { data, error } = await supabase
    .from('estabelecimentos') 
    .select('*');
    
  if (error) throw new Error(error.message);
  return data;
}

// 🔥 FUNÇÃO DE FORMATAÇÃO PADRONIZADA PARA TODOS OS PRODUTOS
function formatarProdutosComAvaliacoes(produtos) {
  return produtos.map(p => {
    const notas = p.avaliacoes_produtos || [];
    const totalAvaliacoes = notas.length;
    const media = totalAvaliacoes > 0 ? (notas.reduce((acc, curr) => acc + curr.nota, 0) / totalAvaliacoes) : 0;
    
    return {
      id: p.id,
      nome: p.nome,
      descricao: p.descricao,
      categoria: p.categoria,
      preco: p.preco,
      imagem_url: p.imagem_url,
      empresa_id: p.empresa_id,
      nome_loja: p.empresas?.nome_loja || "Loja Parceira",
      avaliacao: media,
      total_avaliacoes: totalAvaliacoes
    };
  });
}

async function listarMaisVendidos() {
  const { data, error } = await supabase
    .from('produtos')
    .select(`
      id, nome, preco, imagem_url, empresa_id,
      empresas ( nome_loja ),
      avaliacoes_produtos ( nota )
    `)
    .order('id', { ascending: false })
    .limit(10);
    
  if (error) throw new Error(error.message);
  return formatarProdutosComAvaliacoes(data);
}

async function listarBemAvaliados() {
  const { data, error } = await supabase
    .from('produtos')
    .select(`
      id, nome, preco, imagem_url, empresa_id,
      empresas ( nome_loja ),
      avaliacoes_produtos ( nota )
    `)
    .limit(10);
    
  if (error) throw new Error(error.message);
  const formatados = formatarProdutosComAvaliacoes(data);
  return formatados.sort((a, b) => b.avaliacao - a.avaliacao);
}

async function listarDescubra() {
  const { data, error } = await supabase
    .from('produtos')
    .select(`
      id, nome, preco, imagem_url, empresa_id,
      empresas ( nome_loja ),
      avaliacoes_produtos ( nota )
    `)
    .limit(10);
    
  if (error) throw new Error(error.message);
  return formatarProdutosComAvaliacoes(data);
}

module.exports = {
    PainelDoComerciante,
    salvarProduto,
    listarProdutosDaLoja,
    listarAvaliacoesProduto,
    salvarAvaliacao,
    listarEstabelecimentos,
    listarMaisVendidos,
    listarBemAvaliados,
    listarDescubra
};