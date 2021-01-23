var roomTemplates = [];

if (document.getElementById("save-room-button"))
	document.getElementById("save-room-button").addEventListener("click", saveRoom);

function saveRoom() {
	var errors = [];
	
	if (!isValidGridDisplay()) {
		errors.push("The grid display is not in display mode!");
	}
	
	if (!isValidMusicName()) {
		errors.push("The music name is required!");
	}
	
	if (document.getElementById("room-name").value == '') {
		errors.push("The room name is required!");
	}
	
	if (errors.length == 0) {
		isValidRoomName();
	}
	else if (errors.length != 0) {
		window.alert(errors);
	}
}

function isValidGridDisplay() {
	if (document.getElementById("grid-display").innerHTML == '') {
		return false;
	}
	
	return true;
}

function isValidMusicName() {
	if (document.getElementById("music-name").value == '') {
		return false;
	}
	
	return true;
}

function isValidRoomName() {
	if (document.getElementById("room-name").value == '') {
		return false;
	}
	
	const roomName = document.getElementById('room-name').value;
	const rowNumber = document.getElementById('row').value;
	const colNumber = document.getElementById('col').value;
	const room = {
        roomName, 
        rowNumber,
        colNumber
    };

    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'   
        },
        body: `data=${JSON.stringify(room)}` 
    };
	
	   fetch('src/api.php/roomNameExits', settings)
        .then(response => response.json())
		.then(data => saveRoomToDataBase(data))
        .catch(error => console.log(error));
}

function saveRoomToDataBase(data) {
	if(data.success) {
		window.alert(data.error);
	}
	else {
		const roomName = document.getElementById('room-name').value;
		const rowNumber = document.getElementById('row').value;
		const colNumber = document.getElementById('col').value;
		const creator = "Creator";	// Get username from somewhere
		const music = document.getElementById('music-name').value;
		const places = seatToString();
		
		const room = {
			roomName, 
			rowNumber,
			colNumber,
			creator,
			music,
			places
		};

		const settings = {
			method: 'POST',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'   
			},
			body: `data=${JSON.stringify(room)}` 
		};
		
		   fetch('src/api.php/saveRoom', settings)
			.then(response => response.json())
			.then(data => window.alert(data.success))
			.catch(error => console.log(error));
	}
}

function seatToString() {
	var k = 0;
	var seats = "";
	
	for (i = 1; i <= rows*cols; i++) {
		if (i == freeSeats[k]) {
			seats += "1";
			k++;
		}
		else {
			seats += "0";
		}
	}
	return seats;
}

if (document.getElementById("update-room-button"))
	document.getElementById("update-room-button").addEventListener("click", updateRoomExamples);

function updateRoomExamples() {
	const settings = {
        method: 'POST', 
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    };

	fetch('src/api.php/getAllRooms', settings)
        .then(response => response.json())
		.then(data => makeDropDownRoomExamples(data))
        .catch(error => console.log(error));
}

function makeDropDownRoomExamples(rooms) {
	roomTemplates = [];
	for (var i = 0; i < rooms["result"].length; i++) {
		roomTemplates.push(rooms["result"][i]);
	}
	
	var dropList = document.getElementById("room-type");
	dropList.innerHTML = "";
	
	for (var i = 0; i < rooms["result"].length; i++) {
		var option = document.createElement("option");
		option.value = rooms["result"][i].room_name;
		option.text = rooms["result"][i].room_name;
		dropList.appendChild(option);
	}
}

if (document.getElementById("load-room-button"))
	document.getElementById("load-room-button").addEventListener("click", loadRoomExample);

function loadRoomExample() {
	var selector = document.getElementById("room-type");
	console.log(selector.options[selector.selectedIndex].value);
}
