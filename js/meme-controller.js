'use strict'

var gElCanvas;
var gCtx;
var gCurrImage;
var gPos = {
    x: 50,
    y: 100
};
var gTextAlign = 'left';
var gColor = 'purple';
var gFontType = 'Impact';
var gFontSize = 55;

function init() {
console.log('hi')
}

function drawImage(image) {
    gCurrImage = image;
    gMeme.selectedImgId = image.id;
    document.querySelector('section.gallery').classList.add('hidden');
    document.querySelector('.about').classList.add('hidden');
    document.querySelector('section.main-canvas').classList.remove('hidden');
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d');
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height);
}

function drawText(txt) {
    gMeme.lines[0] = {
        txt: txt,
        align: gCtx.textAlign,
        color: gCtx.strokeStyle,
        font: 55
    };
    renderCanvas();
}

function renderCanvas() {
    clearCanvas();
    gCtx.strokeText(gMeme.lines[0].txt, gPos.x, gPos.y);
    gCtx.textAlign = gTextAlign;
    gCtx.strokeStyle = gColor;
    gCtx.font = gFontSize + 'px ' + gFontType;
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.drawImage(gCurrImage, 0, 0, gElCanvas.width, gElCanvas.height);
}

function showAbout() {
    document.querySelector('.about').classList.remove('hidden');
    document.querySelector('section.gallery').classList.add('hidden');
}

function showGallery() {
    document.querySelector('section.gallery').classList.remove('hidden');
    document.querySelector('section.main-canvas').classList.add('hidden');
}