import React from 'react'

require('./index.css')

export default class Piece extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div onClick={this.props.onClick} className='Piece'>
      <div className={`glyph glyph${this.props.value} player${this.props.value}`}></div>
    </div>)
  }
}
