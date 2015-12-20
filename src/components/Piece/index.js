import React from 'react'

import Player from '../Player'

require('./index.css')

export default class Piece extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      player: this.props.value
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({player: nextProps.value})
  }

  render() {
    return (
      <div onClick={this.props.onClick} className='Piece'>
        {this.state.player ? (<Player player={this.state.player}></Player>) : null}
      </div>
    )
  }
}
