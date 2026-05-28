const comercianteService =
 require('../services/comercianteService');

const PainelDoComerciante = async (req, res) => {

    try {

        const { id } = req.params;

        const result =
          await comercianteService.PainelDoComerciante(id);

        res.status(200).json(result);

    } catch (error) {

        if (
          error.message ===
          "Painel do comerciante não encontrada"
        ) {
            return res.status(404).json({
              error: error.message
            });
        }

        res.status(500).json({
          error: error.message
        });

    }

}

module.exports = {
    PainelDoComerciante
};