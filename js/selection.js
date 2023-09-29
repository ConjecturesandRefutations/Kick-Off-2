let currentOpponent = 'opponentOne';
let currentColor = 'ballOne';

function handleOpponentChange(event) {
  event.stopPropagation();
    currentOpponent = event.target.value;
}

function handleBallChange(event) {
  event.stopPropagation();
    currentColor = event.target.value;
}
