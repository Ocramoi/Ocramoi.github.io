const playerHpElement = document.getElementById('player-health');
const playerTotalHp = 274;
let playerHp = 274;

const opponentHpElement = document.getElementById('opponent-health');
const opponentTotalHp = 292;
let opponentHp = 292;

const turnText = document.getElementById('text');
let isTurnHappening = false;

let freeze = 0;
let firstRound = true;
let roundChange = false;

const playerAttacks = {
  distanciamento: {
    power: 40,
    accuracy: 100,
    name: 'Distanciamento Social',
    type: 'convivio',
  },
  alcool: {
    power: 40,
    accuracy: 100,
    name: 'Álcool em gel',
    type: 'normal',
  },
  mascara: {
    power: 110,
    accuracy: 70,
    name: 'Máscara M95',
    type: 'convivio',
  },
  desinfetante: {
    power: 80,
    accuracy: 80,
    name: 'Desinfetante',
    type: 'fighting',
  }
}

const opponentAttacks = {
  tackle: {
    power: 40,
    accuracy: 100,
    name: 'Pneumonia',
    type: 'normal',
  },
  bubble: {
    power: 40,
    accuracy: 100,
    name: 'Febre',
    type: 'water',
  },
  waterGun: {
    power: 40,
    accuracy: 100,
    name: 'Tosse Seca',
    type: 'water',
  },
  hydroPump: {
    power: 110,
    accuracy: 80,
    name: 'Dor de Cabeça',
    type: 'water',
  }
}

class Lysol
{
	updateHp(newHP) {
		playerHp = Math.max(newHP, 0);
		// If oppont health is equal 0 player wins
		if (playerHp === 0) {
			gameOver('Jogador');
		}

		// Update the opponents hp bar
		const barWidth = (opponentHp / opponentTotalHp) * 100;
		playerHpElement.style.width = barWidth + '%';
	}

	animateAttack()
	{
		document.getElementById("LysolImg").setAttribute("src", "assets/lysolAttack.gif");
		setTimeout(() => {document.getElementById("LysolImg").setAttribute("src", "assets/lysolIdle.png");}, 2000);
	}

	attack(attack)
	{
		if(Math.floor(Math.random() * 101) <= attack.accuracy)
		{
			this.animateAttack();
			if(attack.name == "Distanciamento Social" && Math.floor(Math.random() * 2) == 0)
				freeze = 2;
			if(attack.type == "convivio")
				enemy.updateHp(opponentHp - attack.power*2)
			else
				enemy.updateHp(opponentHp - attack.power);
			return true;
		}
		else
			return false;
	}
}

class Coronga 
{
	updateHp(newHP)
	{
		opponentHp = Math.max(newHP, 0);
		// If oppont health is equal 0 player wins
		if (opponentHp === 0) {
			gameOver('Jogador');
		}
		// Update the opponents hp bar
		const barWidth = (opponentHp / opponentTotalHp) * 100;
		opponentHpElement.style.width = barWidth + '%';
	}

	animateAttack()
	{
		document.getElementById("CoronaImg").setAttribute("src", "assets/coronaAttack.gif");
		setTimeout(() => {document.getElementById("CoronaImg").setAttribute("src", "assets/coronaIdle.gif");}, 2000);
	}

	attack(attack)
	{
		if(willAttackHit(attack.accuracy))
		{
			this.animateAttack();
			player.updateHp(playerHp - attack.power);
			return true;
		}
		else
			return false;
	}
}

function gameOver (winner) {
	if(firstRound)
	{
		switch(winner)
		{
			case "Coronga":
				setTimeout(() => {
					// Update HTML text with the winner
					turnText.innerText = winner + ' ganhou!';
					// Open alert with the winner
					var resp = confirm(winner + ' ganhou! Clique OK para jogar de novo');
					if(resp)
						window.location.reload();
					else
						window.open("https://twitter.com/0cramoi", "_self");
				}, 1000);
				break;
			case "Jogador":
				setTimeout(() => {
					// Update HTML text with the winner
					turnText.innerText = winner + ' ganhou!';
					// Open alert with the winner
					alert(winner + ' ganhou! Se prepare para o próximo round!');
					enemy.updateHp(opponentTotalHp);
					player.updateHp(playerTotalHp);
					freeze = 0;
					document.getElementById("round").innerText = "ROUND 2";
					roundChange = true;
				}, 1000);
				break;
		}
		firstRound = !firstRound;
	}
	else
	{
		setTimeout(() => {
			// Update HTML text with the winner
			turnText.innerText = winner + ' ganhou!';
			// Open alert with the winner
			var resp = confirm(winner + ' ganhou! Clique OK para jogar de novo');
			if(resp)
				window.location.reload();
			else
				window.open("https://twitter.com/0cramoi", "_self");
		}, 1000);
	}
}

// Check if attacks hits
function willAttackHit (accuracy) {
  return Math.floor(Math.random() * 100) <= accuracy;
}

function chooseOpponentAttack () {
	// Put all opponents attacks in a array
	const possibleAttacks = Object.values(opponentAttacks);

	// Randomly chooses one attack from the array
	return possibleAttacks[Math.floor(Math.random() * possibleAttacks.length)];
}

var player = new Lysol();
var enemy = new Coronga();

function turn(playerChosenAttack) {
  // Don't start another turn till the current one is not finished
  if (isTurnHappening) {
    return;
  }
  isTurnHappening = true;

  const didPlayerHit = player.attack(playerChosenAttack);

  // Update HTML text with the used attack
  turnText.innerText = 'Jogador usou ' + playerChosenAttack.name;
  if(playerChosenAttack.type == "convivio" && didPlayerHit)
  	turnText.innerText += ' seguindo diretrizes de convívio da OMS!';

  // Update HTML text in case the attack misses
  if (!didPlayerHit) {
    turnText.innerText += ', mas errou!';
  }

  // Wait 2000ms to execute opponent attack (Player attack animation time)
  setTimeout(() => {
	if(freeze > 0)
	{
		freeze--;
		turnText.innerText = 'Coronga não pode atacar!';
	}
	else if(!roundChange)
    {
		// Randomly chooses opponents attack
		const opponentChosenAttack = chooseOpponentAttack();

		const didOpponentHit = enemy.attack(opponentChosenAttack);

		// Update HTML text with the used attack
		turnText.innerText = 'Coronga usou ' + opponentChosenAttack.name;

		// Update HTML text in case the attack misses
		if (!didOpponentHit) {
			turnText.innerText += ', mas errou!';
		}
	}
	else
		roundChange = false;

    // Wait 2000ms to end the turn (Opponent attack animation time)
    setTimeout(() => {
      // Update HTML text for the next turn
      turnText.innerText = 'Escolha um ataque';
      isTurnHappening = false;
	}, 2000);
	
  }, 2000);
}

// Set buttons click interaction
document.getElementById('distanciamento-button').addEventListener('click', function() {
  turn(playerAttacks.distanciamento);
});
document.getElementById('alcool-button').addEventListener('click', function() {
  turn(playerAttacks.alcool);
});
document.getElementById('mascara-button').addEventListener('click', function() {
  turn(playerAttacks.mascara);
});
document.getElementById('desinfetante-button').addEventListener('click', function() {
  turn(playerAttacks.desinfetante);
});
