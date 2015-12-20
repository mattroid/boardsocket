/* global io */
import React from 'react'
import ReactDOM from 'react-dom'

import Board from './components/Board'

require('./index.css')

var socket = io.connect()

var board = []
var connected = false
var playerNum = 0

socket.on('disconnect', () => {
  connected = false
})

socket.on('connect', () => {
  connected = true
  renderApp();
})

socket.on('set_player_num',(num)=>{
  playerNum = num
})

socket.on('board', (incoming_board, x, y) => {
  console.log('board', incoming_board, x, y)
  if (x === undefined && y === undefined){
    board = incoming_board
  }else{
    board[x][y] = incoming_board
  }
  renderApp();
})

function onClick(x,y,playerNum){
  socket.emit('click', x, y, playerNum)
}

function renderApp(){
  ReactDOM.render(<Board onClick={onClick} connected={connected} board={board} playerNum={playerNum}></Board>, document.getElementById('app') )
}
