import React from 'react'

import Piece from '../Piece'

require('./index.css')

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      board: props.board,
      playerNum: props.playerNum,
      connected: props.connected
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({playerNum: nextProps.playerNum, board: nextProps.board, connected: nextProps.connected})
  }

  onClick(x, y) {
    return (e) => {
      this.props.onClick(x,y,this.state.playerNum)
    }
  }

  render() {
    return (
      <div className={`Board server-${this.state.connected ? 'on' : 'off'}`}>
        {this.state.board.map((a, x) => {
        return a.map((v, y) => {
          return <Piece onClick={this.onClick(x, y).bind(this)} key={`${x}_${y}`} x={x} y={y} value={v}></Piece>
        })
      })}
      </div>
    )
  }
}
