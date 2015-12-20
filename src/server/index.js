import fs from 'fs'
import express from 'express'
import http from 'http'
import sio from 'socket.io'
import browserify from 'browserify-middleware'

const app = express()
const server = http.createServer(app)
const io = sio.listen(server)
process.env.PORT = process.env.PORT || 8000

// MODEL - these could be stored persistantly...

// build server-side representation of current board (10x10 of 0's)
const board = new Array(10)
for (let x = 10; x--; x) {
  board[x] = new Array(10)
  for (let y = 10; y--; y) {
    board[x][y] = 0
  }
}

// map of socket ID to fingerprint
var players = {}

// map of fingerprint to player-data
var player_info = {}

// /MODEL

// isomorphic route
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Board from '../components/Board'
const template = fs.readFileSync(__dirname + '/../../public/index.html')
app.get('/', (req, res) => {
  var t = template.toString()
  var markup = ReactDOMServer.renderToString(<Board />)
  res.send(t.replace('<div id="app"></div>', `<div id="app">${markup}</div>`))
})

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

console.log('Server running on http://localhost:' + process.env.PORT)
server.listen(process.env.PORT)
