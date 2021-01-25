const showRooms = event => {
	const settings = {
		method: 'POST', 
		headers: {
			'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
	};

	fetch('src/api.php/getAllActiveRooms', settings)
		.then(response => response.json())
		.then(data => createRooms(data))
		.catch(error => console.log(error));
};


(function() {
	const resetButton = document.getElementById('reset-button');

	resetButton.addEventListener('click', showRooms);
})();

function createRooms(rooms) {
	document.getElementById("room-list").innerHTML = "";
	for (i = 0; i < rooms["result"].length; i++) {
		createRoomTag(rooms["result"][i]);
	}
	if (document.getElementById("room-list").innerHTML == '') {
		var roomList = document.getElementById("room-list");
		var text = document.createElement("p");
		text.innerHTML = "Nan"
		roomList.appendChild(text);
	}
}

function createRoomTag(room) {
	var roomList = document.getElementById("room-list");
	
	var roomName = room.room_name;
	var musicianName = room.creator;
	var musicName = room.music;
	var roomTag = document.createElement("div");
	var id = 'room-tag-' + (i + 1);
	var button = document.createElement("BUTTON");
		
	button.textContent = "Join room";
	button.setAttribute("button-number", i+1);
	button.onclick = function () {
		var roomID = "room-tag-" + button.getAttribute("button-number");
		var roomInfo = document.getElementById(roomID);
		
		var data = {
			username: getCookie("user"),	
			roomName: roomName,
			creator: musicianName,
			music: musicName
		};
		localStorage.setItem("roomConnectionData", JSON.stringify(data));
		window.location = 'userDisplay.html';
	}
		
	roomTag.setAttribute("id", id);
	roomTag.setAttribute("room-number", i+1);
	roomTag.setAttribute("room-name", roomName);
	roomTag.setAttribute("musician-name", musicianName);
	roomTag.setAttribute("music-name", musicName);
	roomTag.innerHTML = "<p>Room: " + roomName + "</p> <p>Musician: " + musicianName + "</p> <p>Music: " + musicName + "</p>";

	roomTag.appendChild(button);
	roomList.appendChild(roomTag).className = "room-tag";
}

