	$(document).ready(function(){
		var socket = new WebSocket('ws://localhost:8080');
		
		socket.onopen = function(e) {
			console.log("Connection established!");
		};
		
		socket.onclose = function(e) {
			console.log("Connection Closed!");
		}
		
		var sendMsg = function(obj) {
			socket.send(JSON.stringify(obj));
		};
	
		$('#message').click(function(){
            data = {type:'message',userID: $("#userId").val() , color: '#7FFF00', classroomNumber: '1'};
			sendMsg(data);
            });
			
		$('#connect').click(function(){
            data = {type:'connect',userID: $("#userId").val(), classroomNumber: '1'};
			sendMsg(data);
			console.log(data);
            });

		$('#disconnect').click(function(){
            data = {type:'disconnect',userID: $("#userId").val()};
			sendMsg(data);
			console.log(data);
            });

		function changeColor(color) {
			document.body.style.background =color;
		} 
			
			
		socket.onmessage = function(e) {
			console.log(e.data);
			var color = JSON.parse(e.data)["color"];
			changeColor(color);
		}
  

 })