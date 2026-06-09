const express = require("express");
const router = express.Router();
const multer = require("multer");

// Configuração do multer para pegar a imagem
const upload = multer({ storage: multer.memoryStorage() });

const authController = require("../controllers/authController");

// Cadastro
router.post("/cadastro", authController.register);

// Login
router.post("/login", authController.login);

// Melhores avaliações
router.get("/melhores_avaliacoes", authController.GetMelhoresEmpresas);

router.get("/loja/:id", authController.GetLoja);

// 🔥 NOVAS ROTAS
router.get("/ranking", authController.GetRankingMensal);
// Adicionado o upload.single("foto") apenas nesta rota
router.put("/perfil/:id", upload.single("foto"), authController.AtualizarPerfil);

// CHAT 
// router.post("/conversa", authController.getOrCreateConversa);
// router.get("/mensagens/:id", authController.getMensagens);
// router.post("/mensagem", authController.enviarMensagem);

module.exports = router;