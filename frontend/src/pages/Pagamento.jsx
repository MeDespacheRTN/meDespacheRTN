import { useState } from "react";
import { BiCreditCard, BiCheckCircle, BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function PagamentoPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [pedido, setPedido] = useState(null);

  const itens = [
    { id: 1, nome: "Plano Bronze", preco: 19.90 },
    { id: 2, nome: "Plano Prata", preco: 29.90 },
    { id: 3, nome: "Plano Ouro", preco: 39.90 },
  ];

  function selecionarItem(item) {
    setPedido(item);
  }

  async function pagar() {
    if (!pedido) {
      return alert("Selecione um plano primeiro");
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}payment/create-checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            valor: pedido.preco,
            descricao: pedido.nome,
          }),
        }
      );

      const data = await res.json();

      if (!data.init_point) {
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
    <div className="min-h-screen bg-[#070014] text-white p-6">

      {/* VOLTAR */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition mb-8"
      >
        <BiArrowBack />
        Voltar
      </button>

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">

          <div className="bg-purple-600 p-4 rounded-2xl">
            <BiCreditCard className="text-4xl text-white" />
          </div>

          <div>
            <h1 className="text-4xl font-black">
              Finalizar Assinatura
            </h1>

            <p className="text-gray-400 mt-1">
              Escolha o plano ideal para destacar seu comércio.
            </p>
          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* PLANOS */}
          <div className="bg-[#120124] rounded-3xl p-6 border border-white/10">

            <h2 className="text-2xl font-bold mb-6">
              Escolha seu Plano
            </h2>

            <div className="space-y-4">

              {itens.map((item) => (
                <div
                  key={item.id}
                  onClick={() => selecionarItem(item)}
                  className={`cursor-pointer rounded-2xl p-5 transition border ${
                    pedido?.id === item.id
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-white/10 hover:border-purple-500"
                  }`}
                >
                  <div className="flex justify-between items-center">

                    <div>
                      <h3 className="text-xl font-bold">
                        {item.nome}
                      </h3>

                      <p className="text-gray-400 text-sm">
                        Destaque seu estabelecimento
                      </p>
                    </div>

                    <span className="text-2xl font-black text-green-400">
                      R$ {item.preco}
                    </span>

                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* RESUMO */}
          <div className="bg-[#120124] rounded-3xl p-6 border border-white/10">

            <h2 className="text-2xl font-bold mb-6">
              Resumo do Pedido
            </h2>

            {pedido ? (
              <>
                <div className="bg-white/5 rounded-2xl p-5">

                  <div className="flex items-center gap-3 mb-4">
                    <BiCheckCircle className="text-green-400 text-2xl" />

                    <span className="font-semibold">
                      Plano Selecionado
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold">
                    {pedido.nome}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    Pagamento único via Mercado Pago.
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-4">

                    <p className="text-gray-400">
                      Total
                    </p>

                    <h2 className="text-5xl font-black text-green-400">
                      R$ {pedido.preco}
                    </h2>

                  </div>

                </div>

                <button
                  onClick={pagar}
                  disabled={loading}
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700 transition py-4 rounded-2xl font-bold text-lg shadow-lg shadow-purple-500/20"
                >
                  {loading
                    ? "Redirecionando..."
                    : "Pagar com Mercado Pago"}
                </button>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Selecione um plano para continuar
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}