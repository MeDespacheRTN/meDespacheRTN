import { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";
import { useNavigate } from "react-router-dom";

import {
  BiStore,
  BiSearch,
  BiCamera,
  BiSave,
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

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function AtualizarMapa({ posicao }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(posicao, 15);
    setTimeout(() => map.invalidateSize(), 200);
  }, [posicao]);
  return null;
}

// 🔥 CORREÇÃO: Recebendo o setCep aqui
function SelecionarLocal({ setPosicao, setMostrarPopup, setEndereco, setCidade, setCep }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosicao([lat, lng]);
      setMostrarPopup(true);

      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await res.json();
        if (data.address) {
          setEndereco(data.address.road || "");
          setCidade(data.address.city || data.address.town || data.address.village || "");
          
          // 🔥 PEGANDO O CEP DO MAPA (limpando o traço para ficar só números)
          if (data.address.postcode) {
            const cepEncontrado = data.address.postcode.replace(/\D/g, '');
            setCep(cepEncontrado);
          } else {
            setCep("");
          }
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

  // GUARDA O ID DA EMPRESA
  const [empresaId, setEmpresaId] = useState(null);

  // TRAVA DE SEGURANÇA
  useEffect(() => {
    async function verificarEmpresa() {
      const userStr = localStorage.getItem("usuario");
      
      if (!userStr || userStr === "undefined") {
        localStorage.removeItem("usuario"); 
        navigate("/login");
        return;
      }

      try {
        const user = JSON.parse(userStr);

        const { data: empresaData } = await supabase
          .from("empresas")
          .select("id")
          .eq("usuario_id", user.id)
          .single();

        if (empresaData && empresaData.id) {
          setEmpresaId(empresaData.id);

          const { data: estabData } = await supabase
            .from("estabelecimentos")
            .select("id")
            .eq("empresa_id", empresaData.id)
            .maybeSingle();

          if (estabData) {
            navigate(`/painel-comerciante/${empresaData.id}`);
          }
        }
      } catch (error) {
        console.error("Erro ao analisar o usuário:", error);
        localStorage.removeItem("usuario");
        navigate("/login");
      }
    }

    verificarEmpresa();
  }, [navigate]);

  async function buscarCep() {
    if (!cep) return;

    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      alert("Por favor, digite um CEP válido contendo 8 números.");
      return;
    }

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const dados = await res.json();

      if (dados.erro) {
        alert("CEP não encontrado.");
        return;
      }

      const enderecoCompleto = `${dados.logradouro}, ${dados.localidade}, ${dados.uf}, Brasil`;

      const geo = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoCompleto)}`);
      const geoData = await geo.json();

      if (geoData.length > 0) {
        setPosicao([parseFloat(geoData[0].lat), parseFloat(geoData[0].lon)]);
        setEndereco(dados.logradouro);
        setCidade(dados.localidade);
        setMostrarPopup(true);
      } else {
        alert("Não foi possível encontrar este endereço no mapa.");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar o CEP. Verifique sua conexão e tente novamente.");
    }
  }

  async function salvarEstabelecimento() {
    if (!empresaId) {
      alert("Erro de autenticação. Faça login novamente.");
      return;
    }

    let imagemUrl = "";

    if (imagem) {
      const nomeArquivo = `${Date.now()}-${imagem.name}`;
      await supabase.storage.from("estabelecimentos").upload(nomeArquivo, imagem);
      const { data } = supabase.storage.from("estabelecimentos").getPublicUrl(nomeArquivo);
      imagemUrl = data.publicUrl;
    }

    const { error } = await supabase.from("estabelecimentos").insert([
      {
        empresa_id: empresaId, 
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
      alert("Erro ao salvar: " + error.message);
    } else {
      alert("Estabelecimento salvo no mapa!");
      navigate(`/painel-comerciante/${empresaId}`); 
    }
  }

  return (
    <div className="pt-28 px-6 pb-20 bg-[#070014] min-h-screen text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/home")}
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
              <h2 className="text-2xl font-bold">Cadastro de Estabelecimento</h2>
              <p className="text-sm text-gray-400">Adicione seu comércio no mapa</p>
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
            <option>Padaria</option>
            <option>Supermercado</option>
            <option>Farmácia</option>
            <option>Roupas</option>
            <option>Eletrônicos</option>
            <option>Autopeças</option>
            <option>Outros</option>
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
          
          {/* Campo CEP */}
          <div className="flex gap-2 mb-3">
            <input
              placeholder="Digite o CEP (somente números)"
              className="w-full p-3 border rounded"
              maxLength={8}
              value={cep} // 🔥 ADICIONADO PARA MOSTRAR NA TELA O CEP VINDO DO MAPA
              onChange={(e) => setCep(e.target.value)}
            />
            <button
              onClick={buscarCep}
              className="bg-indigo-500 text-white px-4 rounded font-bold hover:bg-indigo-600 transition flex items-center justify-center gap-1"
            >
              <BiSearch /> Buscar
            </button>
          </div>

          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer hover:border-purple-500 mt-2">
            <BiCamera className="text-3xl mb-2" />
            <span>Adicionar foto da faixada</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setImagem(e.target.files[0])}
            />
          </label>

          <button
            onClick={salvarEstabelecimento}
            className="w-full bg-purple-600 text-white p-3 rounded mt-4 flex items-center justify-center gap-2 font-bold hover:bg-purple-700 transition"
          >
            <BiSave /> Salvar e Ir para o Painel
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
                setCep={setCep} // 🔥 ENVIANDO O STATE DO CEP PARA O MAPA
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
                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                          />
                        ) : (
                          <div style={{ textAlign: "center", paddingTop: "40px", color: "gray" }}>Sem imagem</div>
                        )}
                      </div>
                      <strong>{nome || "Seu estabelecimento"}</strong>
                      <br />
                      <small className="text-gray-500">{categoria}</small>
                      <p style={{ fontSize: "12px", marginTop: "4px" }}>{descricao || "Descrição..."}</p>
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