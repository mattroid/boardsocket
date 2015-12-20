/* global localStorage  */
import React from 'react'
import ReactDOM from 'react-dom'
import Fingerprint from 'fingerprintjs2'
import io from 'socket.io-client'

import Board from './components/Board'

const socket = io(window.location.origin)

// stored fingerprint
if (!localStorage.fingerprint) {
  new Fingerprint().get((result, components) => {
    localStorage.fingerprint = result
    socket.emit('fingerprint', localStorage.fingerprint, onPlayer)
  })
} else {
  socket.emit('fingerprint', localStorage.fingerprint, onPlayer)
}

function showBoard () {
  ReactDOM.render(<Board onClick={onClick} player={player} board={board} />, document.getElementById('app'))
}

function onClick (x, y) {
  socket.emit('click', x, y)
}

function onPlayer (value) {
  player = value
  showBoard(player, board)
}

function onBoard (value, x, y) {
  if (typeof x === 'undefined') {
    board = value
  } else {
    board[x][y] = value
  }
  showBoard(player, board)
}

socket.on('player', onPlayer)
socket.on('board', onBoard)

var player = {}
var board = []
showBoard(player, board)
