const MUSICA = new Audio("loneStar.mp3");
let playing = false;

// This is the container of all Entities
const movableEntityContainer = document.getElementById('movable-entity-container');

const map = new GameMap(movableEntityContainer);
const player = new Player(movableEntityContainer);

alert("Bem vindo ao jogo! Para lançar o anzol use SPACEBAR e para soltar o objeto use E. Seu objetivo é pescar lindos Robalos (ou, em inglês, BASS). Boa sorte!");

// This is the game frame function. It is responsible for updating everything in the game.
function frame () {
	map.frame();
}

// This function will run every time the player presses a key
document.body.addEventListener('keydown', event => {
	if(!playing)
	{
		MUSICA.play();
		MUSICA.loop = true;
		playing = true;
	}
	// if that key is the spacebar, the player will try to throw it's hook.
	if (event.key === ' ') player.throwHook();
	else if (event.key === 'e' || event.key === 'E') player.releaseHook();
});

// Registers the frame function to run at every frame.
// if you'd like to know more about intervals, see this link
// https://javascript.info/settimeout-setinterval
const intervalHandler = setInterval(frame);
