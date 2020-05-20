const BULLETB_SIZE = 20;
const BULLETB_SPEED = 0.3;

/**
* This is a class declaration
* This class is responsible for defining the bullets behavior.
* this class extends the MovableEntity class, which is responsible for defining physics behavior
* If you'd like to know more about class inheritance in javascript, see this link
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
*/
class BulletBig extends MovableEntity {

	/**
	* @argument { HTMLDivElement } containerElement The DOM element that will contain the bullet
	* @argument { Map } mapInstance The map in which the bullet will spawn
	* @argument { Vector } direction The bullet's direction
	*/
	constructor (
		containerElement,
		playerPos,
		mapInstance,
		direction
	) {
		// The `super` function will call the constructor of the parent class.
		// If you'd like to know more about class inheritance in javascript, see this link
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
		super(containerElement, BULLETB_SIZE, playerPos, direction.normalize().scale(BULLETB_SPEED), direction);

		this.mapInstance = mapInstance;

		// This is so the map can execute the player's physics (see the `frame` function
		// in the `map.js` file
		mapInstance.addEntity(this);

		// Assigns the bullet's image to it's element
		this.rootElement.style.backgroundImage = "url('assets/bulletBig.png')";
		this.rootElement.style.backgroundSize = this.size + 'px';
	}

	// If the bullet collides with an asteroid, delete the bullet.
	collided (object) {
		if (object instanceof Asteroid || object instanceof StarDestroyer || object instanceof Tiefighter) {
			this.mapInstance.removeEntity(this);
			this.delete();
		}
	}
}