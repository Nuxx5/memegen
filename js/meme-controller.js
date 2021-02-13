'use strict'
// define global variables for canvas

var gElCanvas;
var gCtx;
var gCurrImage;
var gPos = {
    x: 250,
    y: 100
};
var gTextAlign = 'center';
var gStrokeColor = 'none';
var gFillColor = 'white';
var gFontType = 'Impact';
var gFontSize = 55;
gMeme.selectedLineIdx = 0;
var gSavedMemes = [];

function init() {
    console.log('hi');
}

// load the selected image on the canvas

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

// draw text on canvas

function drawText(txt) {
    gMeme.lines[gMeme.selectedLineIdx] = {
        txt: txt,
        align: gCtx.textAlign,
        color: gCtx.strokeStyle,
        fontSize: gCtx.font,
        pos: { x: gPos.x, y: gPos.y }
    };
    renderCanvas();
}

// switch between text lines

function switchLine() {
    if (gMeme.lines.length === 2) {
        if (gMeme.selectedLineIdx === 0) {
            gMeme.selectedLineIdx = 1;
            document.getElementById('text').value = gMeme.lines[gMeme.selectedLineIdx].txt;
            gPos = { x: 250, y: 450 };
        }
        else {
            gMeme.selectedLineIdx = 0;
            document.getElementById('text').value = gMeme.lines[gMeme.selectedLineIdx].txt;
            gPos = { x: 250, y: 100 };
        }
    }
    else {
        gMeme.selectedLineIdx = 0;
        document.getElementById('text').value = gMeme.lines[gMeme.selectedLineIdx].txt;
        gPos = { x: 250, y: 100 };
    }
}

function addLine() {
    if (gMeme.lines.length === 2) return;
    gMeme.selectedLineIdx = 1;
    document.getElementById('text').value = '';
    gPos = {
        x: 250,
        y: 450
    };
 }

function deleteLine() {
    document.getElementById('text').value = '';
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    renderCanvas();
}

function increaseFont() {
    gFontSize += 5;
    renderCanvas();
}

function decreaseFont() {
    gFontSize -= 5;
    renderCanvas();
}

function alignLeft() {
    gTextAlign = 'left';
    renderCanvas();
}

function alignCenter() {
    gTextAlign = 'center';
    renderCanvas();
}

function alignRight() {
    gTextAlign = 'right';
    renderCanvas();
}

function changeFont(font) {
    gFontType = font;
    renderCanvas();
}

function changeStrokeColor(color) {
    gStrokeColor = color;
    renderCanvas();
}

function changeFillColor(color) {
    gFillColor = color;
    renderCanvas();
}

function renderCanvas() {
    clearCanvas();
    gMeme.lines.forEach(line => {
        gCtx.fillText(line.txt, line.pos.x, line.pos.y);
        gCtx.strokeText(gMeme.lines[gMeme.selectedLineIdx].txt, gPos.x, gPos.y);
        gCtx.strokeStyle = gStrokeColor;
        gCtx.fillStyle = gFillColor;
        gCtx.font = gFontSize + 'px ' + gFontType;
        gCtx.textAlign = gTextAlign;
        // gCurrImage.addEventListener("load", function() {
        //     gCtx.textAlign = gTextAlign;
        // });
    });
}

// clear the canvas

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.drawImage(gCurrImage, 0, 0, gElCanvas.width, gElCanvas.height);
}

// show About section

function showAbout() {
    document.querySelector('.about').classList.remove('hidden');
    document.querySelector('section.gallery').classList.add('hidden');
}

// show Gallery section

function showGallery() {
    document.querySelector('section.gallery').classList.remove('hidden');
    document.querySelector('section.main-canvas').classList.add('hidden');
}

// download the meme

function downloadImg(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'meme';
}

function saveImg(){
    const data = gElCanvas.toDataURL();
    var imgHTML = `<img src="${data}" alt="">`;
    gSavedMemes.push(imgHTML);
    saveToStorage('memes', gSavedMemes);
}
// share meme

function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gElCanvas.toDataURL("image/jpeg");
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)
    }
    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}