import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: "*" }
})

// When frontend connects
io.on("connection", (socket) => {
  console.log("Client connected")

  // Send fake moving GPS every 3 seconds
  let lat = 23.8103
  let lng = 90.4125

  const interval = setInterval(() => {
    lat += 0.001
    lng += 0.001

    socket.emit("location_update", {
      truck_id: "T-102",
      lat,
      lng
    })
  }, 3000)

  socket.on("disconnect", () => {
    clearInterval(interval)
    console.log("Client disconnected")
  })
})

server.listen(5000, () => {
  console.log("WebSocket server running on port 5000")
})
