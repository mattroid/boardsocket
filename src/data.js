/**
 * Shared data
 */

// representation of current board (10x10 of 0's)
export const board = new Array(10)
for (let x = 10; x--; x) {
  board[x] = new Array(10)
  for (let y = 10; y--; y) {
    board[x][y] = 0
  }
}

// map of socket ID to fingerprint
export var players = {}

// map of fingerprint to player-data
export var player_info = {}
