'use strict'

// var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gId = 1;
var gImgs;
var firstEdit = 0;
var gMeme;
var canvasWidth = 600;
var currImagesNum = 21;
var gStickers;

function resetGMeme() {
    gMeme = {
        currMarkedText: 0,

        lines: [
            {
                txt: 'This is the upper line',
                font: 'impact',
                size: 30,
                align: 'center',
                color: 'white',
                strokeColor: 'black',
                y: 50,
                x: 275.5
            },
            {
                txt: 'This is the lower line',
                font: 'impact',
                size: 30,
                align: 'center',
                color: 'white',
                strokeColor: 'black',
                y: 0,
                x: 275.5
            }
        ],
    }
}

function createImgs() {
    var imgs = [];
    imgs.push(createImage('imgs/1.jpg'),
        createImage('imgs/2.jpg'),
        createImage('imgs/3.jpg'),
        createImage('imgs/4.jpg'),
        createImage('imgs/5.jpg'),
        createImage('imgs/6.jpg'),
        createImage('imgs/7.jpg'),
        createImage('imgs/8.jpg'),
        createImage('imgs/9.jpg'),
        createImage('imgs/10.jpg'),
        createImage('imgs/11.jpg'),
        createImage('imgs/12.jpg'),
        createImage('imgs/13.jpg'),
        createImage('imgs/14.jpg'),
        createImage('imgs/15.jpg'),
        createImage('imgs/16.jpg'),
        createImage('imgs/17.jpg'),
        createImage('imgs/18.jpg'),
        createImage('imgs/19.jpg'),
        createImage('imgs/20.jpg'),
        createImage('imgs/21.jpg'),
    );
    gId = 1;
    gImgs = imgs;
    return imgs;
}

function createStickers() {
    var stickers = [];
    stickers.push(createSticker('imgs/stickers/1.png'),
        createSticker('imgs/stickers/2.png'),
        createSticker('imgs/stickers/3.png'),
        createSticker('imgs/stickers/4.png'),
        createSticker('imgs/stickers/5.png'),
        createSticker('imgs/stickers/6.png'),
    );
    gStickers = stickers;
    return stickers;
}

function createImage(url) {
    return {
        id: gId++,
        url: url,
        // keywords: keywords
    };
}

function createSticker(url) {
    return {
        id: gId++,
        url: url,
        x: 0,
        y: 0
        // keywords: keywords
    };
}

function getSticker(id){
    return gStickers[id - 1];
}

function addLine() {

    var gElCanvas = document.getElementById('my-canvas');
    for (var i = 0; i < 1; i++) {
        gMeme.lines.push(
            {
                txt: 'Enter text here',
                font: 'impact',
                size: 30,
                align: 'center',
                color: 'white',
                strokeColor: 'black',
                y: gElCanvas.height / 2,
                x: 275.5
            }
        )
    }
}

function getMemeInfo() {
    return gMeme;
}

function getImgUrl(imageIdx) {
    return gImgs[imageIdx - 1].url;
}

function getMemeImg(memeImgIdx) {
    var img = gImgs.find((memeImg) => {
        return memeImg.id === memeImgIdx;
    })
    return img;
}

function changeFontSize(newSize) {
    gMeme.lines[gMeme.currMarkedText].size += newSize;
}

function setLowerLineHeight(canvasHeight) {
    if (firstEdit > 0) return
    getMemeInfo().lines[1].y = canvasHeight - 50;
    firstEdit++;
}

function setLineText(lineText) {
    gMeme.lines[gMeme.currMarkedText].txt = lineText;
}

function switchLine() {
    gMeme.currMarkedText++
    if (gMeme.currMarkedText >= gMeme.lines.length) gMeme.currMarkedText = 0;
}

function getCurrLineIdx() {
    return gMeme.currMarkedText;
}

function changePos(direction) {
    gMeme.lines[gMeme.currMarkedText].y += direction
}

function changeFont(chosenFont) {
    gMeme.lines.forEach(function (idx) {
        idx.font = chosenFont
    })
}

function changeColor(selectedColor) {
    gMeme.lines[gMeme.currMarkedText].color = selectedColor
}

function changeTextAlign(direction) {
    gMeme.lines.forEach(function (idx) {
        idx.align = direction
    })
}

function calculateHeight(width, height) {
    return height / width * canvasWidth;
}

function removeLine() {
    gMeme.lines.splice(gMeme.currMarkedText, 1);
    gMeme.currMarkedText = 0;
}

function getTextWidth() {
    return gCtx.measureText(getMemeInfo().lines[currLine].txt.toUpperCase()).width
}