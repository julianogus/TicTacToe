import makeMatrices from './makeMatrices';

export default function game(){
	let canvas = document.getElementById("grid");

	let gameEndQM = false;

	let c = canvas.getContext("2d");

	let textDoc = document.getElementById("checkTurn");

	let turn = 0;

	let continueVal = true;

	let tileSize = 160;

	let arrTiles = makeMatrices(3,3);
	let returnArray = makeMatrices(3,3);
	let nTiles = 9;
	let x,y;

	canvas.width = tileSize*3+2*2;
	canvas.height = tileSize*3+2*2;

	let mouse = {
		x: undefined,
		y: undefined,
		click: false 
	};

	function getLocation(){
		let coordinates = canvas.getBoundingClientRect();
		return { x: coordinates.x, y: coordinates.y };
	}

	function remake(ans){
		if(ans === "y"){
			makeGrid();
			gameEndQM = false;
			mouse.x = false;
			mouse.y = false;
		} else {
			canvas.removeEventListener("click", checkMouse);
			document.getElementById("grid").className += "-locked";
		}
	}

	function gameEnd(){
		let ans = undefined;
		if(turn%2){
			textDoc.innerHTML = "Game Won!";
			ans = prompt("Game Won! Continue? (y/n)","y");
		} else {
			textDoc.innerHTML = "Game Lost!";
			ans = prompt("Game Lost! Continue? (y/n)","y");
		}
		remake(ans);
	}

	function gameDraw(){
		textDoc.innerHTML = "Draw!";
		let ans = prompt("Draw! Continue? (y/n)","y");
		remake(ans);
	}

	let locationCanvas = getLocation();

	window.addEventListener("resize",function(){
		mouse.x = false;
		mouse.y = false;
		locationCanvas = getLocation();
	});

	function checkMouse(event){
			mouse.x = event.x;
			mouse.y = event.y;
			mouse.click = true;
			animate();
	}

	canvas.addEventListener("click", checkMouse);

	function makeGrid(){
		turn = 0;
		y = 0;
		for(let i = 0; i < 3; i++){
			x = 0;
			for(let j = 0; j < 3; j++){
				arrTiles[i][j] = new Tile(x,y,j,i);
				returnArray[i][j] = '0';
				x+= tileSize + 2;
			}
			y+= tileSize + 2;
		}
	}

	makeGrid();

	function Tile(x,y, arrX, arrY){
		this.clicked = false;
		this.color = "#F2CC0C";
		this.coord = {
			x: x,
			y: y
		};

		this.arr = {
			x: arrX,
			y: arrY
		};

		this.clickable = true;
		this.inner = "blank";

		this.width = {
			min: this.coord.x + locationCanvas.x,
			max: this.coord.x + locationCanvas.x + tileSize 
		}

		this.height = {
			min: this.coord.y + locationCanvas.y,
			max: this.coord.y + locationCanvas.y + tileSize 
		}

		this.checkWon = function(){
			let n = 0;
			let i = 0;
			let diagonal = false;

			// Checks horizontally
			switch(this.arr.x+1){
				case 1:
					i = 0;
					break;
				case 2:
					i = 1;
					break;
				case 3:
					i = 2;
					break;
			}

			for(let x = 0; x < 3; x++){
				if(arrTiles[this.arr.y][this.arr.x+(x-i)].inner === this.inner){
					n++;

				}
			}

			if(n < 3){
				n = 0;
			}

			// Checks vertically

			switch(this.arr.y+1){
				case 1:
					i = 0;
					break;
				case 2:
					i = 1;
					break;
				case 3:
					i = 2;
					break;
			}

			for(let x = 0; x < 3; x++){
				if(arrTiles[this.arr.y+(x-i)][this.arr.x].inner === this.inner){
					n++;
				}
			}

			if(n < 3){
				n = 0;
			}

			// Checks if tile marked is on the main diagonal or the antidiagonal

			let w = 2;

			for(let i = 0; i < 3; i++, w--){
				if(arrTiles[(w)][(w)] === this){
					for(let k = 0; k < 3; k++){
						if(arrTiles[k][k].inner === this.inner){
							n++;
						}
					}
				} 

				if(n >= 3){
					break;
				} else {
					n = 0;
				}

				if(arrTiles[w][i] === this){
					for(let o = 0, k = 2; o < 3; o++, k--){
						if(arrTiles[o][k].inner === this.inner){
							n++;
						}
					}
					break;
				}

			}

			if(n >= 3){
				gameEndQM = true;
			}
			
		};

		this.update = () => {
			let turnQM = false;
			this.clicked = ( mouse.x >= this.width.min && mouse.x <= this.width.max && 
				(mouse.y >=  this.height.min && mouse.y <= this.height.max) );
			 if( this.clickable === true && this.clicked === true){
				 if(this.inner == "blank"){
					 turnQM = true;
				 }
				 if(turn%2 === 0){
					this.inner = "cross";
					returnArray[this.arr.y][this.arr.x] = "1";
				 } else {
					this.inner = "circle";
					returnArray[this.arr.y][this.arr.x] = "2";
				 }
				 if(turnQM){
					 turn ++;
					 botTurn = !botTurn;
				 }
			 }
			this.draw();
		};

		this.drawCross = function(){

			c.strokeStyle = "#13F2DC";    
			c.lineWidth = 25;    
			c.beginPath();    

			c.moveTo(this.coord.x - 50 + tileSize/2, this.coord.y - 50+ tileSize/2);    
			c.lineTo(this.coord.x + 50 + tileSize/2, this.coord.y + 50+ tileSize/2);    

			c.moveTo(this.coord.x + 50+ tileSize/2, this.coord.y - 50+ tileSize/2);    
			c.lineTo(this.coord.x - 50+ tileSize/2, this.coord.y + 50+ tileSize/2);    
			c.stroke();    

		}

		this.drawCircle = function(){
			c.beginPath();
			c.lineWidth = 20;
			c.arc(this.coord.x+(tileSize/2),this.coord.y+(tileSize/2),tileSize/3,0,Math.PI*2,false);
			c.strokeStyle = "#ED7117";
			c.stroke();
		}

		this.draw = function(){
			c.fillStyle = this.color;
			c.fillRect(this.coord.x, this.coord.y, tileSize, tileSize);

			switch(this.inner){
				case false:
					break;
				case "cross":
					this.drawCross();
					break;
				case "circle":
					this.drawCircle();
					break;
				default:
					break;
			}

			if(mouse.click === true && this.clicked === true && this.clickable === true){

				this.checkWon();

				this.clicked = false; 
				this.clickable = false;

			}

		};
	}

	async function updateFunction(botVal){
		for(let x = 0; x < 3; x++){
			for(let n = 0; n < 3; n++){
				arrTiles[x][n].update();
			}
		}
		if(turn%2 === 0){
			textDoc.innerHTML = "Player turn";
		} else {
			textDoc.innerHTML = "Bot";
		}
		if(gameEndQM){
			botTurn = false;
			requestAnimationFrame(animate);
			setTimeout( () => {gameEnd()}, 500);
		} else {
			setTimeout( () => {requestAnimationFrame(animate);}, 500);
		}

		if(turn === 9 && !(gameEndQM)){
			gameDraw();
		}
		
	}

	async function resolveFunction(){
		const data = { "arr": returnArray };
		const url = "http://127.0.0.1:5000/feed_data";
		const options = {
			 method: "POST",
			 headers: {
				 "Content-Type": "application/json"
			 },
			 body: JSON.stringify(data)
		};
		let resolve = await fetch(url,options);
		let response = await resolve.json();
		let object = (arrTiles[response[0]]).find (e => e.arr.x === response[1]);
		mouse.click = true;
		mouse.x = object.coord.x+locationCanvas.x;
		mouse.y = object.coord.y+locationCanvas.y;
		return object;
	}

	let botTurn = false;

	updateFunction();

	animate();

	async function animate(){
		if(mouse.click === true && (turn%2 == 0) ){
			await updateFunction(false);
			mouse.click = false;
			if(!(gameEndQM)){
				botTurn = true;
			}
		} else if (turn != 0 && turn !== 9 && turn%2 == 1 && botTurn == true){
			let object = await resolveFunction();
			await updateFunction(true);
			mouse.click = false;
			botTurn = false;
		}
	}
}
