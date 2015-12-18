
var express = require('express')
var http = require('http')
var app = express()
var server = http.createServer(app)
var io = require('socket.io').listen(server)

// build server-side representation of current board (100x100 of 0's)
var row = []
for (var i=10;i--;i){ row.push(0) }
var board = row.map(function(){ return row.slice() })
//board[0][0] = 1
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

app.use(express.static('site'))

io.on('connection', function (socket) {
  socket.emit('board', board)
    var num = playerNumbers.pop()
    socket.emit('set_player_num', num)
    socket.on('click', updatePlayer)
    socket.on('disconnect', function() {
	playerNumbers.push(num);
    });
})

var port = process.env.PORT || 8000
console.log('Webserver running on http://localhost:' + port)
server.listen(port)
