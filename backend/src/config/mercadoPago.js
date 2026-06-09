const express = require("express");
const router = express.Router();
const { MercadoPagoConfig, Preference } = require("mercadopago");

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
  environment: "sandbox", // Altere para "production" quando for para produção
});

const preference = new Preference(client);

router.post("/create-checkout", async (req, res) => {
  try {
    // 1. Recebe a lista de itens vinda do carrinho do Frontend
    const { items } = req.body;

    // Validação para garantir que o array existe e não está vazio
    if (!items || items.length === 0) {
      return res.status(400).json({
        error: "O carrinho está vazio ou os dados não foram enviados.",
      });
    }

    // 2. Mapeia os produtos tratando o formato padrão ou o formato do Supabase (tabela relacionada)
    const itensMercadoPago = items.map((item) => {
      // Como o Supabase faz um JOIN, os dados do produto podem vir dentro do objeto 'produtos'
      const nomeProduto = item.nome || (item.produtos && item.produtos.nome) || "Produto MeDespache";
      const precoProduto = item.preco || (item.produtos && item.produtos.preco) || 0;
      const imagemProduto = item.imagem_url || (item.produtos && item.produtos.imagem_url) || "";
      const quantidadeProduto = item.quantidade || 1;

      return {
        title: String(nomeProduto),
        quantity: Number(quantidadeProduto),
        unit_price: Number(precoProduto),
        currency_id: "BRL",
        picture_url: String(imagemProduto),
      };
    });

    // 3. Cria a preferência de checkout com os itens reais e formatados
    const result = await preference.create({
      body: {
        items: itensMercadoPago,
        back_urls: {
          success: "http://localhost:5173/sucesso",
          failure: "http://localhost:5173/erro",
          pending: "http://localhost:5173/pendente",
        },
        auto_return: "approved",
      },
    });

    // 4. Devolve o link do checkout para o Frontend redirecionar
    return res.json({
      init_point: result.init_point,
    });

  } catch (error) {
    console.error("ERRO COMPLETO MP:", error);
    console.error("DETALHE DO ERRO:", error?.cause);

    return res.status(500).json({
      error: "Erro interno no checkout do Mercado Pago",
      detalhe: error.message,
    });
  }
});

module.exports = router;