/**
 * Entry-point for client-side
 */

/* global localStorage  */
import React from 'react'
import ReactDOM from 'react-dom'
import Fingerprint from 'fingerprintjs2'
import io from 'socket.io-client'

import {board, player_info} from './data'
import Board from './components/Board'

const socket = io(window.location.origin)
var player = {}

// stored fingerprint
if (!localStorage.fingerprint) {
  new Fingerprint().get((result, components) => {
    localStorage.fingerprint = result
    onPlayer(player_info[localStorage.fingerprint])
    socket.emit('fingerprint', localStorage.fingerprint, onPlayer)
  })
} else {
  onPlayer(player_info[localStorage.fingerprint])
  socket.emit('fingerprint', localStorage.fingerprint, onPlayer)
}

// top-level render function
function showBoard () {
  ReactDOM.render(<Board onClick={onClick} player={player} board={board} />, document.getElementById('app'))
}

// handle user-click
function onClick (x, y) {
  socket.emit('click', x, y)
}

// update player
function onPlayer (value) {
  player = value
  showBoard(player, board)
}

// allow socket to overwrite value
function onBoard (value, x, y) {
  if (typeof x === 'undefined') {
    for (let x = 10; x--; x) {
      board[x] = new Array(10)
      for (let y = 10; y--; y) {
        board[x][y] = value[x][y]
      }
    }
  } else {
    board[x][y] = value
  }
  showBoard(player, board)
}

socket.on('player', onPlayer)
socket.on('board', onBoard)
