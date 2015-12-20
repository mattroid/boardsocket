import React from 'react'

import Piece from '../Piece'

export default class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      board: props.board,
      player: props.player
    }
  }

  componentWillReceiveProps (nextProps) {
    var newProps = {}
    if (nextProps.board) {
      newProps.board = nextProps.board
    }
    if (nextProps.player) {
      newProps.player = nextProps.player
    }
    this.setState(newProps)
  }

  onClick (x, y) {
    return (e) => {
      this.props.onClick(x, y)
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

Board.propTypes = {
  board: React.PropTypes.array,
  player: React.PropTypes.object,
  onClick: React.PropTypes.func
}

Board.defaultProps = {
  board: [],
  player: {},
  onClick: (x, y) => {}
}
