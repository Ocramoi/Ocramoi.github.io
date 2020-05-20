/**
* This is a class declaration
* This class is responsible for defining the Asteroids's behavior.
* this class extends the MovableEntity class, which is responsible for defining physics behavior
* If you'd like to know more about class inheritance in javascript, see this link
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
*/
class StarDestroyer extends MovableEntity {
	constructor (
		containerElement,
		mapInstance,
		initialPosition
	) {
		const size = 120;
		const direction = StarDestroyer.getRandomDirection();

		// The `super` function will call the constructor of the parent class.
		// If you'd like to know more about class inheritance in javascript, see this link
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
		super(containerElement, size, initialPosition, initialPosition.scale(-0.0003), 
			new Vector(initialPosition.x, initialPosition.y));
		this.mapInstance = mapInstance;
		this.rotationSpeed = 0;

		// This is so the map can execute the player's physics (see the `frame` function
		// in the `map.js` file
		mapInstance.addEntity(this);

		// initializes the asteroid's life to it's maximum.
		this.life = 10;

        this.rootElement.style.backgroundImage = `url('assets/star_destroyer.png')`;
		this.rootElement.style.backgroundSize = size*1.8 + 'px';
		this.rootElement.style.width = size*2 + 'px';
		this.rootElement.style.height = size + 'px';
	}
    
    /**
	* Uppon collision with a bullet, reduces the asteroid's life. If the asteroid
	* has zero life, destroy it.
	* @argument { MovableObject } object
	*/
	collided (object, pontuacao) {
		// the instanceof operator will check if an object was created by a class, or one of it's children.
		// If you'd like to know more about the instanceof operator, see this link:
		// https://www.geeksforgeeks.org/instanceof-operator-in-javascript/
		if (!(object instanceof Bullet || object instanceof BulletBig || object instanceof BulletSmall)) return;

		if(object instanceof Bullet) this.life--;
		else if (object instanceof BulletBig) this.life -= 2;
		else if(object instanceof BulletSmall) this.life -= 0.5
		if (this.life <= 0) {
			this.mapInstance.removeEntity(this);
			this.delete();
			return 1;
		}
		return 0;
	}

	/*
	* This function should be called every game frame. It will not only update the
	* asteroid's physics, but also rotate it based on it's rotation speed.
	*/
	frame () {
		super.frame();
		this.setDirection(this.direction.rotate(this.rotationSpeed));
    }
    
    static getRandomDirection () {
		return new Vector(Math.random(), Math.random());
	}
}