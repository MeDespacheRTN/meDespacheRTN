import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Corrige ícone do marker
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map({ estabelecimentos }) {
  const position = [-12.938416, -38.387138];

  return (
    <MapContainer
      center={position}
      zoom={17}
      className="w-full h-full rounded-2xl"
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* MARKERS DOS ESTABELECIMENTOS */}
      {estabelecimentos?.map((estabelecimento) => (
        <Marker
          key={estabelecimento.id}
          position={[estabelecimento.latitude, estabelecimento.longitude]}
        >
          <Popup>
            <div className="min-w-[180px]">
              {estabelecimento.imagem_url && (
                <img
                  src={estabelecimento.imagem_url}
                  alt={estabelecimento.nome}
                  className="w-full h-24 object-cover rounded mb-2"
                />
              )}

              <h3 className="font-bold">{estabelecimento.nome}</h3>

              <p className="text-sm">{estabelecimento.categoria}</p>

              <p className="text-xs text-gray-500">
                {estabelecimento.endereco}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
