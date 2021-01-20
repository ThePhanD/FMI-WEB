function makeStruct(names) {
  var names = names.split(' ');
  var count = names.length;
  function constructor() {
    for (var i = 0; i < count; i++) {
      this[names[i]] = arguments[i];
    }
  }
  return constructor;
}

var Item = makeStruct("roomName musicianName musicName");
var rooms = [];

function createRooms() {
	var r1 = new Item('TiZnaeshVsichko', 'Zahari', 'TiSheImash6');
	var r2 = new Item('WEB15', 'Lektora', 'Popravka');
	var r3 = new Item('Sesiq', 'FMI', '22222222');
	var r4 = new Item('Uchene', 'Ti', 'NOnoNoNooooo');
	var r5 = new Item('EdinDenPrediIzpita', 'Vsichki', 'KakvotoStane');
	
	rooms.push(r1);
	rooms.push(r2);
	rooms.push(r3);
	rooms.push(r4);
	rooms.push(r5);
}

createRooms();
createRoomTag(rooms);
function createRoomTag(rooms) {
	var roomList = document.getElementById("room-list");
	for (i = 0; i < rooms.length; i++) {
		var roomName = rooms[i].roomName;
		var musicianName = rooms[i].musicianName;
		var musicName = rooms[i].musicName
		var roomTag = document.createElement("div");
		var id = 'room-tag-' + (i + 1);
		var button = document.createElement("BUTTON");
		
		button.textContent = "Join room";
		button.setAttribute("button-number", i+1);
		
		roomTag.setAttribute("id", 'room-tag-2');
		roomTag.setAttribute("room-number", i+1);
		roomTag.setAttribute("room-name", roomName);
		roomTag.setAttribute("musician-name", musicianName);
		roomTag.setAttribute("music-name", musicName);
		roomTag.innerHTML = "<p>Room: " + roomName + "</p> <p>Musician: " + musicianName + "</p> <p>Music: " + musicName + "</p>";

		roomTag.appendChild(button);
		roomList.appendChild(roomTag).className = "room-tag";
	};
}