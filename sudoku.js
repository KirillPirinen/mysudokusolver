function sudokuSuperSolver (string) {
//глобальные переменные
let solveIndicator = false;
let originBoard = boardToArray(string);
let ourBoard = [].concat(originBoard); // копия массива 
const size = originBoard.length;
//Запуск и вывод  ---- >
solve(originBoard);
return [solveIndicator, ourBoard];
// Парсер строки //
function boardToArray(sudokuString) {
		const arrayOfString = sudokuString.match(/.{9}/g);
		const nestedArrayOfString = arrayOfString.map((el) => el.split(""));
		const nestedArrayNumbers = nestedArrayOfString.map((el) =>
			el.map((element) =>
				element === "-" ? (element = "-") : (element = +element)
			)
		);
		return nestedArrayNumbers;
}
// Поиск ячейки которую нужно решить
function findEmpty(board) {
	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			if(board[y][x] === "-") {
				return {x:x, y:y};
			}
		}
	}
	return 'Нечего решать!';
}
//Логика отбора кандидатов
function validator (num, board, curPos) {
		//row validation
		for(let i = 0; i < size; i++) if(board[curPos.y][i] === num && i !== curPos.x) return false; 
		//column validation
		for(let i = 0; i < size; i++) if(board[i][curPos.x] === num && i !== curPos.y) return false; 
		//box validation
		const startBoxCoordinateX = Math.floor(curPos.x / 3) * 3; // Поиск самой верхней -
		const startBoxCoordinateY = Math.floor(curPos.y / 3) * 3; // левой ячейки в квадрате 3х3
		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < 3; j++) if(board[i+startBoxCoordinateY][j + startBoxCoordinateX] === num) return false;
		}
		return true;
}
// Рекурсивый алгоритм поиска в глубину
function solve(board) {
		let position = findEmpty(originBoard);
		if(position === 'Нечего решать!') {
			solveIndicator = true;
			return ourBoard;
		}
		for(let i = 1; i <= size; i++) {
			if(validator(i, board, position)) {
				ourBoard[position.y][position.x] = i;
				if(solve(ourBoard)) {
					return true;
				} 
				ourBoard[position.y][position.x] = '-';
			}
		}
}
// выгрузка в консоль в красивом виде
function prettyBoard(nestedArrayNumbers) {
	let prettySudoku = "\n";
	for (let i = 0; i < nestedArrayNumbers.length; i++) {
		prettySudoku += `${nestedArrayNumbers[i].join("  ")}\n` + `\n`;
	}
	return prettySudoku;
}

}

module.exports = sudokuSuperSolver;
