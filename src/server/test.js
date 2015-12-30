import {describe, it} from 'mocha'
import {assert} from 'chai'

import io from 'socket.io-client'

describe('Server', () => {
  var socketUrl = 'http://localhost:8000'
  var options = {
    transports: ['websocket'],
    'force new connection': true

  }
  it('should create unique players for unique ids', (done) => {
    var client = io.connect(socketUrl, options)
    client.on('connect_error', () => {
      assert.fail()
      done()
    })
    client.emit('fingerprint', '123', (player) => {
      // client is now authenticated
      var color1 = player.color

      // connect a second client with different id
      var client2 = io.connect(socketUrl, options)
      client2.emit('fingerprint', 'abc', (player) => {
        // client2 is now authenticated
        var color2 = player.color

        assert.notEqual(color1, color2)
        done()
      })
    })
  })
})
