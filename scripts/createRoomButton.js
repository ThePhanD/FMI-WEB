(function() {
	const createRoom = document.getElementById('room-create');

	var cookies = document.cookie;
	//console.log(cookies);
	/*	If you want to find the value of one specified cookie, 
		you must write a JavaScript function that searches for the cookie value in the cookie string. */
	var flag = getCookie("isAdmin");
	//console.log(flag);

	if(flag == 0) {
		createRoom.style.display = "none";
    }
	else {
		createRoom.style.display = "inline";
	}
})();
