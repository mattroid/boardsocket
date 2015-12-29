import {describe, it} from 'mocha'
import {assert} from 'chai'

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Board from './index.js'

describe('Board', () => {
  it('3x3 board should render 9 pieces', () => {
    var player = {color: '#ababcc'}
    var board = [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
    var renderedComponent = TestUtils.renderIntoDocument(
        <Board board={board} player={player} />
    )
    var tiles = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'Piece')
    assert.equal(tiles.length, 9)
  })
})
