const PLAYER_VEL = 0.4;

let menuTempo = document.getElementById("timer");
let tempoInit = new Date().getTime();

let timer = setInterval(() => { menuTempo.innerText = `Tempo de jogo: ${(new Date().getTime() - tempoInit)/1000}s`;});

// This is the container of all movableEntities
const movableEntityContainer = document.getElementById('movable-entity-container');

// creates the single only map instance in the game.
// There should be only one map in the game, so it is a Singleton class.
// If you'd like to know more about the singleton pattern, see this link:
// https://en.wikipedia.org/wiki/Singleton_pattern
const map = new Map(movableEntityContainer);

// creates the single only player instance in the game.
const player = new Player(
	movableEntityContainer,
	map,
	gameOver
);

// This is the game frame function. It is responsible for updating everything in the game.
function frame () {
	map.frame();

	// if the player is pressing one of the keys, call the turn function
	if (pressedKeys['a'] || pressedKeys['ArrowLeft']) player.move(-PLAYER_VEL, 0);
	if (pressedKeys['d'] || pressedKeys['ArrowRight']) player.move(PLAYER_VEL, 0);
	if (pressedKeys['w'] || pressedKeys['ArrowUp']) player.move(0, -PLAYER_VEL);
	if (pressedKeys['s'] || pressedKeys['ArrowDown']) player.move(0, PLAYER_VEL);
}

var flagOver = false;
document.addEventListener("mousemove", (e) =>
{
	if(!flagOver) player.rot(e);
});

// This is a dictionary that will hold the keys that are being held down at the time.
// If you'd like to know more about dictionaries, see this link:
// https://pietschsoft.com/post/2015/09/05/javascript-basics-how-to-create-a-dictionary-with-keyvalue-pairs
const pressedKeys = {};

// This function will run every time the player presses a key
document.body.addEventListener('keydown', event => {
	// if that key is the spacebar, the player will shoot.
	if (event.key === ' ' && !pressedKeys[' ']) player.shoot();
	if (event.key === 'e' && !pressedKeys['e']) player.shootBig();
	if (event.key === 'q' && !pressedKeys['q']) player.shootSmall();

	// add the pressed key to the pressedKey dictionary
	pressedKeys[event.key] = true;
});

// This function will run every time the player releases a key
document.body.addEventListener('keyup', event => {
	// removes the pressed key to the pressedKey dictionary
	delete pressedKeys[event.key];
});

// Registers the frame function to run at every frame.
// if you'd like to know more about intervals, see this link
// https://javascript.info/settimeout-setinterval
const intervalHandler = setInterval(frame);

// This is the function that will end the game
function gameOver () {
	// This will unregister the frame function, so nothing else will be updated
	clearInterval(intervalHandler);
	clearInterval(timer);
	flagOver = true;
	alert('Você perdeu');
}