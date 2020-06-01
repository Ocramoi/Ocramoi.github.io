let poentEl = document.getElementById("pontuacao");
let soltarEl = document.getElementById("soltar");

let soltarQnt = 3;

const PLAYER_SIZE = new Vector(90, 90);

/**
* This is a class declaration
* This class is responsible for defining the player behavior
* There should be only one player in the game, so this is a Singleton class.
* If you'd like to know more about the singleton pattern, see this link:
* https://en.wikipedia.org/wiki/Singleton_pattern
*
* There should be only one player in the game, so this is a Singleton class.
* If you'd like to know more about the singleton pattern, see this link:
* https://en.wikipedia.org/wiki/Singleton_pattern
*
* This class extends the Entity class, which is responsible for binding the element's
* positons and directions. If you'd like to know more about class inheritance in javascript, see this link
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
*/
class Player extends Entity {
	/**
	* Will hold the player instance
	* @type { Player | null }
	*/
	static instance = null;

	/**
	* @argument { HTMLDivElement } containerElement The HTML element in which the player should be created
	*/
	constructor (containerElement) {
		// The `super` function will call the constructor of the parent class.
		// If you'd like to know more about class inheritance in javascript, see this link
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
		super(containerElement, PLAYER_SIZE, new Vector(PLAYER_SIZE.x/3, -145));

		// Assigns the player's image to it's element
		this.rootElement.style.backgroundImage = "url('assets/fisherman.png')";
		this.rootElement.style.zIndex = "-5";

		// Creates the player's hook instance.
		const hookOffset = new Vector(-27, -42);
		const hookPosition = this.position.add(hookOffset);
		// The onGoldHooked.bind is a function that will bind the `this` variable to it's
		// proper value. If you'd like to know more about this, see this link
		// https://www.freecodecamp.org/news/function-prototype-bind-and-function-prototype-length-in-javascript-explained/
		this.hook = new Hook(containerElement, hookPosition, this.onGoldHooked.bind(this));

		// Will hold the player's total score.
		this.score = 0;

		Player.instance = this;
	}

	/**
	* This funtion will be called whenever the hook catches gold, and it updates the
	* player's total score
	* @argument { Gold } goldElement
	*/
	onGoldHooked (goldElement) {
		this.score += goldElement.calculateScore();
		console.log('current player score is', this.score);
		this.updatePontuacao(this.score);
		GameMap.instance.verifyIfLevelIsOver();
	}

	throwHook () {
		this.hook.throw();
	}

	updatePontuacao(score)
	{
		poentEl.innerText = "Pontos: " + score;
		new Audio("bass.mp3").play();
	}

	updateSoltar(qnt)
	{
		soltar.innerText = "Soltar: " + (qnt < 900 ? qnt : "∞");
	}

	releaseHook()
	{
		if(soltarQnt > 0)
		{
			this.updateSoltar(--soltarQnt);
			this.hook.release();
		}
	}
}