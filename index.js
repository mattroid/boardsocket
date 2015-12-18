
var express = require('express')
var http = require('http')
var app = express()
var server = http.createServer(app)
var io = require('socket.io').listen(server)

// build server-side representation of current board (100x100 of 0's)
var row = []
for (var i=10;i--;i){ row.push(0) }
var board = row.map(function(){ return row.slice() })
board[0][0] = 1
var player_position = {x:0, y:0}

function updatePlayer(x, y){
	console.log('click', x, y)
	board[player_position.x][player_position.y] = 0
	board[x][y] = 1
	io.sockets.emit('board', 0, player_position.x, player_position.y)
	io.sockets.emit('board', 1, x, y)
	player_position.x = x
	player_position.y = y
}

app.use(express.static('site'))

io.on('connection', function (socket) {
  socket.emit('board', board)
  socket.on('click', updatePlayer)
})

var port = process.env.PORT || 8000
console.log('Webserver running on http://localhost:' + port)
server.listen(port)
