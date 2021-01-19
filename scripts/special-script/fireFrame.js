function setColorFrame(fromArr, toArr, color) {
	for ( i = 0; i < fromArr.length; i++) {
		toArr[fromArr[i] - 1] = color;
	}
}

function getFireFrameOne(time) {
	
	var grids = range(1, 100);
	var colors = new Array(100);
	var backgroundPixels = [
		1, 2, 3, 4, 	6, 7, 8, 9 ,10, 
		11, 12, 13, 14, 15, 16, 	18, 19, 20,
		21, 22, 	24, 	26, 27, 28, 29, 30,
		31, 32, 33, 34, 		37, 	39, 40,
		41, 	43, 				48, 	50,
		51, 52, 						59, 60,
		61, 62, 63,					68, 69, 70,
		71, 72, 73, 74, 		77, 78, 79, 80,
		81, 82, 83, 				88, 89, 90,
		91, 92,							99, 100
	];
	var redPixels = [ 5, 23, 25, 35, 36, 38, 42, 44, 47, 49, 53, 58, 64, 67, 75, 76 ];
	var orangePixels = [ 17, 45, 46, 54, 57, 65 ];	
	var yellowPixels = [ 55, 56, 66 ];
	var blackPixels = [ 85, 94, 96 ];
	var darkRedPixels = [ 84, 86, 87, 93, 95, 97, 98 ];
	
	setColorFrame(backgroundPixels, colors, "white");
	setColorFrame(redPixels, colors, "red");
	setColorFrame(orangePixels, colors, "orange");
	setColorFrame(yellowPixels, colors, "yellow");
	setColorFrame(blackPixels, colors, "black");
	setColorFrame(darkRedPixels, colors, "#8B0000");
	
	return new Frame(grids, colors, time);
}

function getFireFrameTwo(time) {
	
	var grids = range(1, 100);
	var colors = new Array(100);
	var backgroundPixels = [
		 1,	 2,  3,	 4, 	 6,  7,  8,  9, 10, 
		11, 12, 13, 14, 15,	16, 17,	18, 19, 20,
		21, 22,		24, 	26, 27,		29, 30,
			32,	33,	34, 		37, 38,	39,
		41, 42,	43, 				48, 49, 50,
		51, 52, 						59, 60,
		61, 62, 63,					68, 69, 70,
		71, 72, 73, 74, 		77, 78, 79, 80,
		81, 82, 83, 				88, 89, 90,
		91, 92,							99, 100
	];
	var redPixels = [ 5, 25, 28, 31, 35, 36, 40, 44, 46, 47, 53, 58, 64, 67, 75, 76 ];
	var orangePixels = [ 23, 45, 54, 57];	
	var yellowPixels = [ 55, 56, 65, 66 ];
	var blackPixels = [ 85, 87, 94, 95, 96 ];
	var darkRedPixels = [ 84, 86, 93, 97, 98 ];
	
	setColorFrame(backgroundPixels, colors, "white");
	setColorFrame(redPixels, colors, "red");
	setColorFrame(orangePixels, colors, "orange");
	setColorFrame(yellowPixels, colors, "yellow");
	setColorFrame(blackPixels, colors, "black");
	setColorFrame(darkRedPixels, colors, "#8B0000");
	
	return new Frame(grids, colors, time);
}

if (document.getElementById("fire-frame-button"))
	document.getElementById("fire-frame-button").addEventListener("click", activateFireFrame);
function activateFireFrame() {
	var time = 1200;
	var n = 12;
	var i = 0;
	var frameTime = time / n;
	var fireFrames = [];
	fireFrames.push(getFireFrameOne(frameTime));
	fireFrames.push(getFireFrameTwo(frameTime));
	
	if (rows == 10 && cols == 10) {
		function loop() {
			setTimeout(function() {
				changeColorFrame(fireFrames[i % 2]);
				i++;
				if ( i < n) {
					loop();
				}
			}, frameTime);
		}
		
		loop();
	}
}