import { useState, useEffect } from 'react'
import './App.css';
//import { gameState } from './ticTacToe'
import game from './ticTacToe'

function App() {

	game();
	
	/*
	let val;

	const getGameState = async () => {
		val = await gameState;
		console.log(val);
	}

	//getGameState();

	useEffect( () => {
		console.log("HEY!");
		val += 1;
	}, [val]);

	/*
	let [ gameData, getGameData ] = useState(null);

	let val;

		const getData = async () => {
			//getGameData(await game);
			//setGameData(val);
			//console.log(gameData);
			console.log(val);
		};

		getData();


	useEffect( () => {
		console.log(val);

	}, [val]);

	setTimeout(() => {val = 2;}, 2000);
	*/


  return (
	<div>
	</div>
  );
}

export default App;
