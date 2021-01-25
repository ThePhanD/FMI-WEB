function RGB2Color(r,g,b) {
    return 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
}

function getColor(i, frequency) {
	red   = Math.sin(frequency*i + 0) * 127 + 128;
	green = Math.sin(frequency*i + 2) * 127 + 128;
	blue  = Math.sin(frequency*i + 4) * 127 + 128;

	return RGB2Color(red,green,blue);
}

function getRandomColor(n, frequency) {
	var randomColorIdx = Math.floor(Math.random() * n);
	return getColor(randomColorIdx, frequency);
}

function sendColorTo(toIndex, color) {
	var occupied = "red";
	var grid = 'grid-item-' + toIndex;
	var gridColor = document.getElementById(grid).getAttribute('color');
	
	if (gridColor == occupied) {
		sendMessageToUser(getCookie("user"), color, [toIndex - 1]);
	}
} 

// Change color only for one grid
function changeColorGrid(index, color, time){
	var grid = document.getElementById('grid-item-' + index);
	grid.style.backgroundColor = color;
	sendColorTo(index, color);
	
	setTimeout(function(){
		grid.style.backgroundColor = '';
		sendColorTo(index, '')
	}, time);
}

// Change color for array of grids
function changeColorGridArr(grids, color, time) {
	for (var i = 0; i < grids.length; ++i) {
		var grid = 'grid-item-' + grids[i];
		document.getElementById(grid).style.backgroundColor =  color;
		sendColorTo(grids[i], color)
	}
	   
	setTimeout(function(){
		for (var i = 0; i < grids.length; ++i) {
			var grid = 'grid-item-' + grids[i];
			document.getElementById(grid).style.backgroundColor = '';
			sendColorTo(grids[i], '')
		}
	}, time);
}

function showRandomGrid(gridLimit) {
	var i = 0;
	var limit = parseInt(gridLimit);
	var colorNumber = 0;
	var time = 250;
	var steps = 6;
	var frequency = 2*Math.PI/steps;
	
	function myLoop() {
		setTimeout(function() {
			var randomGridId = Math.floor(Math.random() * (rows * cols));
			var gridId = randomGridId + 1;
			var color = getRandomColor(256, frequency);
			changeColorGrid(gridId, color, time);
			i++;
			
			if ( i < limit) {
				myLoop();
			}
		}, 10)
	}
	if (limit > 0) {
		myLoop();
	}
}

function showSpiralMove(grids, color, time) {
	var limit = grids.length;
	var i = 0;
	
	function myLoop() {
		setTimeout(function() {
			changeColorGrid(grids[i], color, time * 10);
			i++;
			if ( i < limit) {
				myLoop();
			}
		}, time);
	}
	
	myLoop();
}

function changeColorFrame(frame) {
	var grids = frame.getGrids();
	var colors = frame.getColors();
	var time = frame.getTime();

	for (var i = 0; i < grids.length; ++i) {
		var grid = 'grid-item-' + grids[i];
		document.getElementById(grid).style.backgroundColor =  colors[i];
		sendColorTo(grids[i], colors[i])
	}
	   
	setTimeout(function(){
		for (var i = 0; i < grids.length; ++i) {
			var grid = 'grid-item-' + grids[i];
			document.getElementById(grid).style.backgroundColor = '';
			sendColorTo(grids[i], '')
		}
	}, time);
}
