class Frame {
	constructor(grids, colors, time) {
		this.grids = grids;
		this.colors = colors;
		this.time = time;
	}
	
	getGrids() {
		return this.grids;
	}
	
	getColors() {
		return this.colors;
	}
	
	getTime() {
		return this.time;
	}
}

function range(start, end) {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
}

function getAllNumberArr() {
	return range(1, rows * cols);
}

function getRepeatColor(color, n) {
	var colorArr = [];
	for ( i = 0; i < n; i++) {
		colorArr.push(color);
	}
	
	return colorArr;
}
