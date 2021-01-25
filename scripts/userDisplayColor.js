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

function setSeat(seat) {
	document.getElementById("seat-number").innerHTML = "Seat: " + seat;
}

function handleFullRoom() {
	alert("Room is full");
	window.location.href = "./dashboard.html";
}


function sendToUserDisplay() {
	var data = JSON.parse(localStorage.getItem("roomConnectionData"));
	document.getElementById("username-field").innerHTML = "Username: " + data.username;
	document.getElementById("creator").innerHTML = "Creator: " + data.creator;
	document.getElementById("music").innerHTML = "Music: " + data.music;
	document.getElementById("room-name").innerHTML = "Room: " + data.roomName;
	console.log(JSON.parse(localStorage.getItem("roomConnectionData")));
	connectToRoom(data.username, data.roomName, 0);
}


if (document.getElementById("exit-button"))
	document.getElementById("exit-button").addEventListener("click", exitRoom);
function exitRoom() {
	var data = JSON.parse(localStorage.getItem("roomConnectionData"));
	console.log(data);
	disconnectFromRoom(data.username, data.roomName);
	window.location.href = "./dashboard.html";
}
