import express from 'express'
import http from 'http'
import sio from 'socket.io'
import browserify from 'browserify-middleware'
import babelify from 'babelify'
import css from 'browserify-css'

const app = express()
const server = http.createServer(app)
const io = sio.listen(server)
const port = process.env.PORT || 8000


// build server-side representation of current board (10x10 of 0's)
var row = []
for (var i=10;i--;i){ row.push(0) }
var board = row.map(() => { return row.slice() })

app.get('/bundle.js', browserify(__dirname + '/index.js'))

app.use(express.static(__dirname + '/../public'))

io.on('connection', (socket) => {
  socket.emit('board', board)

  socket.on('click', (x,y) => {
    console.log('click', x, y, socket.id)
  })
})

console.log('Webserver running on http://localhost:' + port)
server.listen(port)
