function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
	const container = document.getElementById("container");
	container.style.setProperty('height', '0px');
	container.style.setProperty('width', '0px');
	activeGrid = [];
}

function createGrid() {
	clearBox("container");
	const container = document.getElementById("container");
	var r = parseInt(document.getElementById("Rows").value);
	var c = parseInt(document.getElementById("Cols").value);
	const newHeight = r*50 + 'px';
	const newWidth = c*50 + 'px';
	container.style.setProperty('height', newHeight);
	container.style.setProperty('width', newWidth);

	function makeRows(rows, cols) {
	  container.style.setProperty('--grid-rows', rows);
	  container.style.setProperty('--grid-cols', cols);
	  for (c = 0; c < (rows * cols); c++) {
		let cell = document.createElement("div");
		var id = 'grid-item-' + (c + 1);
		
		cell.setAttribute("id", id);
		//cell.innerText = (c + 1);
		container.appendChild(cell).className = "grid-item";
	  };
	};

	makeRows(r, c);
}

var activeGrid = [];

function removeItem(arr, value) {
	var index = arr.indexOf(value);
	if (index > -1) {
		arr.splice(index, 1);
	}
	return arr;
}

var list = document.querySelector('#container');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'DIV') {
     ev.target.classList.toggle('done');
	 if ( ev.target.getAttribute('class') == 'grid-item done') {
		 //console.log(ev.target.getAttribute('id'));
		 activeGrid.push(ev.target);
	 }
	 else {
		 removeItem(activeGrid, ev.target);
	 }
  }
}, false);

function changeColorArray(arr, color, time) {
	for (var i = 0; i < arr.length; ++i) {
		var gridId = arr[i].getAttribute('id');
		document.getElementById(gridId).style.backgroundColor =  color;
	}
	   
	setTimeout(function(){
		for (var i = 0; i < arr.length; ++i) {
		var gridId = arr[i].getAttribute('id');
		document.getElementById(gridId).style.backgroundColor = '';
	}
	}, time);
}

function changeColor(panelId, color, time){
	// // listen to all clicks on your page
	// window.addEventListener('select', (event) => {
	  // // if the clicked element has a class named check
	  // if (event.target.classList.contains('done')) {
		// // remove or add the class checked only from this element
		// event.target.style.backgroundColor = color;
	  // }
	// });
	
	// var list = document.querySelector('#container');
	// list.addEventListener('select', function(ev) {
	  // if (ev.target.tagName === 'done') {
		 // ev.target.classList.add('mystyle');
	  // }
	// }, false);
	
	var oldColor = []
	//var button  = document.getElementById('changecolorBtn');
	//button.style.visibility = 'hidden';
	//console.log(activeGrid.length);
	// for (var i = 0; i < activeGrid.length; ++i) {
		// var gridId = activeGrid[i].getAttribute('id');
		// console.log(document.getElementById(gridId).style.backgroundColor);
		// oldColor.push(document.getElementById(gridId).style.backgroundColor);
	// }
	
	for (var i = 0; i < activeGrid.length; ++i) {
		var gridId = activeGrid[i].getAttribute('id');
		//console.log(gridId);
		document.getElementById(gridId).style.backgroundColor =  color;
	}
	   
	setTimeout(function(){
		for (i = 0; i < activeGrid.length; ++i) {
		var gridId = activeGrid[i].getAttribute('id');
		document.getElementById(gridId).style.backgroundColor = '';
	}
	}, time);
}

function changeColorByPickForActiveGrid(){
	var time = document.getElementById("timeColor").value * 1000;
	var color = document.getElementById("favcolor").value;
	changeColorArray(activeGrid, color, time);
}

function mexicanWave() {
	var i = 0;
	var rows = parseInt(document.getElementById("Rows").value);
	var cols = parseInt(document.getElementById("Cols").value);
	var colorNumber = 0;
	var time = "50";
	
	var increase = parseInt(255 / (rows * cols));
	var multiply = parseInt((rows + cols) * 60 / 100);
	
	var frequency = 0.3;
	
	function myLoop() {
		setTimeout(function() {

			var arrGrid = [];
			var gridId = 'grid-item-' + (i + 1);
			var color = getColor(i, frequency);
			arrGrid.push(document.getElementById(gridId)); 
			changeColorArray(arrGrid, color, time * multiply);
			colorNumber += increase;
			i++;
			
			if ( i < (rows * cols)) {
				myLoop();
			}
		}, time)
	}
	myLoop();
}

//=====================================================
function RGB2Color(r,g,b) {
    return 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
}

function getColor(i, frequency) {
	//var frequency = 0.3;
	// var steps = 60;
	// var frequency = 2*Math.PI/steps;
	
	red   = Math.sin(frequency*i + 0) * 127 + 128;
	green = Math.sin(frequency*i + 2) * 127 + 128;
	blue  = Math.sin(frequency*i + 4) * 127 + 128;

	return RGB2Color(red,green,blue);
}

//======================================================

function changeColorAllGrid() {
	var time = document.getElementById("timeColorAll").value * 1000;
	var color = document.getElementById("colorAll").value;
	var rows = parseInt(document.getElementById("Rows").value);
	var cols = parseInt(document.getElementById("Cols").value);
	
	for (i = 0; i < (rows * cols); ++i) {
		var arrGrid = [];
			var gridId = 'grid-item-' + (i + 1);
			arrGrid.push(document.getElementById(gridId)); 
			changeColorArray(arrGrid, color, time);
	}
}

function changeColorRandom(numberGridLimit) {
	var i = 0;
	var limit = parseInt(numberGridLimit);
	var rows = parseInt(document.getElementById("Rows").value);
	var cols = parseInt(document.getElementById("Cols").value);
	var colorNumber = 0;
	var time = "250";
	var steps = 6;
	var frequency = 2*Math.PI/steps;
	
	function myLoop() {
		setTimeout(function() {

			var arrGrid = [];
			var randomGridId = Math.floor(Math.random() * (rows * cols));
			var gridId = 'grid-item-' + (randomGridId + 1);
			var randomColor = Math.floor(Math.random() * 256);
			var color = getColor(randomColor, frequency);
			arrGrid.push(document.getElementById(gridId)); 
			changeColorArray(arrGrid, color, time);
			i++;
			
			if ( i < limit) {
				myLoop();
			}
		}, "150")
	}
	if (limit > 0) {
		myLoop();
	}
}

function changeColorEpilepsy() {
	var maxIter = 7;
	var i  = 0;
	
	function myLoop() {
		var randomNumber = Math.floor(Math.random() * 10) + 1;
		setTimeout(function() {
			mexicanWave();
			var randomNumber = Math.floor(Math.random() * 25) + 1;
			changeColorRandom(randomNumber);
	
			i++;
			if ( i < maxIter) {
				myLoop();
			}
		}, "150");
	}
	
	myLoop();
}

function createSpecialColorButton() {
	document.addEventListener('keydown', function(event) {
		if (event.keyCode == 37) {
			alert('Left was pressed');

		}
		else if (event.keyCode == 39) {
			alert('Right was pressed');
		}
	}, true);
}

function readFileName() {
	document.getElementById('inputfile') 
            .addEventListener('change', function() { 
              
            var fr = new FileReader(); 
            fr.onload=function(){ 
                document.getElementById('output') 
                        .textContent=fr.result; 
            } 
              
            fr.readAsText(this.files[0]); 
        }) ;
}

function changeColorArrayByNote(note) {
	var arr = note.getArrGrid();
	var color = note.getColor();
	var time = note.getTime();
	
	for (var i = 0; i < arr.length; ++i) {
		var gridId = 'grid-item-' + arr[i];
		document.getElementById(gridId).style.backgroundColor =  color;
	}
	   
	setTimeout(function(){
		for (var i = 0; i < arr.length; ++i) {
			var gridId = 'grid-item-' + arr[i];
			document.getElementById(gridId).style.backgroundColor = '';
	}
	}, time);
}

function wtf() {
	let notes = [];
	var rows = parseInt(document.getElementById("Rows").value);
	var cols = parseInt(document.getElementById("Cols").value);
	var size = rows * cols;
	
	let allGreen = new Note(Array.from({length: size}, (_, i) => i + 1), "green", 250);
	notes.push(allGreen);
	let allRed = new Note(Array.from({length: size}, (_, i) => i + 1), "red", 250);
	notes.push(allRed);
	let allBlue = new Note(Array.from({length: size}, (_, i) => i + 1), "blue", 250);
	notes.push(allBlue);
	
	var spiral = getSpiralArr(rows, cols);
	var reverseSpiral = getReverSpiralArr(rows, cols);
	wtfLoop(notes);
	
	setTimeout(function() {
		spiralLoopOneColor(spiral, "lime", 30);
		setTimeout(function() {
			spiralLoopOneColor(reverseSpiral, "lime", 30);
		}, 40*spiral.length);
	}, 1000);
	
	
}

function wtfLoop(notes) {
	var maxIter = notes.length;
	var i  = 0;
	
	function myLoop() {
		setTimeout(function() {
			changeColorArrayByNote(notes[i]);
	
			i++;
			if ( i < maxIter) {
				myLoop();
			}
		}, notes[i].getTime());
	}
	
	myLoop();
}

function spiralLoopOneColor(grids, color, time) {
	var maxIter = grids.length;
	var i  = 0;
	
	function myLoop() {
		setTimeout(function() {
			let note = new Note([grids[i]], color, time*10);
			changeColorArrayByNote(note);
	
			i++;
			if ( i < maxIter) {
				myLoop();
			}
		}, time);
	}
	
	myLoop();
}

function getSpiralArr(n, m) {
	var max = m;
	var numbers = [];
	var k = 1;
	var l = 1;
	
	while ( k <= n && l <= m) {
		for (i = l; i <= m; ++i) {
			numbers.push((k - 1)*max + i);
		}
		k++;
		
		for (i = k; i <= n; ++i) {
			numbers.push((i - 1)*max + m);
		}
		m--;
		
		if (k <= n) {
			for (i = m; i >= l; i--) {
				numbers.push((n - 1)*max + i);
			}
			n--;
		}
		
		if (l <= m) {
			for (i = n; i >= k; i--) {
				numbers.push((i - 1)*max + l);
			}
			l++;
		}
		
	}
	
	return numbers;
}

function getReverSpiralArr(n, m) {
	var arr = getSpiralArr(n, m);
	var reverseArr = [];
	for (i = arr.length - 1; i >= 0; i--) {
		reverseArr.push(arr[i]);
	}
	
	return reverseArr;
	
}
