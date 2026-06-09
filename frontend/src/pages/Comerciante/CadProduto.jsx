import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "../../config/supabase";

import {
  BiPackage,
  BiCamera,
  BiSave,
  BiArrowBack,
} from "react-icons/bi";

function CadProduto() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [imagem, setImagem] = useState(null);
  
  const [empresaId, setEmpresaId] = useState("");
  const [usuarioId, setUsuarioId] = useState(""); // 🔥 NOVO: Plano B para o backend

  useEffect(() => {
    const userStr = localStorage.getItem("usuario");
    if (userStr) {
      const user = JSON.parse(userStr);
      setUsuarioId(user.id);
      
      supabase.from("empresas").select("id").eq("usuario_id", user.id).single()
        .then(({ data }) => {
          if (data) setEmpresaId(data.id);
        });
    }
  }, []);

  async function salvarProduto() {
    if (!nome || !preco) {
      alert("Preencha ao menos nome e preço.");
      return;
    }
    
    if (!empresaId && !usuarioId) {
      alert("Erro: Faça login novamente.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("descricao", descricao);
      formData.append("categoria", categoria);
      formData.append("preco", preco.replace(",", ".")); 
      formData.append("estoque", estoque);
      
      // 🔥 ENVIANDO OS DOIS IDS PARA GARANTIR QUE O BACKEND ACHE A LOJA
      formData.append("empresa_id", empresaId); 
      formData.append("usuario_id", usuarioId);
      
      if (imagem) {
        formData.append("imagem", imagem);
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}comerciante/cadastrar-produtos`,
        formData
      );

      alert("Produto cadastrado com sucesso!");

      setNome("");
      setDescricao("");
      setCategoria("");
      setPreco("");
      setEstoque("");
      setImagem(null);
    } catch (err) {
      console.error("Detalhes do erro:", err);
      alert(err.response?.data?.erro || "Erro ao cadastrar produto. Verifique o terminal.");
    }
  }

  const precoFormatado = Number(preco || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="pt-28 px-6 pb-20 bg-[#070014] min-h-screen text-white">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(`/painel-comerciante/${empresaId}`)}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
        >
          <BiArrowBack />
          Voltar
        </button>

        <div className="bg-purple-600 p-3 rounded-xl">
          <BiPackage className="text-3xl" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">Cadastro de Produtos</h1>
          <p className="text-gray-400">Adicione novos produtos ao seu estabelecimento</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
          <input
            type="text"
            placeholder="Nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />

          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full p-3 border rounded mb-4 min-h-[100px]"
          />

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          >
            <option value="">Selecione a categoria</option>
            <option>Bebidas</option>
            <option>Lanches</option>
            <option>Doces</option>
            <option>Mercado</option>
            <option>Eletrônicos</option>
            <option>Roupas</option>
            <option>Outros</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Preço"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="p-3 border rounded"
            />

            <input
              type="number"
              placeholder="Estoque"
              value={estoque}
              onChange={(e) => setEstoque(e.target.value)}
              className="p-3 border rounded"
            />
          </div>

          <label className="mt-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-purple-500 transition">
            <BiCamera className="text-4xl mb-2" />
            <span>{imagem ? imagem.name : "Selecionar imagem"}</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setImagem(e.target.files[0])}
            />
          </label>

          <button
            onClick={salvarProduto}
            className="w-full mt-5 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl flex items-center justify-center gap-2"
          >
            <BiSave />
            Salvar Produto
          </button>
        </div>

        <div className="bg-white text-black rounded-2xl shadow-lg overflow-hidden">
          <div className="h-64 bg-gray-100 flex items-center justify-center">
            {imagem ? (
              <img
                src={URL.createObjectURL(imagem)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <BiPackage className="text-7xl text-gray-400" />
            )}
          </div>

          <div className="p-6">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
              {categoria || "Categoria"}
            </span>

            <h2 className="text-2xl font-bold mt-3">
              {nome || "Nome do Produto"}
            </h2>

            <p className="text-gray-600 mt-2 whitespace-pre-wrap">
              {descricao || "Descrição do produto..."}
            </p>

            <div className="mt-5 flex justify-between items-center">
              <div className="flex items-center gap-2 text-green-600 font-bold text-2xl">
                {precoFormatado}
              </div>

              <span className="bg-gray-200 px-3 py-1 rounded-lg font-semibold">
                Estoque: {estoque || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadProduto;