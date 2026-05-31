import { useState } from "react";

export default function PagamentoPage() {
  const [loading, setLoading] = useState(false);
  const [pedido, setPedido] = useState(null);

  const itens = [
    { id: 1, nome: "Plano Bronze", preco: 25 },
    { id: 2, nome: "Plano Prata", preco: 50 },
    { id: 3, nome: "Plano Ouro", preco: 100 },
  ];

  function selecionarItem(item) {
    setPedido(item);
  }

  async function pagar() {
  if (!pedido) return alert("Selecione um item primeiro");

  try {
    setLoading(true);

    const res = await fetch(`${import.meta.env.VITE_API_URL}payment/create-checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valor: pedido.preco,
        descricao: pedido.nome,
      }),
    });

    const data = await res.json();

    console.log("RESPOSTA BACKEND:", data);

    if (!data.init_point) {
      console.error("Erro ao criar pagamento:", data);
      alert("Erro ao iniciar pagamento");
      return;
    }

    window.location.href = data.init_point;

  } catch (err) {
    console.error(err);
    alert("Erro ao iniciar pagamento");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-4">

        <h1 className="text-xl font-bold">Finalizar Pedido</h1>

        {/* lista de itens */}
        <div className="space-y-2">
          <p className="font-medium">Escolha seu plano</p>

          {itens.map((item) => (
            <div
              key={item.id}
              onClick={() => selecionarItem(item)}
              className={`p-3 rounded-xl border cursor-pointer flex justify-between ${
                pedido?.id === item.id
                  ? "border-purple-500 bg-purple-100"
                  : "border-gray-200"
              }`}
            >
              <span>{item.nome}</span>
              <span>R$ {item.preco}</span>
            </div>
          ))}
        </div>

        {/* resumo */}
        {pedido && (
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="font-medium">Resumo</p>
            <p className="text-sm text-gray-600">{pedido.nome}</p>
            <p className="mt-2 font-bold text-lg">R$ {pedido.preco}</p>
          </div>
        )}

        {/* botão */}
        <button
          onClick={pagar}
          disabled={loading}
          className="w-full bg-purple-500 text-white py-3 rounded-xl font-medium hover:bg-purple-600 transition"
        >
          {loading ? "Redirecionando..." : "Pagar com Mercado Pago"}
        </button>

      </div>
    </div>
  );
}