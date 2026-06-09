const express = require('express');
const router = express.Router();
const multer = require('multer');

const comercianteController = require('../controllers/comercianteController');
const upload = multer({ storage: multer.memoryStorage() });

router.get("/painel-comerciante/:id", comercianteController.PainelDoComerciante);
router.post('/cadastrar-produtos', upload.single('imagem'), comercianteController.criarProduto);

// --- NOVAS ROTAS ADICIONADAS ---
router.get('/loja/:id/produtos', comercianteController.listarProdutosDaLoja);
router.get('/produtos/:id/avaliacoes', comercianteController.listarAvaliacoesProduto);
router.post('/avaliacoes', upload.single('foto'), comercianteController.criarAvaliacao);
// --- ROTAS DA HOME (PARA O FRONTEND BUSCAR OS DADOS) ---
router.get('/estabelecimentos', comercianteController.listarEstabelecimentos);
router.get('/produtos/mais-vendidos', comercianteController.listarMaisVendidos);
router.get('/produtos/melhores-avaliacoes', comercianteController.listarBemAvaliados);
router.get('/produtos/descubra', comercianteController.listarDescubra);
module.exports = router;