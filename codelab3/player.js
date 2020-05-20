const PLAYER_SIZE = 40;

/**
* This is a class declaration
* This class is responsible for defining the player behavior
* There should be only one player in the game, so this is a Singleton class.
* If you'd like to know more about the singleton pattern, see this link:
* https://en.wikipedia.org/wiki/Singleton_pattern
*
* this class extends the MovableEntity class, which is responsible for defining physics behavior
* If you'd like to know more about class inheritance in javascript, see this link
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
*/
class Player extends MovableEntity {

	/**
	* @argument { HTMLDivElement } containerElement The HTML element in which the player
	* should be created. This will allow us to have more control over the player's styles
	* @argument { Map } mapInstance A reference to the game's map. It will be used
	* to instantiate Bullet objects (see the `shoot` function below).
	* @argument { Function } gameOverFunction A function to be called in case the
	* player is hit by an asteroid (so, gameover).
	*/
	constructor (
		containerElement,
		mapInstance,
		gameOverFunction,
	) {

		// The `super` function will call the constructor of the parent class.
		// If you'd like to know more about class inheritance in javascript, see this link
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
		super(containerElement, PLAYER_SIZE);

		this.mapInstance = mapInstance;
		this.containerElement = containerElement;
		this.gameOverFunction = gameOverFunction;

		// This is so the map can execute the player's physics (see the `frame` function
		// in the `map.js` file
		mapInstance.addEntity(this);

		// Assigns the player's image to it's element
		this.rootElement.style.backgroundImage = "url('assets/falcon.png')";
		this.rootElement.style.backgroundSize = this.size + 'px';
	}

	/**
	* Will rotate the player's model
	* @argument { number } degrees
	*/
	turn (degrees) {
		this.setDirection(this.direction.rotate(degrees));
	}

	rot(e)
	{
		this.setDirection(new Vector(((e.clientX - this.position.x)/window.innerWidth - 0.5) * 2, 
									 ((e.clientY - this.position.y)/window.innerHeight - 0.5) * 2));
	}

	/**
	* Instantiates a bullet in front of the player.
	*/
	shoot () {
		new Bullet (this.containerElement, this.position, this.mapInstance, this.direction);
	}
	shootBig () {
		new BulletBig (this.containerElement, this.position, this.mapInstance, this.direction);
	}
	shootSmall () {
		new BulletSmall (this.containerElement, this.position, this.mapInstance, this.direction);
	}

	/**
	* This is only called if the player collides with an asteroid. Therefore,
	* the game should end.
	*/
	collided () {
		this.gameOverFunction();
	}

	move(x, y)
	{
		if(x > 0 && this.position.x < 150)
			this.position.x += x;
		else if(x < 0 && this.position.x > -150)
			this.position.x += x;
		
		if(y > 0 && this.position.y < 150)
			this.position.y += y;
		else if(y < 0 && this.position.y > -150)
			this.position.y += y;
		
		this.rootElement.style.left = this.position.x + 'px';
		this.rootElement.style.top = this.position.y + 'px';
	}
}