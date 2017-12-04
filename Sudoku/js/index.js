var arr = new Array();
initArr(arr);
var sudokuArray = genSudokuArray(arr);
shuffleSudoku(sudokuArray);
window.onload = function(){
				
				
	initGrid(sudokuArray, makeBlank(BooleanArrGen(),3));
				//print(makeBlank(BooleanArrGen()));
	var finishButton = document.getElementById("finButton");
				/*
				 "finish" button action listener
				 */
	finishButton.onclick = function(){
		var table = document.getElementById("Grid");
		var rows = table.getElementsByTagName("tr");
					//alert(rows[0].childNodes[0].innerHTML);
		var flag = true;
		for(var i=0;i<arr.length;i++){
			for(var j=0;j<arr.length;j++){
				if((rows[i].childNodes[j].innerHTML)!=arr[i][j]){
					flag = false;
				}
			}
		}
		if(!flag)alert("You haven't finished yet");
		else alert("Congras!");
	}
}
			/*
			mask above the original array
			*/
function BooleanArrGen(){
	var booleanArr = new Array();
	for(var i=0;i<9;i++){
		booleanArr[i]=new Array();
		for(var j=0;j<9;j++){
			booleanArr[i][j]=true;
		}
	}
	return booleanArr;
}
			/*
			 */
function makeBlank(arr, difficulty) {
	if(difficulty === 1) {
		for(var i = 0; i < arr.length; i++) {
			var num = Math.floor(Math.random() * 9);
			arr[i][num] = false;
		}
	}
	if(difficulty === 2) {
		for(var i = 0; i < arr.length; i++) {
			var num = Math.floor(Math.random() * 9);
			var num2 = Math.floor(Math.random() * 9);
			var num3 = Math.floor(Math.random() * 9);
			arr[i][num] = false;
			arr[i][num2] = false;
			arr[i][num3] = false;
		}
	}
	if(difficulty === 3) {
		for(var i = 0; i < arr.length; i++) {
			var num = Math.floor(Math.random() * 9);
			var num2 = Math.floor(Math.random() * 9);
			var num3 = Math.floor(Math.random() * 9);
			var num4 = Math.floor(Math.random() * 9);
			var num5 = Math.floor(Math.random() * 9);
			arr[i][num] = false;
			arr[i][num2] = false;
			arr[i][num3] = false;
			arr[i][num4] = false;
			arr[i][num5] = false;
		}
	}
	if(difficulty === 4) {
		for(var i = 0; i < arr.length; i++) {
			var num = Math.floor(Math.random() * 9);
			var num2 = Math.floor(Math.random() * 9);
			var num3 = Math.floor(Math.random() * 9);
			var num4 = Math.floor(Math.random() * 9);
			arr[i][num] = false;
			arr[i][num2] = false;
			arr[i][num3] = false;
			arr[i][num4] = false;
		}
	}
	return arr;
}

function genSudokuArray(arr) {
	for(var i = 1; i < 10; i++) {
		fill(i, 0, arr);
	}
	return arr;
}
			/*
			 load generated arry to Grid, and initialize the Grid on web page
			 */
function initGrid(arr, booleanArr) {
	var getGrid = document.getElementById("Grid");

	var count = 0;
	for(var i = 0; i < 9; i++) {

		var row = getGrid.insertRow(i);
		var trs = document.getElementsByTagName("tr")[i];
		for(var j = 0; j < 9; j++) {
			var cell = row.insertCell(j);
			if(booleanArr[i][j] == true) {
				cell.innerHTML = arr[i][j];
			} else {
				cell.innerHTML = "";
				cell.contentEditable = true;
				cell.style.color = "darkcyan";
				cell.style.fontWeight = "bold";
							/*cell.onmouseover = function(){
								this.style.backgroundColor = "brown";
							}*/
							/*cell.onmouseout = function(){
								this.style.backgroundColor ="white";
							}*/
				cell.onfocus = function() {
					this.style.backgroundColor = "#afeeee";
				}
				cell.onblur = function() {
					this.style.backgroundColor = "white";
				}
			}
			if((j + 1) % 3 == 0) {
				var col = trs.cells[j];
							//console.log(col[j]);
				col.style.borderRight = "4px solid black";
			}
		}
		if((i + 1) % 3 == 0) {
			var row = document.getElementsByTagName('tr');
						//console.log(row[i]);
						//row[i].style.borderBottom
			row[i].style.borderBottom = "4px solid black";
		}
	}

}

function checkNineCells(n, x, y, arr) {
	var result = true;
	var sx = x * 3;
	var sy = y * 3;
	for(var i = sx; i < sx + 3; i++) {
		for(var j = sy; j < sy + 3; j++) {
			if(arr[i][j] == n) {
				result = false;
				break;
			}
		}
		if(!result) break;
	}

	return result;
}

function checkCol(n, col, arr) {
	var result = true;
	for(var i = 0; i < arr.length; i++) {
		if(arr[i][col] == n) {
			result = false;
			break;
		}
	}
	return result;
}
			/*
			 backtracking algorithm to fill 1 to 9 row by row*/
function fill(num, row, arr) {
	if(row > arr.length - 1) {
		return true;
	}
	for(var col = 0; col < arr.length; col++) {
		var p = Math.floor(row / 3);
		var q = Math.floor(col / 3);
		if(arr[row][col] == 0) {
			if(checkCol(num, col, arr) && checkNineCells(num, p, q, arr)) {
				arr[row][col] = num;
				if(fill(num, row + 1, arr)) {
					return true;
				}
				arr[row][col] = 0;
			}
		}
	}
	return false;
}
function shuffleSudoku(arr) {
	console.log("before shuffle rows and cols");
	print(arr);
	for(var i = 0; i < 3; i++) {
		var max = i * 3 + 2;
		//console.log("max is "+max);
		var min = i * 3;
					//console.log("min is "+min);
		var Range = max - min;
		var Rand = Math.random();
		var num = min + Math.round(Rand * Range);
		//int ranNum = ran.nextInt((i*3+3)-(i*3))+(i*3);
					//System.out.println(ranNum);
					//int ranNum2 = ran.nextInt((i*3+3)-(i*3))+(i*3);
		var num2 = min + Math.round(Math.random() * Range);
		while(num2 == num) {
			num2 = min + Math.round(Math.random() * Range);
		}
					//System.out.println(ranNum2);
		shuffleRow(num, num2, arr);
		shuffleCol(num, num2, arr);
	}
	console.log("before rotate: ");
	print(arr);
	rotateArray(arr);
	console.log("after rotate: ");
	print(arr);
				//return result;
}

function shuffleRow(row1, row2, arr) {
	var temp = new Array(9);
	for(var i = 0; i < arr.length; i++) {
		temp[i] = arr[row1][i];
	}
	for(var i = 0; i < arr.length; i++) {
		arr[row1][i] = arr[row2][i];
	}
	for(var i = 0; i < arr.length; i++) {
		arr[row2][i] = temp[i];
	}
}

function shuffleCol(col1, col2, arr) {
	var temp = new Array(9);
	for(var i = 0; i < arr.length; i++) {
		temp[i] = arr[i][col1];
	}
	for(var i = 0; i < arr.length; i++) {
		arr[i][col1] = arr[i][col2];
	}
	for(var i = 0; i < arr.length; i++) {
		arr[i][col2] = temp[i];
	}
}

function rotateArray(arr) {
	var temp = new Array();
	initArr(temp);
	var ran = Math.floor(Math.random() * 4);
	console.log("rotateArray: ran is " + ran);
	if(ran == 0) {
		for(var i = 0; i < arr.length; i++) {
			for(var j = 0; j < arr.length; j++) {
				temp[i][j] = arr[j][arr.length - 1 - i];
			}
		}
	} else if(ran == 1) {
		for(var i = 0; i < arr.length; i++) {
			for(var j = 0; j < arr.length; j++) {
				temp[i][j] = arr[arr.length - 1 - i][j];
			}
		}
	} else if(ran == 2) {
		for(var i = 0; i < arr.length; i++) {
			for(var j = 0; j < arr.length; j++) {
				temp[i][j] = arr[i][arr.length - 1 - j];
			}
		}
	} else if(ran == 3) {
		for(var i = 0; i < arr.length; i++) {
			for(var j = 0; j < arr.length; j++) {
				temp[i][j] = arr[arr.length - 1 - j][i];
			}
		}
	}
	for(var i = 0; i < arr.length; i++) {
		for(var j = 0; j < arr.length; j++) {
			arr[i][j] = temp[i][j];
		}
	}

				//print(temp);
				//return arr;
}
			/*
			 initialize two-D array
			 */
function initArr(arr) {
	for(var i = 0; i < 9; i++) {
		arr[i] = new Array();
		for(var j = 0; j < 9; j++) {
			arr[i][j] = 0;
		}
	}
}

function print(arr) {
	var arrText = '';
	for(var i = 0; i < arr.length; i++) {
		for(var j = 0; j < arr.length; j++) {
			arrText = arrText + arr[i][j] + ' ';
		}
		console.log(arrText);
		arrText = '';
	}
}