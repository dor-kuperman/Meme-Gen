'use strict'

// var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gId = 1;
var gImgs;


var gMeme = {
    selectedLineIdx: 0,
    txtOnMeme1: 'Add text!',
    txtOnMeme2: 'Trolololo!',

    txt1Pos: {
        x: 80,
        y: 150
    },

    txt2Pos: {
        x: 150,
        y: 80
    }
}

function getTxt1Pos(){
    return gMeme.txt1Pos
}

function getTxt2Pos(){
    return gMeme.txt2Pos
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