function setDisplay(data) {
	var room = data['result'];
	createGrid(parseInt(room.rowNumber), parseInt(room.colNumber));
	document.getElementById("room-name").innerHTML = "Room name: " + room.room_name;
	document.getElementById("music-name").innerHTML = "Music name: " + room.music;
	
	var strSeats = room.places;
	var free_seats = [];
	var invalid_seats = [];
	for (var i = 0; i < strSeats.length; i++) {
		if (strSeats[i] == "1") {
			free_seats.push(i + 1);
		}
		else {
			invalid_seats.push(i + 1);
		}
	}
		
	setFreeGrids(free_seats);
	setInvalidGrids(invalid_seats);

	connectToRoom(room.creator, room.room_name, getCookie("isAdmin"));
	numberMessage(free_seats,strSeats.length);
}

socket.onopen = function(e) {
	console.log("Connection established");
	setAdminRoom();
}


function setAdminRoom() {
	const creator = getCookie("user");	
	const isActive = 1;
	
	const room = {
		creator,
		isActive
	};

	const settings = {
		method: 'POST',
		headers: {
			'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'   
		},
		body: `data=${JSON.stringify(room)}` 
	};
		
	fetch('src/api.php/getCreatorActiveRoom', settings)
	 .then(response => response.json())
	 .then(data => setDisplay(data))
	 .catch(error => console.log(error));
}

if (document.getElementById("exit-button"))
	document.getElementById("exit-button").addEventListener("click", exitRoom);
function exitRoom() {
	var roomName = document.getElementById("room-name").innerHTML.split(" ")[2];
	disconnectFromRoom(getCookie("user"), roomName);
	window.location.href = "./dashboard.html";
}