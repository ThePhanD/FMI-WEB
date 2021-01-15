
// Active grid effects
document.getElementById("activeGridBtn").addEventListener("click", changeActiveGrid);
function changeActiveGrid(){
	var time = document.getElementById("timeColorChoice").value * 1000;
	var color = document.getElementById("colorChoice").value;
	if (time > 0) {
		changeColorGridArr(activeGrids, color, time);
	}
}
// End of active grid effects

// All effects
document.getElementById("allGridBtn").addEventListener("click", changeAllGrid);
function changeAllGrid() {
	var time = document.getElementById("timeColorAll").value * 1000;
	var color = document.getElementById("colorAll").value;
	var gridArr = Array.from({length: rows * cols}, (_, i) => i + 1);
	
	if (time > 0) {
		changeColorGridArr(gridArr, color, time);
	}
}
// End of all effects

// Random effects
document.getElementById("randomGridBtn").addEventListener("click", activateRandomGrid);
function activateRandomGrid() {
	var n = document.getElementById('gridNumber').value;
	showRandomGrid(n);
}
// End of random effects

// Mexican wave effects
document.getElementById("mexicanWaveBtn").addEventListener("click", activateMexicanWave);
function activateMexicanWave() {
	var col = 1;
	var colorNumber = 0;
	var time = 50;
	
	var increase = parseInt(255 / cols );
	var multiply = parseInt((rows + cols) * 50 / 100);
	
	var frequency = 0.3;
	
	function myLoop() {
		setTimeout(function() {
			for (i = 0; i < rows; i++) {
				var gridId = i * cols + col;
				var color = getColor(col, frequency);
				changeColorGrid(gridId, color, time * multiply);
				colorNumber += increase;
			}
			col++;
			
			if ( col <= cols) {
				myLoop();
			}
		}, time)
	}
	myLoop();
}
// End of mexican wave effects

// Seiger effects
document.getElementById("seigerBtn").addEventListener("click", activateSeiger);
function activateSeiger() {
	var limit = 7;
	var i  = 0;
	
	function myLoop() {
		var randomNumber = Math.floor(Math.random() * 10) + 1;
		setTimeout(function() {
			activateMexicanWave();
			showRandomGrid(randomNumber);
	
			i++;
			if ( i < limit) {
				myLoop();
			}
		}, 200);
	}
	
	myLoop();
}
// End of sieger effects

// Spiral effects
function getSpiralArr(n, m) {
	var max = m;
	var numbers = [];
	var k = 1;
	var l = 1;
	
	while ( k <= n && l <= m) {
		for (i = l; i <= m; ++i) {
			numbers.push((k - 1)*max + i);
		}
		k++;
		
		for (i = k; i <= n; ++i) {
			numbers.push((i - 1)*max + m);
		}
		m--;
		
		if (k <= n) {
			for (i = m; i >= l; i--) {
				numbers.push((n - 1)*max + i);
			}
			n--;
		}
		
		if (l <= m) {
			for (i = n; i >= k; i--) {
				numbers.push((i - 1)*max + l);
			}
			l++;
		}
	}
	
	return numbers;
}

function getReverSpiralArr(n, m) {
	var arr = getSpiralArr(n, m);
	var reverseArr = [];
	for (i = arr.length - 1; i >= 0; i--) {
		reverseArr.push(arr[i]);
	}
	
	return reverseArr;
}
// End of spiral effects

document.getElementById("wtfBtn").addEventListener("click", activateWTF);
function activateWTF() {
	let frames = [];
	var size = rows * cols;
	var spiral = getSpiralArr(rows, cols);
	var reverseSpiral = getReverSpiralArr(rows, cols);
	
	let allGreen = new Frame(Array.from({length: size}, (_, i) => i + 1), "green", 250);
	frames.push(allGreen);
	let allRed = new Frame(Array.from({length: size}, (_, i) => i + 1), "red", 250);
	frames.push(allRed);
	let allBlue = new Frame(Array.from({length: size}, (_, i) => i + 1), "blue", 250);
	frames.push(allBlue);
	
	function wtfLoop(frames) {
		var limit = frames.length;
		var i = 0;
		
		function myLoop() {
			setTimeout(function() {
				changeColorFrame(frames[i]);
		
				i++;
				if ( i < limit) {
					myLoop();
				}
			}, frames[i].getTime());
		}
		
		myLoop();
	}
	
	wtfLoop(frames);
	
	setTimeout(function() {
		showSpiralMove(spiral, "lime", 30);
		setTimeout(function() {
			showSpiralMove(reverseSpiral, "lime", 30);
		}, 40*spiral.length);
	}, 1000);
}
