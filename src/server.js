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

var players = {'1':{x:0,y:0},'2':{x:1,y:1},'3':{x:2,y:2}}
var playerNumbers = [1,2,3]

function updatePlayer(x, y, playerNum){
  if(playerNum==0) return;
  console.log('click', x, y)
  board[players[playerNum].x][players[playerNum].y] = 0
  board[x][y] = playerNum
  io.sockets.emit('board', 0, players[playerNum].x, players[playerNum].y)
  io.sockets.emit('board', playerNum, x, y)
  players[playerNum].x = x
  players[playerNum].y = y
}

app.get('/bundle.js', browserify(__dirname + '/index.js'))

app.use(express.static(__dirname + '/../public'))

io.on('connection', (socket) => {
  socket.emit('board', board)
  var num = playerNumbers.pop()
  socket.emit('set_player_num', num)
  socket.on('click', updatePlayer)
  socket.on('disconnect', function() {
    playerNumbers.push(num);
  });
})

console.log('Webserver running on http://localhost:' + port)
server.listen(port)
