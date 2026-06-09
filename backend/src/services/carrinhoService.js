const supabase = require("../config/db");

async function adicionarItem(usuarioId, produtoId) {
  // O upsert é mágico: se o produto já existe no carrinho, ele apenas aumenta a quantidade
  const { data, error } = await supabase
    .from('carrinhos')
    .upsert({ usuario_id: usuarioId, produto_id: produtoId, quantidade: 1 }, { onConflict: 'usuario_id, produto_id' })
    .select();
    
  if (error) throw error;
  return data;
}

async function listarCarrinho(usuarioId) {
  const { data, error } = await supabase
    .from('carrinhos')
    .select('*, produtos(*)') // Puxa os dados do produto junto
    .eq('usuario_id', usuarioId);
    
  if (error) throw error;
  return data;
}

module.exports = {
  adicionarItem,
  listarCarrinho
};