import { useState } from "react";
import { supabase } from "../../config/supabase";

import {
  BiStore,
  BiSearch,
  BiCurrentLocation,
  BiImageAdd,
  BiCamera,
  BiSave,
  BiStar,
} from "react-icons/bi";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";

function AtualizarMapa({ posicao }) {
  const map = useMap();

  map.setView(posicao, 15);

  return null;
}

function CadEstabelecimento() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [imagem, setImagem] = useState(null);

  const [posicao, setPosicao] = useState([-12.9386, -38.4319]);

  const [mostrarPopup, setMostrarPopup] = useState(false);

  async function buscarCep() {
    if (!cep) return;

    try {
      // VIA CEP
      const respostaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      const dadosCep = await respostaCep.json();

      if (dadosCep.erro) {
        alert("CEP inválido");

        return;
      }

      const enderecoCompleto = `
        ${dadosCep.logradouro},
        ${dadosCep.localidade},
        ${dadosCep.uf},
        Brasil
      `;

      // NOMINATIM
      const respostaMapa = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoCompleto)}`
      );

      const dadosMapa = await respostaMapa.json();

      if (dadosMapa.length > 0) {
        const latitude = parseFloat(dadosMapa[0].lat);

        const longitude = parseFloat(dadosMapa[0].lon);

        setPosicao([latitude, longitude]);

        setMostrarPopup(true);

        setEndereco(dadosCep.logradouro);

        setCidade(dadosCep.localidade);
      } else {
        alert("Localização não encontrada");
      }
    } catch (erro) {
      console.log(erro);

      alert("Erro ao buscar CEP");
    }
  }

  async function salvarEstabelecimento() {
    try {
      let imagemUrl = "";

      // UPLOAD IMAGEM
      if (imagem) {
        const nomeArquivo = `${Date.now()}-${imagem.name}`;

        const { error: erroUpload } = await supabase.storage
          .from("estabelecimentos")
          .upload(nomeArquivo, imagem);

        if (erroUpload) {
          console.log("UPLOAD:", erroUpload);

          alert("Erro no upload da imagem");

          return;
        }

        const { data } = supabase.storage
          .from("estabelecimentos")
          .getPublicUrl(nomeArquivo);

        imagemUrl = data.publicUrl;
      }

      // INSERT
      const { error } = await supabase.from("estabelecimentos").insert([
        {
          nome,
          descricao,
          categoria,
          endereco,
          cidade,
          cep,
          latitude: posicao[0],
          longitude: posicao[1],
          imagem_url: imagemUrl,
        },
      ]);

      if (error) {
        console.log("INSERT:", error);

        alert("Erro ao salvar");

        return;
      }

      alert("Estabelecimento cadastrado!");
    } catch (err) {
      console.log(err);

      alert("Erro inesperado");
    }
  }

  return (
    <div className="pt-28 px-6 pb-20 bg-[#070014] min-h-screen text-white">
      {/* TÍTULO */}
      <div className="flex items-center gap-2 mb-6">
        <BiStore className="text-3xl" />

        <h2 className="text-3xl font-bold">Cadastro de Estabelecimento</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* FORM */}
        <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
          {/* NOME */}
          <input
            placeholder="Nome da loja"
            className="w-full p-3 mb-3 border rounded"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          {/* DESCRIÇÃO */}
          <textarea
            placeholder="Descrição da loja"
            className="w-full p-3 mb-3 border rounded"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          {/* CATEGORIA */}
          <select
            className="w-full p-3 mb-3 border rounded"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Selecione a categoria</option>

            <option>Restaurante</option>

            <option>Lanchonete</option>

            <option>Mercado</option>

            <option>Farmácia</option>

            <option>Loja</option>

            <option>Serviços</option>
          </select>

          {/* ENDEREÇO */}
          <input
            placeholder="Endereço"
            className="w-full p-3 mb-3 border rounded"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />

          {/* CIDADE */}
          <input
            placeholder="Cidade"
            className="w-full p-3 mb-3 border rounded"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />

          {/* CEP */}
          <input
            placeholder="CEP"
            className="w-full p-3 mb-3 border rounded"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />

          {/* BOTÕES */}
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={buscarCep}
              className="flex-1 bg-indigo-500 text-white p-2 rounded"
            >
              <div className="flex items-center justify-center gap-2">
                <BiSearch />
                Buscar
              </div>
            </button>

            <button
              type="button"
              className="flex-1 bg-emerald-500 text-white p-2 rounded"
            >
              <div className="flex items-center justify-center gap-2">
                <BiCurrentLocation />
                GPS
              </div>
            </button>
          </div>

          {/* UPLOAD */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-semibold mb-2">
              <BiImageAdd />
              Foto da loja
            </label>

            <label
              className="
                flex items-center justify-center
                w-full aspect-square max-w-[250px]
                border-2 border-dashed border-gray-300
                rounded-xl cursor-pointer
                hover:border-purple-500
                hover:bg-purple-50
                transition overflow-hidden
              "
            >
              <div className="flex flex-col items-center justify-center text-gray-500 text-sm text-center px-2">
                <BiCamera className="text-4xl mb-2" />

                <p className="font-medium">Foto da sua loja</p>

                <p className="text-xs text-gray-400 mt-1">
                  Formato quadrado recomendado
                </p>
              </div>

              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setImagem(e.target.files[0])}
              />
            </label>
          </div>

          {/* BOTÃO SALVAR */}
          <button
            type="button"
            onClick={salvarEstabelecimento}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
          >
            <div className="flex items-center justify-center gap-2">
              <BiSave />
              Salvar Estabelecimento
            </div>
          </button>
        </div>

        {/* MAPA + PREVIEW */}
        <div className="bg-white p-4 rounded-2xl shadow-lg text-black">
          {/* MAPA */}
          <div className="h-[300px] mb-4 rounded-xl overflow-hidden">
            <MapContainer
              center={posicao}
              zoom={15}
              scrollWheelZoom={true}
              className="h-full w-full"
            >
              <AtualizarMapa posicao={posicao} />

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={posicao}>
                {mostrarPopup && (
                  <Popup>
                    <strong>{nome || "Novo estabelecimento"}</strong>

                    <br />

                    {endereco || "Endereço"}
                  </Popup>
                )}
              </Marker>
            </MapContainer>
          </div>

          {/* PREVIEW */}
          <div
            className="
              bg-gray-100 rounded-2xl shadow-lg
              overflow-hidden
              w-full max-w-[250px]
            "
          >
            {/* IMAGEM */}
            <div className="w-full h-[180px] bg-gray-300 flex items-center justify-center overflow-hidden">
              {imagem ? (
                <img
                  src={URL.createObjectURL(imagem)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-600">
                  <BiImageAdd />
                  Preview da imagem
                </div>
              )}
            </div>

            {/* INFOS */}
            <div className="p-4">
              <div>
                <div className="flex items-center justify-between mb-1 gap-2">
                  <h3 className="font-bold text-base break-words">
                    {nome || "Nome da loja"}
                  </h3>

                  <span className="text-yellow-500 font-semibold text-sm flex items-center gap-1 whitespace-nowrap">
                    <BiStar />
                    0.0
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-2 break-words">
                  {categoria || "Categoria"}
                </p>

                <p className="text-xs text-gray-500 break-words">
                  {descricao || "Descrição da loja..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadEstabelecimento;
