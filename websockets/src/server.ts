import express from 'express'
import { Server } from 'http'
import { Server as ioServer } from 'socket.io'

const app = express()
const server = new Server(app)
const io = new ioServer(server)
const port = 3006

app.use(express.static('../'))

app.get('./', (req, res) => res.redirect('index.html'))

server.listen(port, () =>
  console.log(`Server has been started on port ${port}!`)
)

io.on('connection', (socket) =>
  console.log(`Connection has been established on ${socket}`)
)
