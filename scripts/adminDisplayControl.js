function setDisplay() {
	var rows = 10;	// Get from the server
	var cols = 10;	// Get from the server
	createGrid(rows, cols);
}

function setAdminRoom() {
	// Get data from server
	
	// Set the room settings
}

if (document.getElementById("exit-button"))
	document.getElementById("exit-button").addEventListener("click", exitRoom);
function exitRoom() {
	window.location.href = "./dashboard.html";
}