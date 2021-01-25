		socket = new WebSocket('ws://localhost:8080');

		
		socket.onopen = function(e) {
			console.log("Connection established!");
		};
		
		socket.onclose = function(e) {
			console.log("Connection Closed!");
		};
		
		var sendMsg = function(obj) {
			jsonObj = JSON.stringify(obj);
			console.log(jsonObj);
			socket.send(JSON.stringify(obj));
		};
		
		function sendMessageToUser(user, message, seats) {
            data = {type:'message', user:user, message:message, seats:seats};
			sendMsg(data);
		}
		
		function seatedMessage(seatNumber) {
			data = {type:'seatMessage', seatNumber:seatNumber};
			sendMsg(data);
		}
		
		function numberMessage(currentCnt,totalCnt) {
			data = {type: 'numberMessage', current:currentCnt, total:totalCnt};
			sendMsg(data);
		}
		
				
		function sendToAllInRoom(user,room,message) {
			data = {type: 'sendToAllRoom', room:room, message:message};
			sendMsg(data);
		}
		
		function connectToRoom(user, roomName, is_admin) {
			
			if(is_admin == 1) {
				data = {type:'connect', user:user, roomName:roomName, isAdmin:"yes"};
				sendMsg(data);
				console.log(data);
			}
			else {
				data = {type:'connect',user: user, roomName: roomName, isAdmin:"no"};
				sendMsg(data);
			}
		}

		function disconnectFromRoom(user,roomName){
			data = {type:'disconnect', user:user, roomName:roomName};
			sendMsg(data);
		}
			
		
		socket.onmessage = function(e) {
			console.log(e.data);
			data = JSON.parse(e.data);
			mesType = data["type"];
			if (mesType == "message") {
				var color = data["message"];
				console.log(color);
				changeToColor(color);
			} else if (mesType == "seatMessage") {
				var seat =  data["seatNumber"];
				setSeat(seat);
		    } else if (mesType == "numberMessage") {
				var curr = data["current"];
				var total = data["total"];
				var places = data["places"];
				setPlaces(places);
				setNumbers(curr, total);
		    } else if (mesType == "roomFull") {
				handleFullRoom();
			} else if (mesType == "roomDisconnect") {
				window.location.href = "./dashboard.html";
			}
		}