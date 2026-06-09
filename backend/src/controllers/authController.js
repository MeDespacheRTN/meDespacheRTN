const authService = require("../services/authService");

// 📌 CADASTRO
const register = async (req, res) => {
  try {
    const { nome, email, senha, tipo, nomeLoja, cnpj } = req.body;

    const result = await authService.register(nome, email, senha, tipo, nomeLoja, cnpj);

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN,
const login = async (req, res) => {

  try {
    const {email, senha} = req.body;

    const result = await authService.login(email, senha);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

};

const GetMelhoresEmpresas = async (req, res) => {
  try {
    const result = await authService.GetMelhoresEmpresas();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetLoja = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await authService.GetLoja(id);

    res.status(200).json(result);
  } catch (error) {
    
    if (error.message === "Loja não encontrada") {
      return res.status(404).json({ error: error.message });
    }

    if (error.message === "ID inválido") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: error.message });
  }
};

// 🔥 FUNÇÃO DE ATUALIZAR PERFIL ADICIONADA AQUI
const AtualizarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, nova_senha } = req.body;
    const foto = req.file; // Arquivo da foto vindo do multer

    const result = await authService.AtualizarPerfil(id, { 
      nome, 
      email, 
      telefone, 
      nova_senha, 
      foto 
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetRankingMensal = async () => {
  // 1. Busca todas as empresas e as fotos dos donos
  const { data: empresas, error: errEmpresas } = await supabase
    .from('empresas')
    .select(`
      id,
      nome_loja,
      usuarios (
        foto_url
      )
    `);

  if (errEmpresas) {
    throw new Error("Erro ao buscar dados do ranking: " + errEmpresas.message);
  }

  // 2. Busca TODOS os pedidos reais da tabela 'pedidos'
  const { data: pedidos, error: errPedidos } = await supabase
    .from('pedidos')
    .select('empresa_id'); 

  if (errPedidos) {
    throw new Error("Erro ao buscar pedidos: " + errPedidos.message);
  }

  // 3. Monta o ranking contando quantos pedidos cada loja tem
  const ranking = empresas.map((empresa) => {
    // Filtra os pedidos que pertencem ao ID dessa empresa e conta o tamanho do array
    const totalVendas = pedidos ? pedidos.filter(p => p.empresa_id === empresa.id).length : 0;

    return {
      id: empresa.id,
      nome_loja: empresa.nome_loja,
      foto_perfil: empresa.usuarios?.foto_url || null, 
      vendas_mes: totalVendas // 🔥 AGORA O NÚMERO É 100% REAL DO BANCO!
    };
  });

  // 4. Ordena do maior vendedor para o menor
  ranking.sort((a, b) => b.vendas_mes - a.vendas_mes);

  // 5. Retorna o Top 10
  return ranking.slice(0, 10);
};

module.exports = {
  register,
  login,
  GetMelhoresEmpresas,
  GetLoja,
  AtualizarPerfil,
  GetRankingMensal
};