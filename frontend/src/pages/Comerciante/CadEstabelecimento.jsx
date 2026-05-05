import { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";
import { useNavigate } from "react-router-dom";

import {
  BiStore,
  BiSearch,
  BiCamera,
  BiSave,
  BiStar,
  BiArrowBack,
} from "react-icons/bi";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* 🔥 ÍCONE CORRIGIDO */
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

/* 🔥 MAPA */
function AtualizarMapa({ posicao }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(posicao, 15);
    setTimeout(() => map.invalidateSize(), 200);
  }, [posicao]);

  return null;
}

/* 🔥 CLICK */
function SelecionarLocal({
  setPosicao,
  setMostrarPopup,
  setEndereco,
  setCidade,
}) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      setPosicao([lat, lng]);
      setMostrarPopup(true);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();

        if (data.address) {
          setEndereco(data.address.road || "");
          setCidade(
            data.address.city ||
              data.address.town ||
              data.address.village ||
              ""
          );
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return null;
}

function CadEstabelecimento() {
  const navigate = useNavigate();

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

    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await res.json();

    const enderecoCompleto = `${dados.logradouro}, ${dados.localidade}, ${dados.uf}, Brasil`;

    const geo = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        enderecoCompleto
      )}`
    );

    const geoData = await geo.json();

    if (geoData.length > 0) {
      setPosicao([
        parseFloat(geoData[0].lat),
        parseFloat(geoData[0].lon),
      ]);

      setEndereco(dados.logradouro);
      setCidade(dados.localidade);
      setMostrarPopup(true);
    }
  }

  async function salvarEstabelecimento() {
    let imagemUrl = "";

    if (imagem) {
      const nomeArquivo = `${Date.now()}-${imagem.name}`;

      await supabase.storage
        .from("estabelecimentos")
        .upload(nomeArquivo, imagem);

      const { data } = supabase.storage
        .from("estabelecimentos")
        .getPublicUrl(nomeArquivo);

      imagemUrl = data.publicUrl;
    }

    await supabase.from("estabelecimentos").insert([
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

    alert("Estabelecimento cadastrado!");
  }

  return (
    <div className="pt-28 px-6 pb-20 bg-[#070014] min-h-screen text-white">

      {/* 🔥 HEADER COM BOTÃO VOLTAR */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">

          <button
            onClick={() => navigate("/painel-comerciante")}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition"
          >
            <BiArrowBack className="text-xl" />
            <span className="text-sm">Voltar</span>
          </button>

          <div className="flex items-center gap-3 ml-2">
            <div className="bg-purple-600 p-2 rounded-xl shadow">
              <BiStore className="text-2xl text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Cadastro de Estabelecimento
              </h2>
              <p className="text-sm text-gray-400">
                Adicione seu comércio no mapa
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* FORM */}
        <div className="bg-white text-black p-6 rounded-2xl shadow-lg">

          <input
            placeholder="Nome da loja"
            className="w-full p-3 mb-3 border rounded"
            onChange={(e) => setNome(e.target.value)}
          />

          <textarea
            placeholder="Descrição"
            className="w-full p-3 mb-3 border rounded"
            onChange={(e) => setDescricao(e.target.value)}
          />

          <select
            className="w-full p-3 mb-3 border rounded"
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Categoria</option>
            <option>Restaurante</option>
            <option>Lanchonete</option>
          </select>

          <input
            placeholder="Endereço"
            className="w-full p-3 mb-3 border rounded"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />

          <input
            placeholder="Cidade"
            className="w-full p-3 mb-3 border rounded"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />

          <input
            placeholder="CEP"
            className="w-full p-3 mb-3 border rounded"
            onChange={(e) => setCep(e.target.value)}
          />

          <button
            onClick={buscarCep}
            className="w-full bg-indigo-500 text-white p-2 rounded mb-3"
          >
            <BiSearch className="inline mr-1" />
            Buscar
          </button>

          {/* UPLOAD */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer hover:border-purple-500">
            <BiCamera className="text-3xl mb-2" />
            <span>Adicionar foto</span>

            <input
              type="file"
              className="hidden"
              onChange={(e) => setImagem(e.target.files[0])}
            />
          </label>

          <button
            onClick={salvarEstabelecimento}
            className="w-full bg-purple-600 text-white p-3 rounded mt-4 flex items-center justify-center gap-2"
          >
            <BiSave />
            Salvar
          </button>
        </div>

        {/* MAPA */}
        <div className="bg-white p-4 rounded-2xl text-black">
          <div className="h-[70vh] w-full rounded-xl overflow-hidden">
            <MapContainer center={posicao} zoom={15} className="h-full w-full">
              <AtualizarMapa posicao={posicao} />

              <SelecionarLocal
                setPosicao={setPosicao}
                setMostrarPopup={setMostrarPopup}
                setEndereco={setEndereco}
                setCidade={setCidade}
              />

              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Marker position={posicao} icon={icon}>
                {mostrarPopup && (
                  <Popup>
                    <div style={{ width: "200px" }}>
                      <div style={{ height: "120px", marginBottom: "8px" }}>
                        {imagem ? (
                          <img
                            src={URL.createObjectURL(imagem)}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        ) : (
                          <div style={{ textAlign: "center" }}>
                            Sem imagem
                          </div>
                        )}
                      </div>

                      <strong>{nome || "Novo estabelecimento"}</strong>
                      <br />
                      <small>{categoria}</small>
                      <p style={{ fontSize: "12px" }}>
                        {descricao || "Descrição..."}
                      </p>
                    </div>
                  </Popup>
                )}
              </Marker>
            </MapContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CadEstabelecimento;