import {describe, it} from 'mocha'
import {assert} from 'chai'

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Board from './index.js'

describe('Board', () => {
  it('3x3 board should render 9 pieces', () => {
    var player = {color: '#ababcc'}
    var board = [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
    var sut = TestUtils.renderIntoDocument(
        <Board board={board} player={player} />
    )

    // find all pieces that got rendered
    var tiles = TestUtils.scryRenderedDOMComponentsWithClass(sut, 'Piece')

    assert.equal(tiles.length, 9)
  })
})
