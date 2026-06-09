const express = require("express");
const router = express.Router();
const carrinhoController = require("../controllers/carrinhoController");

// Rota para adicionar item
router.post("/adicionar", carrinhoController.adicionarAoCarrinho);
// Rota para listar itens do usuário
router.get("/:usuario_id", carrinhoController.listarCarrinho);

module.exports = router;