/* global describe it */
import {assert} from 'chai'

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Player from './index.js'

describe('Player', () => {
  it('should instanciate and know what color to be', () => {
    var player = {color: '#ababcc'}
    var renderedComponent = TestUtils.renderIntoDocument(<Player player={player} />)
    assert.equal(player.color, renderedComponent.props.player.color)
  })
})
