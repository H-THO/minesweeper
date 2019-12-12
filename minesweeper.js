document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!

// Functions
function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Obj constructors
function Cell(x,y){
  this.row = x
  this.col = y
  this.isMine = false
  this.hidden = true
  //this.isMarked = false
  this.setMine = function (){
    this.isMine = true
  }
}
function Board(n, mines){
  this.numCells = n
  this.mines = mines
  this.rows = Math.sqrt(n)
  this.cols = Math.sqrt(n)
  this.cells = []
  for (var x = 0; x < this.rows; x++){
    for (var y = 0; y < this.cols; y++){
      this.cells.push(new Cell(x, y))
    }
  }
  // Extra Methods
}

// Constants
const boardSize = 25 // turn this into buttons
const numMines = 4 // turn this into buttons

// Setup
//if (boardSize > 0 && Math.sqrt(boardSize) % 1 === 0){
var board = new Board(boardSize, numMines)

for (var i = 0; i < numMines; i++){
  var mineCell = getRandomInt(0,boardSize-1)
  while (board.cells[mineCell].isMine){
    mineCell = getRandomInt(0,boardSize-1)
  }
  board.cells[mineCell].setMine()
}

//console.log("MINECELL index: "+mineCell)
//console.log(board.cells[mineCell])

function startGame () {
  // Get surrounding mine counts
  for (var i = 0; i < board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
var unhiddenCells = board.cells.filter(cell => {
  return ((cell.isMine && !cell.isMarked) || (!cell.isMine && cell.isHidden))
})
if (unhiddenCells.length === 0) {
  lib.displayMessage('You win!')
  }
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var cnt = 0
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  for (var i = 0; i < surrounding.length; i++){
    if (surrounding[i].isMine){
      cnt++
    }
  }
  return cnt
}

