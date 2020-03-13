const screen = document.querySelector('#screen');
const context = screen.getContext('2d');

function createGame() {
  const state = {
    players: {
      player1: { x: 2, y: 2 },
      player2: { x: 9, y: 7 },
    },
    fruits: {
      fruit1: { x: 3, y: 5 },
    }
  };

  function movePlayer(command) {
    const keyPressed = command.keyPressed;
    const player = state.players[playerId];

    console.log(playerId, keyPressed);

    if (keyPressed === 'ArrowUp' && player.y > 0) {
      player.y -= 1;
      return;
    }

    if (keyPressed === 'ArrowDown' && player.y + 1 < screen.width) {
      player.y += 1;
      return;
    }

    if (keyPressed === 'ArrowLeft' && player.x > 0) {
      player.x -= 1;
      return;
    }

    if (keyPressed === 'ArrowRight' && player.x + 1 < screen.width) {
      player.x += 1;
      return;
    }
  }

  return {
    movePlayer,
    state,
  };
}

function createKeyboardListener() {
  const state = {
    observers: [],
  };

  function subscribe(observerFunction) {
    console.log('NEW FUNCTION HAS SUBSCRIBED!');
    state.observers.push(observerFunction);
  }

  function notifyAll(command) {
    console.log('NOTIFYING ALL OBSERVERS!');
    for (const observerFunction in state.observers) {
      observerFunction(command);
    }
  }

  document.addEventListener('keydown', handleEventKeydown);

  function handleEventKeydown(event) {
    const keyPressed = event.key;

    const command = {
      playerId: 'player1',
      keyPressed,
    }

    notifyAll(command);
  }

  return {
    subscribe,
  }
}

const game = createGame();
const keyboardListener = createKeyboardListener();
keyboardListener.subscribe(game.movePlayer);

function renderScreen() {
  context.fillStyle = 'white';
  context.clearRect(0, 0, 10, 10);

  for (const playerId in game.state.players) {
    const player = game.state.players[playerId];
    context.fillStyle = 'blue';
    context.fillRect(player.x, player.y, 1, 1);
  }

  for (const fruitId in game.state.fruits) {
    const fruit = game.state.fruits[fruitId];
    context.fillStyle = 'red';
    context.fillRect(fruit.x, fruit.y, 1, 1);
  }

  requestAnimationFrame(renderScreen);
}

renderScreen();
