class PixelColor {
	constructor(gridId, color, time) {
		this.gridId = gridId;
		this.color = color;
		this.time = time;
	}
	
	getGridId() {
		return this.gridId;
	}
	
	getColor() {
		return this.color;
	}
	
	getTime() {
		return this.time;
	}
}

function getGrinchPixels(time) {
	var grinch = [];
	var colors = [ 
		//	1			2			3			4		5			6			7			8		9			10
		"#144317", "#144317", "#006164", "#6f9d3b", "#658d35", "#658d35", "#5b7f30", "#006164", "#144317", "#144317",	// 1
		"#00565a", "#144317", "#123c15", "#144317", "#6f9d3b", "#658d35", "#144317", "#1b5e1f", "#164b1a", "#006164",	// 2
		"#00565a", "#52722b", "#425c23", "#164b1a", "#7caf42", "#6f9d3b", "#164b1a", "#4a6627", "#5b7f30", "#006164",	// 3
		"#00565a", "#7caf42", "#ca9b24", "#52722b", "#18541d", "#164b1a", "#6f9d3b", "#fbc12d", "#6f9d3b", "#006164",	// 4
		"#7caf42", "#d0dcd1", "#efff41", "#8bc34a", "#6f9d3b", "#658d35", "#8bc34a", "#d7e53a", "#d0dcd1", "#7caf42",	// 5
		"#658d35", "#d0dcd1", "#8bc34a", "#7caf42", "#52722b", "#52722b", "#6f9d3b", "#8bc34a", "#d0dcd1", "#658d35",	// 6
		"#52722b", "#d0dcd1", "#d0dcd1", "#8bc34a", "#7caf42", "#52722b", "#7caf42", "#d0dcd1", "#e8f5e9", "#52722b",	// 7
		"#00565a", "#52722b", "#ffffff", "#d0dcd1", "#954b4b", "#783c3c", "#e8f5e9", "#ffffff", "#52722b", "#006164",	// 8
		"#00565a", "#00565a", "#5b7f30", "#52722b", "#e5e5e5", "#e5e5e5", "#658d35", "#5b7f30", "#00565a", "#006164",	// 9
		"#00565a", "#00565a", "#00565a", "#00565a", "#658d35", "#5b7f30", "#00565a", "#00565a", "#006164", "#006164"	// 10
	]
	for (i = 1; i <= 100; ++i) {
		grinch.push(new PixelColor(i, colors[i-1], time));
	}
	
	return grinch;
}

function showColorGrinch(grinchArr) {
	
	var time = grinchArr[0].getTime();
		
	for (var j = 0; j < grinchArr.length; ++j) {
		var gridId = 'grid-item-' + grinchArr[j].getGridId();
		document.getElementById(gridId).style.backgroundColor =  grinchArr[j].getColor();
	}
	
	setTimeout(function(){
		for (var i = 1; i <= 100; ++i) {
			var gridId = 'grid-item-' + i;
			document.getElementById(gridId).style.backgroundColor = '';
		}
	}, time);
}

function showGrinch() {
	var rows = parseInt(document.getElementById("Rows").value);
	var cols = parseInt(document.getElementById("Cols").value);
	if ( rows * cols == 100) {
		var time = 1000;
		var grinchArr = getGrinchPixels(time);
		showColorGrinch(grinchArr);
	}
}