			socket.onopen = function (e) {
				console.log("Connection established!");
				sendToUserDisplay();
			}