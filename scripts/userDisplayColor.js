function changeToColor(color) {
	var display = "display-color";
	document.getElementById(display).style.backgroundColor = color;
}

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


if (document.getElementById("exit-button"))
	document.getElementById("exit-button").addEventListener("click", exitRoom);
function exitRoom() {
	window.location.href = "./dashboard.html";
}
