/* global describe it */
import {assert} from 'chai'

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Piece from './index.js'

describe('Piece', () => {
  it('should instanciate and pass value prop to player state', () => {
    var player = {color: '#ababcc'}
    var renderedComponent = TestUtils.renderIntoDocument(<Piece value={player} />)
    assert.equal(player.color, renderedComponent.state.player.color)
  })
})
