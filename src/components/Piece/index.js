import React from 'react'

import Player from '../Player'

export default class Piece extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      player: this.props.value
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({player: nextProps.value})
  }

  render () {
    return (
      <div onClick={this.props.onClick} className='Piece'>
        {this.state.player ? (<Player player={this.state.player} />) : null}
      </div>
    )
  }
}

Piece.propTypes = {
  value: React.PropTypes.object,
  onClick: React.PropTypes.func
}
