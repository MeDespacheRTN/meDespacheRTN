const express = require('express');

const router = express.Router();

const comercianteController =
 require('../controllers/comercianteController');

router.get(
  "/painel-comerciante/:id",
  comercianteController.PainelDoComerciante
);

module.exports = router;