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
		
		function seatedMessage(message) {
			data = {type:'seatMessage', message:message};
			sendMsg(data);
		}
		
		function numberMessage(currentCnt,totalCnt) {
			data = {type: 'numberMessage', current:currentCnt, total:totalCnt};
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
			} else if (mesType == "seatedMessage") {
		    } else if (mesType == "numberMessage") {
			}
		}