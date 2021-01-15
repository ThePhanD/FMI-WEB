class Frame {
	constructor(grids, color, time) {
		this.grids = grids;
		this.color = color;
		this.time = time;
	}
	
	getGrids() {
		return this.grids;
	}
	
	getColor() {
		return this.color;
	}
	
	getTime() {
		return this.time;
	}
}