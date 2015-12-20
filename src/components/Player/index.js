import React from 'react'

require('./index.css')

export default class Player extends React.Component {
  render() {
    return (
      <div className='Player' style={{backgroundColor: this.props.player.color}}>
      </div>
    )
  }
}