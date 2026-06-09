const comercianteService = require('../services/comercianteService');

const PainelDoComerciante = async (req, res) => {
    try {
        const { id } = req.params;
        const { dataInicio, dataFim } = req.query; 
        const result = await comercianteService.PainelDoComerciante(id, dataInicio, dataFim);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === "Painel do comerciante não encontrada") {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
}

async function criarProduto(req, res) {
  try {
    // 🔥 Puxando também o usuario_id para o Plano B
    const { nome, descricao, categoria, preco, estoque, empresa_id, usuario_id } = req.body;
    const imagem = req.file; 

    const produtoSalvo = await comercianteService.salvarProduto({
      nome, 
      descricao, 
      categoria, 
      preco: Number(preco), 
      estoque: Number(estoque), 
      imagem,
      empresa_id,
      usuario_id // 🔥 Repassa o Plano B
    });

    return res.status(201).json({ mensagem: 'Produto cadastrado com sucesso!', produto: produtoSalvo });
  } catch (erro) {
    console.error("Erro no controller:", erro);
    return res.status(500).json({ erro: erro.message || 'Erro interno ao cadastrar produto.' });
  }
}

async function listarProdutosDaLoja(req, res) {
  try {
    const produtos = await comercianteService.listarProdutosDaLoja(req.params.id);
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function listarAvaliacoesProduto(req, res) {
  try {
    const avaliacoes = await comercianteService.listarAvaliacoesProduto(req.params.id);
    res.status(200).json(avaliacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function criarAvaliacao(req, res) {
  try {
    const { produto_id, nota, comentario, nome_usuario } = req.body;
    const foto = req.file;
    
    const avaliacao = await comercianteService.salvarAvaliacao({ 
      produto_id, 
      nome_usuario,
      nota: Number(nota), 
      comentario, 
      foto 
    });
    
    res.status(201).json({ avaliacao });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function listarEstabelecimentos(req, res) {
  try {
    const data = await comercianteService.listarEstabelecimentos();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function listarMaisVendidos(req, res) {
  try {
    const data = await comercianteService.listarMaisVendidos();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function listarBemAvaliados(req, res) {
  try {
    const data = await comercianteService.listarBemAvaliados();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function listarDescubra(req, res) {
  try {
    const data = await comercianteService.listarDescubra();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
    PainelDoComerciante,
    criarProduto,
    listarProdutosDaLoja,
    listarAvaliacoesProduto,
    criarAvaliacao,
    listarEstabelecimentos,
    listarMaisVendidos,
    listarBemAvaliados,
    listarDescubra
};