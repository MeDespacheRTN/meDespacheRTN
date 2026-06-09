const carrinhoService = require("../services/carrinhoService");

const adicionarAoCarrinho = async (req, res) => {
  try {
    const { usuario_id, produto_id } = req.body;
    const data = await carrinhoService.adicionarItem(usuario_id, produto_id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarCarrinho = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const data = await carrinhoService.listarCarrinho(usuario_id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  adicionarAoCarrinho,
  listarCarrinho
};