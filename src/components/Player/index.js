import React from 'react'

export default class Player extends React.Component {
  render () {
    return (
      <div className='Player' style={{backgroundColor: this.props.player.color}}>
      </div>
    )
  }
}

Player.propTypes = {
  player: React.PropTypes.object
}
