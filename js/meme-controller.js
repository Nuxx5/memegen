'use strict'

var gElCanvas;
var gCtx;

function onInit() {
    
}

function drawImage(image) {
  gMeme.selectedImgId = image.id;
  document.querySelector('section.gallery').classList.add('hidden');
  document.querySelector('.about').classList.add('hidden');
  document.querySelector('section.main-canvas').classList.remove('hidden');
  gElCanvas = document.getElementById('my-canvas')
  gCtx = gElCanvas.getContext('2d');
  gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height);
}

function showAbout(){
    document.querySelector('.about').classList.remove('hidden');
    document.querySelector('section.gallery').classList.add('hidden');
}

function showGallery(){
    document.querySelector('section.gallery').classList.remove('hidden');
}