//Opening Area and Start Button
const startButton = document.getElementById('start-button');
const openingSection = document.getElementById('opening-section');

openingSection.style.display = '';

//Canvas
const myCanvas = document.getElementById('canvas');
const ctx = myCanvas.getContext('2d');

myCanvas.style.display = 'none';


//Arrow Controls
const arrowControls = document.querySelector('.arrow-controls');
arrowControls.style.display = 'none';

//Start Button
window.onload = () => {

    startButton.onclick = () => {
        openingSection.style.display = 'none';
        myCanvas.style.display = '';
        arrowControls.style.display = '';
  };

};