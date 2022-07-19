const board = document.querySelector('.sketchboard');
const colorPicker = document.querySelector('.color-picker');
const colorPickButton = document.querySelector('.color-custom');
const rainbowButton = document.querySelector('.color-rainbow');
const eraseButton = document.querySelector('.erase');
const resetButton = document.querySelector('.reset');

let mouseDown = false;
let color = '#000';
let usingRandomColor = false;
let pixels = [];
let currentWidth;

function setSketchGrid(width) {
    let count = width * width;
    let pixelWidth = board.offsetWidth/width;
    pixels = [];

    for (let i = 1; i <= count; i++) {
        let div = document.createElement('div');
        div.classList.add('pixel');
        div.style.width = div.style.height = pixelWidth;
        div.addEventListener('mouseover', (e) => paintPixel(e));
        pixels.push(div);
    }

    board.replaceChildren(...pixels);
    board.style.cssText = `grid-template-columns: repeat(${width}, ${100/width}%);`;
}

function paintPixel(e) {
    if (usingRandomColor) changeColor(getRandomColor());
    if (!e.target.classList.contains('pixel')) return;
    if (mouseDown) e.target.style.backgroundColor = color;
}

function changeColor(newColor) {
    color = newColor;
}

function useRandomColor() {
    usingRandomColor = true;
}

function getRandomColor() {
    let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}

function reset() {
    pixels.forEach(elem => elem.style.backgroundColor = '#f6f6f6');
}


document.addEventListener('DOMContentLoaded', setSketchGrid(25));
document.addEventListener('mousedown', (e) => {
    e.preventDefault(); //stop browser dragging while drawing
    mouseDown = true;
    paintPixel(e);
});
document.addEventListener('mouseup', () => mouseDown = false);


colorPicker.addEventListener('input', (e => {
    usingRandomColor = false;
    changeColor(e.target.value); //change color to picked value
}));
colorPickButton.addEventListener('click', () => {
    usingRandomColor = false;
    changeColor(colorPicker.value);
});
rainbowButton.addEventListener('click', useRandomColor)
eraseButton.addEventListener('click', () => {
    usingRandomColor = false;
    changeColor('#f6f6f6'); //background color
});
resetButton.addEventListener('click', reset);


let sizePickers = document.querySelectorAll('.size-picker')
sizePickers.forEach(button => button.addEventListener('click', (e) => {
    setSketchGrid(Number(e.target.dataset.size));
}));