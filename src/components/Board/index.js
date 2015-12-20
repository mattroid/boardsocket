/* global localStorage */

import React from 'react'
import Fingerprint from 'fingerprintjs2'

import Piece from '../Piece'
import socket from '../../socket'

require('./index.css')

export default class Board extends React . Component {
  constructor (props) {
    super(props)
    this.state = {
      board: [],
      player: {}
    }
    this.onBoard = this.onBoard.bind(this)
    this.onPlayer = this.onPlayer.bind(this)

    // stored fingerprint
    if (!localStorage.fingerprint) {
      new Fingerprint().get((result, components) => {
        localStorage.fingerprint = result
        socket.emit('fingerprint', localStorage.fingerprint, this.onPlayer)
      })
    } else {
      socket.emit('fingerprint', localStorage.fingerprint, this.onPlayer)
    }
  }

  componentWillMount () {
    socket.on('board', this.onBoard)
  }

  componentWillUnmount () {
    socket.removeListener('board', this.onBoard)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({playerNum: nextProps.playerNum, board: nextProps.board, connected: nextProps.connected})
  }

  onPlayer (player) {
    this.setState({player: player})
  }

  onBoard (incoming_board, x, y) {
    if (x === undefined && y === undefined) {
      this.setState({board: incoming_board})
    } else {
      this.state.board[x][y] = incoming_board
      this.setState({board: this.state.board})
    }
  }

  onClick (x, y) {
    return (e) => {
      socket.emit('click', x, y)
    }
  }

  render () {
    var keyStyle = {
      backgroundColor: this.state.player.color
    }
    return (
      <div className='Board'>
        {this.state.board.map((a, x) => {
          return a.map((v, y) => {
            return <Piece onClick={this.onClick(x, y)} key={`${x}_${y}`} x={x} y={y} value={v} />
          })
        })}
        <div className='key'>You are <i style={keyStyle}></i>.</div>
      </div>
    )
  }
}
