function getFirePixels(time) {
	var fire = [];
	var backgroundPixels = [
		1, 2, 3, 4, 	6, 7, 8, 9 ,10, 
		11, 12, 13, 14, 15, 16, 	18, 19, 20,
		21, 22, 	24, 	26, 27, 28, 29, 30,
		31, 32, 33, 34, 		37, 	39, 40,
		41, 	43, 				48, 	50,
		51, 52, 						59, 60,
		61, 62, 63,					68, 69, 70,
		71, 72, 73, 74, 		77, 78, 79, 80,
		81, 82, 83, 				88, 89, 90,
		91, 92,							99, 100
	];
		
	let backgroundNote = new Note(backgroundPixels, "white", time);
	fire.push(backgroundNote);
	
	var redPixels = [ 5, 23, 25, 35, 36, 38, 42, 44, 47, 49, 53, 58, 64, 67, 75, 76 ];
	let redNote = new Note(redPixels, "red", time);
	fire.push(redNote);
	
	var orangePixels = [ 17, 45, 46, 54, 57, 65 ];
	let orangeNote = new Note(orangePixels, "orange", time);
	fire.push(orangeNote);
	
	var yellowPixels = [ 55, 56, 66 ];
	let yellowNote = new Note(yellowPixels, "yellow", time);
	fire.push(yellowNote);
	
	var blackPixels = [ 85, 94, 96 ];
	let blackNote = new Note(blackPixels, "black", time);
	fire.push(blackNote);
	
	var darkRedPixels = [ 84, 86, 87, 93, 95, 97, 98 ];
	let darkRedNote = new Note(darkRedPixels, "#8B0000", time);
	fire.push(darkRedNote);
	
	return fire;
}

function showColorFire(fireArr) {
	for (i = 0; i < fireArr.length; ++i) {
		var fireNote = fireArr[i];
		var gridArr = fireNote.getArrGrid();
		var color = fireNote.getColor();
		var time = fireNote.getTime();
		
		for (var j = 0; j < gridArr.length; ++j) {
			var gridId = 'grid-item-' + gridArr[j];
			document.getElementById(gridId).style.backgroundColor =  color;
		}
	}
	   
	setTimeout(function(){
		for (var i = 1; i <= 100; ++i) {
			var gridId = 'grid-item-' + i;
			document.getElementById(gridId).style.backgroundColor = '';
		}
	}, time);
}

function showFire() {
	var rows = parseInt(document.getElementById("Rows").value);
	var cols = parseInt(document.getElementById("Cols").value);
	if ( rows * cols == 100) {
		var time = 2000;
		var fireArr = getFirePixels(time);
		showColorFire(fireArr);
	}
}



