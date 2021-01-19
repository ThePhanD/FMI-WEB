var activeGrids = [];
var freeSeats = [];
var invalidSeats = [];

function removeItem(arr, value) {
	var index = arr.indexOf(value);
	if (index > -1) {
		arr.splice(index, 1);
	}
	return arr;
}

function getGridNumber(grid) {
	if (grid != "grid-display")
		return /(?<=([^-]*-){2}).*/.exec(grid)[0];
}

var list = document.querySelector('#grid-display');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'DIV') {
     ev.target.classList.toggle('done');
	 if ( ev.target.getAttribute('class') == 'grid-item done') {
		 activeGrids.push(getGridNumber(ev.target.getAttribute('id')));
	 }
	 else {
		 removeItem(activeGrids, getGridNumber(ev.target.getAttribute('id')));
	 }
  }
}, false);

if (document.getElementById("remove-grid-button"))
	document.getElementById("remove-grid-button").addEventListener("click", clearContainer);
function clearContainer() {
	const display = document.getElementById("grid-display");
    display.innerHTML = "";
	display.style.setProperty('height', '0px');
	display.style.setProperty('width', '0px');
	display.style.setProperty('border-width', '0px');
	activeGrids = [];
	freeSeats = [];
	invalidSeats = [];
}

if (document.getElementById("display-grid-button"))
	document.getElementById("display-grid-button").addEventListener("click", createDisplay);
var rows = 0;
var cols = 0;
function createDisplay() {
	var r = parseInt(document.getElementById("row").value);
	var c = parseInt(document.getElementById("col").value);
	createGrid(r, c);
}

function createGrid(rowNumber, colNumber) {
	clearContainer();
	const display = document.getElementById("grid-display");
	rows = rowNumber;
	cols = colNumber;
	if (rows == 0 || cols == 0) {
		return;
	}
	
	freeSeats = Array.from({length: rows * cols}, (_, i) => i + 1);
	const newHeight = rows * 50 + 'px';
	const newWidth = cols * 50 + 'px';
	display.style.setProperty('height', newHeight);
	display.style.setProperty('width', newWidth);
	display.style.setProperty('border-width', '5px');
	
	function makeRows(r, c) {
	  display.style.setProperty('--grid-rows', r);
	  display.style.setProperty('--grid-cols', c);
	  for (i = 0; i < (r * c); i++) {
		let cell = document.createElement("div");
		var id = 'grid-item-' + (i + 1);
		
		cell.setAttribute("id", id);
		cell.setAttribute("color", "#00ff00");
		display.appendChild(cell).className = "grid-item";
	  };
	};

	makeRows(rows, cols);
}

if (document.getElementById("show-grid-info-button"))
	document.getElementById("show-grid-info-button").addEventListener("click", showGridInfo);
function showGridInfo() {
	if (document.getElementById("grid-display").innerHTML == '') {
		return;
	}
	for (i = 0; i < (rows * cols); i++) {
		var gridId = 'grid-item-' + (i + 1);
		var grid = document.getElementById(gridId);
		if (grid.innerHTML == '') {
			grid.innerText = (i + 1);
		}
		else {
			grid.innerText = '';
		}
	}
}

function changeGridColorText(gridNumber, color) {
	var grid = document.getElementById('grid-item-' + gridNumber);
	grid.style.setProperty('color', color);
	grid.setAttribute("color", color);
}

var invalidColor = "gray";
function setInvalidGrids(grids) {
	for ( i = 0; i < grids.length; i++) {
		var grid = 'grid-item-' + grids[i];
		var gridColor = document.getElementById(grid).getAttribute('color');
		if (gridColor == freeColor) {
			changeGridColorText(grids[i], invalidColor);
			removeItem(freeSeats, parseInt(grids[i]));
			invalidSeats.push(parseInt(grids[i]));
		}
		else if (gridColor == occupiedColor) {
			changeGridColorText(grids[i], invalidColor);
			invalidSeats.push(parseInt(grids[i]));
		}
	}
}

var occupiedColor = "red";
function setOccupiedGrids(grids) {
	for ( i = 0; i < grids.length; i++) {
		var grid = 'grid-item-' + grids[i];
		var gridColor = document.getElementById(grid).getAttribute('color');
		if (gridColor == freeColor) {
			changeGridColorText(grids[i], occupiedColor);
			removeItem(freeSeats, parseInt(grids[i]));
		}
		else if (gridColor == invalidColor) {
			changeGridColorText(grids[i], occupiedColor);
			removeItem(invalidSeats, parseInt(grids[i]));
		}
	}
}

var freeColor = "#00ff00";
function setFreeGrids(grids) {
	for ( i = 0; i < grids.length; i++) {
		var grid = 'grid-item-' + grids[i];
		var gridColor = document.getElementById(grid).getAttribute('color');
		if (gridColor == occupiedColor) {
			changeGridColorText(grids[i], freeColor);
			freeSeats.push(parseInt(grids[i]));
		}
		else if (gridColor == invalidColor) {
			changeGridColorText(grids[i], freeColor);
			removeItem(invalidSeats, parseInt(grids[i]));
			freeSeats.push(parseInt(grids[i]));
		}
	}
}

if (document.getElementById("invalid-seat-button"))
	document.getElementById("invalid-seat-button").addEventListener("click", placeInvalidGrids);
function placeInvalidGrids() {
	setInvalidGrids(activeGrids);
}

if (document.getElementById("occupied-seat-button"))
	document.getElementById("occupied-seat-button").addEventListener("click", placeOcuupiedGrids);
function placeOcuupiedGrids() {
	setOccupiedGrids(activeGrids);
}

if (document.getElementById("free-seat-button"))
	document.getElementById("free-seat-button").addEventListener("click", placeFreeGrids);
function placeFreeGrids() {
	setFreeGrids(activeGrids);
}
