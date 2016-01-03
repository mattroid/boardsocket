import {describe, it, before, after} from 'mocha'
import {assert} from 'chai'

import server from './index.js'

import io from 'socket.io-client'

describe('Server', () => {
  var socketUrl = 'http://localhost:9000'
  var options = {
    transports: ['websocket'],
    'force new connection': true
  }

  before(() => {
    server.listen(9000)
  })

  after(() => {
    server.io.close()
    server.close()
    // HACK: this assumes this is the last thing run. Need to figure out how to really stop server, completely.
    process.exit()
  })

  it('should create unique players for unique ids', (done) => {
    const err = (e) => {
      done(e)
    }
    var client = io.connect(socketUrl, options)
    client.on('connect_error', err)
    client.emit('fingerprint', '123', (player1) => {
      var client2 = io.connect(socketUrl, options)
      client2.on('connect_error', err)
      client2.emit('fingerprint', 'abc', (player2) => {
        assert.notEqual(player1.color, player2.color)
        client2.disconnect()
        client.disconnect()
        done()
      })
    })
  })
})
