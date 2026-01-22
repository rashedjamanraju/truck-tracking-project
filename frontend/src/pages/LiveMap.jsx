import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import L from "leaflet"

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
})

// Connect to backend WebSocket
const socket = io("http://localhost:5000")

export default function LiveMap() {
  const [position, setPosition] = useState([23.8103, 90.4125])

  useEffect(() => {
    socket.on("location_update", (data) => {
      setPosition([data.lat, data.lng])
    })

    return () => socket.off("location_update")
  }, [])

  return (
    <div className="h-[80vh] w-full rounded-lg overflow-hidden shadow">
      <MapContainer center={position} zoom={13} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={position}>
          <Popup>🚛 Truck Live</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
