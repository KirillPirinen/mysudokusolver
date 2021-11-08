// Use filesystem.
const fs = require('fs');
// Use functions from sudoku.js file.
const sudokuSuperSolver = require('./sudoku');

// The sudoku puzzles that your program will solve can be found
// in the sudoku-puzzles.txt file.
//
// Remember, the file has newline characters at the end of each line,
// so you should remove them.

// Gets one puzzle from the text file.
function sudokuParse(content, puzzleNumber = 0) {
  let puzzle = content.split('\n')[puzzleNumber];
  console.log(puzzle);
  return puzzle;
}

function readAndSolve(err, data) {
  if (err) {
    throw err;
  }
  for(let i = 0; i <= 5; i++) {
  let puzzle = sudokuParse(data, i);

  let solvedPuzzle = sudokuSuperSolver(puzzle);
  if (solvedPuzzle[0]) {
    console.log("The board was solved!");
    console.table(solvedPuzzle[1]);
  }
  else {
    console.log("The board wasn't solved :(");
    console.table(solvedPuzzle[1]);
  }
  }
}

// Reads file and sends data from it to the readAndSolve function.
fs.readFile(
  './sudoku-puzzles.txt',
  'utf-8',
  readAndSolve
);

