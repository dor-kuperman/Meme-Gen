'use strict'
var gElCanvas;
var gCtx;
var memeData = getMemeInfo();
var currImageId;
const canvasWidth = 800;
var imgs;
var isEditMode = false;

// STARTING SETTINGS FOR TEXT TO BE CHANGED BY THE USER
var fontSettings = '';


function onInit() {

    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    imgs = createImgs();
    renderImgs(imgs);
}

function renderImgs(imgs) {
    var strHTMLs = imgs.map(function (img) {
        return `
                <img id='${img.id}' src='${img.url}' onclick="enterEditMode(${img.id})">
                `
    })
        .join(' ');
    document.querySelector('.gallery-imgs').innerHTML = strHTMLs;
}

function drawMeme() {
    var img = new Image()
    img.src = `imgs/${currImageId}.jpg`;

    if (!isEditMode) {
        gElCanvas.height = calculateHeight(img.width, img.height)
        gElCanvas.width = canvasWidth;
        isEditMode = true;
    }
    img.height = calculateHeight(img.width, img.height)
    img.width = canvasWidth;

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.width, img.height);
        drawTextOnCanvas()
    }
}

function drawTextOnCanvas() {

    memeData.lines.forEach(function (line, idx) {

        if (idx === memeData.selectedLineIdx) gCtx.strokeStyle = 'blue';
        else gCtx.strokeStyle = line.strokeColor;
        gCtx.fillStyle = line.color;
        gCtx.font = line.size + 'px ' + line.font;
        gCtx.textAlign = line.align;
        const x = gElCanvas.width / 2;
        gCtx.fillText(line.txt.toUpperCase(), x, getMemeInfo().lines[idx].y);
        gCtx.strokeText(line.txt.toUpperCase(), x, getMemeInfo().lines[idx].y);
    })
}

function changeTextToMeme(inputFromUser) {

    setLineText(inputFromUser)
    drawMeme(currImageId)
}

function enterEditMode(selectedImgId) {
    currImageId = selectedImgId;
    document.querySelector('.gallery-imgs').classList.toggle('hidden-div');
    document.querySelector('.container').classList.toggle('hidden-div');
    drawMeme();
}



function onChangeFontSize(value) {
    var newSize = parseInt(value)
    changeFontSize(newSize)
    drawMeme();
}

function onChangePos(value) {
    var direction = parseInt(value)
    changePos(direction)
    drawMeme();
}

function setFocusToOtherLine() {
    var elInputFromUser = document.getElementById('text-on-meme');
    elInputFromUser.value = getMemeInfo().lines[getMemeInfo().selectedLineIdx].txt;
    elInputFromUser.focus()
}

function onSwitchLine() {
    switchLine();
    setFocusToOtherLine();
    drawTextOnCanvas();
}

function onFontChange(chosenFont) {
    if (chosenFont === 'you-have-no-value') return;

    if (chosenFont === '1') {
        chosenFont = 'Impact'
        changeFont(chosenFont);

    } else if (chosenFont === '2') {
        chosenFont = 'Comic Sans MS'
        changeFont(chosenFont);

    } else if (chosenFont === '3') {
        chosenFont = 'Times New Roman'
        changeFont(chosenFont);
    }
    drawMeme();
    drawTextOnCanvas();
}

function onChangeColor(selectedColor) {
    changeColor(selectedColor)
    drawMeme();
    drawTextOnCanvas();
}

function onChangeAlign(direction) {
    changeTextAlign(direction)
    drawMeme();
    drawTextOnCanvas();
}

function onRemoveText() {
    removeLine();
    drawMeme();
    drawTextOnCanvas();
}