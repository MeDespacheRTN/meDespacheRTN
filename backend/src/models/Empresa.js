const supabase = require("../config/db");

const findByUsuarioId = async (usuarioId) => {

  const { data, error } = await supabase
    .from("empresas")
    .select("*")
    .eq("usuario_id", usuarioId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  findByUsuarioId
};