import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"

// Fix default marker icon path
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
})

export default function LiveMap() {
  // Sample truck location (Dhaka)
  const truckPosition = [23.8103, 90.4125]

  return (
    <div className="h-[80vh] w-full rounded-lg overflow-hidden shadow">
      <MapContainer
        center={truckPosition}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        <Marker position={truckPosition}>
          <Popup>🚛 Truck-102</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
