import express from 'express'
import http from 'http'
import sio from 'socket.io'
import browserify from 'browserify-middleware'

const app = express()
const server = http.createServer(app)
const io = sio.listen(server)
const port = process.env.PORT || 8000

// MODEL - these could be stored persistantly...

// build server-side representation of current board (10x10 of 0's)
const board = Array.apply(null, Array(10)).map(Number.prototype.valueOf, 0).map((v, i, row) => { return row.slice() })

// map of socket ID to fingerprint
var players = {}

// map of fingerprint to player-data
var player_info = {}

// /MODEL

app.get('/bundle.js', browserify(__dirname + '/../index.js'))
app.use(express.static(__dirname + '/../../public'))

io.on('connection', (socket) => {
  socket.emit('board', board)

  socket.on('fingerprint', (id, fn) => {
    players[socket.id] = id
    if (!player_info[id]) {
      player_info[id] = {
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        position: [0, 0]
      }
    }
    var p = player_info[id]
    fn(p)
    board[p.position[0]][p.position[1]] = p
    io.sockets.emit('board', p, p.position[0], p.position[1])
  })

  socket.on('click', (x, y) => {
    var player = player_info[players[socket.id]]
    if (board[x][y] === 0) {
      if (player) {
        board[player.position[0]][player.position[1]] = 0
        io.sockets.emit('board', 0, player.position[0], player.position[1])
      }
      player_info[players[socket.id]].position = [x, y]
      io.sockets.emit('board', player_info[players[socket.id]], x, y)
    }
  })

  socket.on('disconnect', () => {
    delete players[socket.id]
  })
})

console.log('Server running on http://localhost:' + port)
server.listen(port)
