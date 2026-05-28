const Empresa = require("../models/Empresa");

const PainelDoComerciante = async (id) => {

    try {

        const empresa =
          await Empresa.findByUsuarioId(id);

        if (!empresa) {
            throw new Error(
              "Painel do comerciante não encontrada"
            );
        }

        return empresa;

    } catch (error) {

        throw new Error(error.message);

    }

}

module.exports = {
    PainelDoComerciante
};