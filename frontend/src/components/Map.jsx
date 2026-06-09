import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ==========================================
// CORREÇÃO DO ÍCONE PADRÃO DO LEAFLET
// O React costuma bugar o ícone padrão, isso resolve:
// ==========================================
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function Map({ estabelecimentos }) {
  // Centro padrão do mapa (Coordenadas de Salvador - BA baseadas no seu banco)
  const defaultCenter = [-12.9386, -38.4319];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", zIndex: 1 }} // zIndex 1 para não sobrepor seus modais
    >
      {/* CAMADA DE VISUAL DO MAPA (Usando OpenStreetMap que é gratuito) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* RENDERIZANDO OS ESTABELECIMENTOS DO SEU BANCO DE DADOS */}
      {estabelecimentos && estabelecimentos.length > 0 ? (
        estabelecimentos.map((local) => (
          <Marker 
            key={local.id} 
            position={[local.latitude, local.longitude]}
          >
            {/* O POPUP QUE ABRE QUANDO CLICA NO ÍCONE DO MAPA */}
            <Popup>
              <div className="flex flex-col gap-1 min-w-[150px]">
                <h3 className="font-bold text-lg text-purple-700 m-0">
                  {local.nome}
                </h3>
                <span className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-1 rounded-md w-fit">
                  {local.categoria || "Sem Categoria"}
                </span>
                <p className="text-sm text-gray-600 mt-1 m-0">
                  {local.endereco || "Endereço não informado"}
                </p>
                <a 
                  href={`/loja/${local.id}`} 
                  className="mt-2 bg-purple-600 text-white text-center text-sm py-1.5 rounded-lg hover:bg-purple-700 transition"
                >
                  Visitar Loja
                </a>
              </div>
            </Popup>
          </Marker>
        ))
      ) : null}
    </MapContainer>
  );
}