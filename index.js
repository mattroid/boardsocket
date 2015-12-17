
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

app.use(express.static('site'))

io.on('connection', function (socket) {
  socket.emit('board', board)
  socket.on('click', function(x, y, value){
	board = row.map(function(){ return row.slice() })
  	board[x][y] = 1
  	socket.emit('board', board)
  	socket.broadcast.emit('board', board)
  })
})

var port = process.env.PORT || 8000
console.log('Webserver running on http://localhost:' + port)
server.listen(port)
