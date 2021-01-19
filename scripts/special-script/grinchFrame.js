function getGrinchFrameOne(time) {
	var grids = range(1, 100);
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
	];
	
	return new Frame(grids, colors, time);
}

function getGrinchFrameTwo(time) {
	var grids = range(1, 100);
	var colors = [ 
		//	1			2			3			4		5			6			7			8		9			10
		"#123c15", "#123c15", "#006164", "#6f9d3b", "#658d35", "#658d35", "#5b7f30", "#006164", "#123c15", "#123c15",	// 1
		"#00565a", "#123c15", "#123c15", "#123c15", "#6f9d3b", "#658d35", "#123c15", "#1b5e1f", "#164b1a", "#006164",	// 2
		"#00565a", "#52722b", "#425c23", "#164b1a", "#7caf42", "#6f9d3b", "#164b1a", "#4a6627", "#5b7f30", "#006164",	// 3
		"#00565a", "#7caf42", "#efff41", "#52722b", "#18541d", "#164b1a", "#6f9d3b", "#d7e53a", "#6f9d3b", "#006164",	// 4
		"#7caf42", "#ffffff", "#efff41", "#8bc34a", "#6f9d3b", "#658d35", "#8bc34a", "#d7e53a", "#ffffff", "#7caf42",	// 5
		"#658d35", "#ffffff", "#8bc34a", "#7caf42", "#52722b", "#52722b", "#6f9d3b", "#8bc34a", "#ffffff", "#658d35",	// 6
		"#52722b", "#ffffff", "#ffffff", "#8bc34a", "#7caf42", "#52722b", "#7caf42", "#ffffff", "#ffffff", "#52722b",	// 7
		"#00565a", "#52722b", "#ffffff", "#ffffff", "#954b4b", "#783c3c", "#ffffff", "#ffffff", "#52722b", "#006164",	// 8
		"#00565a", "#00565a", "#5b7f30", "#52722b", "#ffffff", "#ffffff", "#658d35", "#5b7f30", "#00565a", "#006164",	// 9
		"#00565a", "#00565a", "#00565a", "#00565a", "#658d35", "#5b7f30", "#00565a", "#00565a", "#006164", "#006164"	// 10
	];
	
	return new Frame(grids, colors, time);
}

if (document.getElementById("grinch-frame-button"))
	document.getElementById("grinch-frame-button").addEventListener("click", activateGrinchFrame);
function activateGrinchFrame() {
	var time = 1200;
	var n = 8;
	var i = 0;
	var frameTime = time / n;
	var grinchFrames = [];
	grinchFrames.push(getGrinchFrameOne(frameTime));
	grinchFrames.push(getGrinchFrameTwo(frameTime));
	
	if (rows == 10 && cols == 10) {
		function loop() {
			setTimeout(function() {
				changeColorFrame(grinchFrames[i % 2]);
				i++;
				if ( i < n) {
					loop();
				}
			}, frameTime);
		}
		
		loop();
	}
}