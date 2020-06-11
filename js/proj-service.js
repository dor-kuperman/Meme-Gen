'use strict'

// var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gId = 1;
var gImgs;
var gElCanvas = document.getElementById('my-canvas');

var gMeme = {
    selectedLineIdx: 0,

    lines: [
        {
            txt: 'This is the upper line',
            font: 'impact',
            size: 30,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            y: 50,
            x: 0
        },
        {
            txt: 'This is the lower line',
            font: 'impact',
            size: 30,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            y: gElCanvas.height,
            x: 0
        }
    ],
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
        createImage('imgs/22.jpg'),
        createImage('imgs/23.jpg'),
        createImage('imgs/24.jpg'),
        createImage('imgs/25.jpg'),
    );
    gImgs = imgs;
    return imgs;
}

function createImage(url) {
    return {
        id: gId++,
        url: url,
        // keywords: keywords
    };
}

function getImages() {
    return gImgs;
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
    gMeme.lines[gMeme.selectedLineIdx].size += newSize;
}

function setLineText(lineText) {
    gMeme.lines[gMeme.selectedLineIdx].txt = lineText;
}

function switchLine() {

    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0;
}

function getCurrLineIdx() {
    return gMeme.selectedLineIdx;
}

function changePos(direction) {
    gMeme.lines[gMeme.selectedLineIdx].y += direction
}

function changeFont(chosenFont) {
    gMeme.lines.forEach(function (idx) {
        idx.font = chosenFont
    })
}

function changeColor(selectedColor) {
    gMeme.lines[gMeme.selectedLineIdx].color = selectedColor
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
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = 0;
}