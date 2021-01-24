		var socket = new WebSocket('ws://localhost:8080');
		
		socket.onopen = function(e) {
			console.log("Connection established!");
		};
		
		socket.onclose = function(e) {
			console.log("Connection Closed!");
		};
		
		var sendMsg = function(obj) {
			socket.send(JSON.stringify(obj));
		};
		
		function sendMessageToUser(user, roomName, message) {
            data = {type:'message', userID:user , message:message, roomName:roomName};
			sendMsg(data);
		}
		
		function connectToRoom(user, roomName, is_admin) {
			
			if(is_admin == 1) {
				data = {type:'connect', userID:user, roomName:roomName};
				sendMsg(data);
				//console.log(data);
			}
			else {
				data = {type:'connect',userID: user, roomName: roomName};
				sendMsg(data);
				//console.log(data);
			}
		}

		function disconnectFromRoom(user,roomName){
			data = {type:'disconnect', userID:user, roomName:roomName};
			sendMsg(data);
			console.log(data);
		}
			
		function changeColor(color) {
			document.body.style.background = color;
		} 
		
		socket.onmessage = function(e) {
			console.log(e.data);
			var color = JSON.parse(e.data)["message"];
			console.log(color);
			//changeColor(color);
		}