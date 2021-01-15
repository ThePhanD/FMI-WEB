function changeToColor(color) {
	var display = "colorDisplay";
	document.getElementById(display).style.backgroundColor = color;
}

//changeToColor("blue");

var colors = ["blue", "green", "red", "white", "orange", "lime", "silver", "yellow", "purple", "black"];

function loopColors(delayTime) {
	var maxIter = 10;
	var i = 0;
	
	function myLoop() {
		setTimeout(function() {
			changeToColor(colors[i]);
	
			i++;
			if ( i < maxIter) {
				myLoop();
			}
		}, delayTime);
	}
	
	myLoop();
}

function startLoopColors() {
	loopColors(200);
}