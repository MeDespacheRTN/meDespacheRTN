import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  // Quando o app abre, verifica se tem usuário e carrega o carrinho certo
  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioLogado) {
      carregarCarrinhoDoBanco(usuarioLogado.id);
    } else {
      const salvo = localStorage.getItem("carrinho");
      if (salvo) setCarrinho(JSON.parse(salvo));
    }
  }, []);

  // Salva no localStorage APENAS se for visitante (não logado)
  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioLogado) {
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }
  }, [carrinho]);

  async function carregarCarrinhoDoBanco(usuarioId) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}carrinho/${usuarioId}`);
      if (response.ok) {
        const data = await response.json();
        // Mapeia os dados do banco para o formato visual da tela
        setCarrinho(data.map(item => ({ ...item.produtos, quantidade: item.quantidade })));
      }
    } catch (e) {
      console.error("Erro ao carregar carrinho do banco:", e);
    }
  }

  const adicionarAoCarrinho = async (produto) => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

    // Atualiza a tela imediatamente (para não deixar o cliente esperando)
    setCarrinho((prev) => {
      const existe = prev.find((item) => item.id === produto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });

    // Se estiver logado, manda a requisição silenciosamente pro banco
    if (usuarioLogado) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}carrinho/adicionar`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario_id: usuarioLogado.id, produto_id: produto.id })
        });
      } catch (error) {
        console.error("Erro ao salvar no banco:", error);
      }
    }
  };

  const diminuirQuantidade = (produtoId) => {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === produtoId
          ? { ...item, quantidade: Math.max(1, item.quantidade - 1) }
          : item
      )
    );
  };

  const removerDoCarrinho = (produtoId) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== produtoId));
  };

  const limparCarrinho = () => setCarrinho([]);

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const valorTotal = carrinho.reduce((acc, item) => acc + (Number(item.preco) * item.quantidade), 0);

  return (
    <CartContext.Provider value={{ 
      carrinho, 
      adicionarAoCarrinho, 
      diminuirQuantidade, 
      removerDoCarrinho, 
      limparCarrinho, 
      totalItens, 
      valorTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
}