import React from 'react'

import Piece from '../Piece'
import socket from '../../socket'

require('./index.css')

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [],
      playerNum: props.playerNum,
      connected: props.connected
    }
    this.onBoard = this.onBoard.bind(this)
  }

  componentWillMount() {
    socket.on('board', this.onBoard)
  }

  componentWillUnmount() {
    socket.removeListener('board', this.onBoard)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({playerNum: nextProps.playerNum, board: nextProps.board, connected: nextProps.connected})
  }

  onBoard(incoming_board, x, y) {
    if (x === undefined && y === undefined){
      this.setState({board: incoming_board})
    }else{
      this.state.board[x][y] = incoming_board
      this.setState({board: this.state.board})
    }
  }

  onClick(x, y) {
    return ((e) => {
      socket.emit('click', x, y)
    }).bind(this)
  }

  render() {
    return (
      <div className='Board'>
        {this.state.board.map((a, x) => {
          return a.map((v, y) => {
            return <Piece onClick={this.onClick(x, y)} key={`${x}_${y}`} x={x} y={y} value={v}></Piece>
          })
        })}
      </div>
    )
  }
}
