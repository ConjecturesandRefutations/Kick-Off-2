let currentColor = 'ballOne';

function handleBallChange(event) {
    event.stopPropagation();
      currentColor = event.target.value;
  }