'use strict'
var gElCanvas = document.getElementById('my-canvas');
var gCtx = gElCanvas.getContext('2d');

var memeData = getMemeInfo();
var currImageId;
var imgs;

// STARTING SETTINGS FOR TEXT TO BE CHANGED BY THE USER
var currFontSize = 40;
var fontSettings = '';
var text1Pos = getTxt1Pos();
var text2Pos = getTxt2Pos();


function onInit() {
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
function processImgDataToCanvas(imageId) {
    fontSettings = currFontSize + 'px Impact';
    currImageId = imageId;
    var imgObj = getMemeImg(imgs[imageId - 1].id);
    var image = new Image;
    image.src = imgObj.url;

    image.onload = function () {
        gElCanvas.width = image.width;
        gElCanvas.height = image.height;
        gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height);
        drawTextOnCanvas(memeData.txtOnMeme1, memeData.txtOnMeme2, fontSettings);
    }
}

function drawTextOnCanvas(txtOnMeme1, txtOnMeme2, fontSettings) {
    gCtx.font = fontSettings;
    gCtx.strokeStyle = 'white';
    gCtx.fillStyle = 'black';
    // THIS IS THE UPPER LINE WHEN STARTING 
    gCtx.strokeText(txtOnMeme1, text1Pos.x, text1Pos.y);
    gCtx.fillText(txtOnMeme1, text1Pos.x, text1Pos.y);

    // THIS IS THE LOWER LINE WHEN STARTING 
    gCtx.strokeText(txtOnMeme2, text2Pos.x, text2Pos.y);
    gCtx.fillText(txtOnMeme2, text2Pos.x, text2Pos.y);
}

function changeTextToMeme() {
    memeData.txtOnMeme1 = document.getElementById('text-on-meme').value;
    processImgDataToCanvas(currImageId);
}

function enterEditMode(imageId) {
    document.querySelector('.gallery-imgs').classList.toggle('hidden-div');
    document.querySelector('.meme-editor').classList.toggle('hidden-div');
    processImgDataToCanvas(imageId);
}

function changeFontSize(buttonChosen) {
    if (buttonChosen.innerHTML === 'Increase font size') {
        currFontSize += 2;
        processImgDataToCanvas(currImageId)
    }
    if (buttonChosen.innerHTML === 'Decrease font size') {
        currFontSize -= 2;
        processImgDataToCanvas(currImageId)
    }
}

function changeTextPos(buttonChosen) {
    if (buttonChosen.innerHTML === 'Take the text up') {
        text1Pos.y -= 10;
        processImgDataToCanvas(currImageId)
    }
    if (buttonChosen.innerHTML === 'Take the text down') {
        text1Pos.y += 10;
        processImgDataToCanvas(currImageId)
    }
}

function switchTxtsPos() {
    // HANLING X VALUES

    var tempValue = text1Pos.x;
    text1Pos.x = text2Pos.x;
    text2Pos.x = tempValue;

    // HANLING Y VALUES
    tempValue = text1Pos.y;
    text1Pos.y = text2Pos.y;
    text2Pos.y = tempValue;
    processImgDataToCanvas(currImageId);
}
