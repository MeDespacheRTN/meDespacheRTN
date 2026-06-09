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

// 📌 LOGIN
const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const result = await authService.login(email, senha);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📌 MELHORES EMPRESAS
const GetMelhoresEmpresas = async (req, res) => {
  try {
    const result = await authService.GetMelhoresEmpresas();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 BUSCAR LOJA
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

// 🔥 ATUALIZAR PERFIL
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

// 🔥 RANKING MENSAL (Corrigido para chamar o Service ao invés de bater no banco aqui)
const GetRankingMensal = async (req, res) => {
  try {
    const result = await authService.GetRankingMensal();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  GetMelhoresEmpresas,
  GetLoja,
  AtualizarPerfil,
  GetRankingMensal
};