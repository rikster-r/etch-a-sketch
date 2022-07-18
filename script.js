const board = document.querySelector('.sketchboard');
let mouseDown = false;
let color = '#000';
let usingRandomColor = false;

function setSketchGrid(width) {
    let count = width * width;
    for (let i = 1; i <= count; i++) {
        let div = document.createElement('div');
        div.classList.add('pixel');
        div.style.width = div.style.height = board.offsetWidth/width;

        board.append(div);
    }

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
    pixels.forEach(elem => elem.style.backgroundColor = '#f6f6f6')
}


document.addEventListener('DOMContentLoaded', setSketchGrid(16));
document.addEventListener('mousedown', (e) => {
    e.preventDefault(); //stop browser dragging while drawing
    mouseDown = true;
    paintPixel(e);
});
document.addEventListener('mouseup', () => mouseDown = false);

let pixels = document.querySelectorAll('.pixel')
pixels.forEach((elem) => elem.addEventListener('mouseover', (e) => paintPixel(e)))

document.querySelector('.color-picker').addEventListener('input', (e) => {
    usingRandomColor = false;
    changeColor(e.target.value) //change color to picked value
}); 
document.querySelector('.color-black').addEventListener('click', () => {
    usingRandomColor = false;
    changeColor('#000');
});
document.querySelector('.color-rainbow').addEventListener('click', useRandomColor)
document.querySelector('.erase').addEventListener('click', () => {
    usingRandomColor = false;
    changeColor('#f6f6f6'); //background color
}) 
document.querySelector('.reset').addEventListener('click', reset)
