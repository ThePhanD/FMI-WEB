			
var socket = new WebSocket('ws://localhost:8282');
			
const color = {code: '#7FFF00'};
			
const convCol=JSON.stringify(color);
		
function changeColor(color) {
    document.body.style.background =color.code;
    } 
			
//sockets sends color
function transmitMessage() {
	socket.send(convCol);
    }
			
socket.onmessage = function(e) {
	var sentColor= JSON.parse(e.data);
	console.log(sentColor.code);
	changeColor(sentColor);
	}
              
function gfg_Run() { 
    changeColor(color); 
    transmitMessage();
	}	          