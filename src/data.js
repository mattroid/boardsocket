/**
 * Shared data
 */

// representation of current board (10x10 of 0's)
var board_size = 10
export const board = new Array(board_size)
for (let x = board_size; x--; x) {
  board[x] = new Array(board_size)
  for (let y = board_size; y--; y) {
    board[x][y] = 0
  }
}

// map of socket ID to fingerprint
export var players = {}

// map of fingerprint to player-data
export var player_info = {}
