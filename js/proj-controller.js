'use strict'
var gElCanvas;
var gCtx;
var currImageId;
var imgs;
var stickers;
var isEditMode = false;
var gIsCurrLineMoveable = false;
var fontSettings = '';
var currPos;
var startingMousePoseX;
var startingMousePoseY;
var currLine;
var prevMousePosX;
var prevMousePosY;
var canvasWidth = 600;
var currStickersNum = 6;
var currSticker;
var stickerSize = 60;
var giStickerMovable = false;


function onInit() {
    resetGMeme()
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    imgs = createImgs();
    stickers = createStickers();
    renderImgs(imgs);
    currLine = 0

    if ((document.body.clientWidth <= 860)) {
        gElCanvas.height = calculateHeight(img.width, img.height)
        gElCanvas.width = document.querySelector('body').width;
    }
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

function drawMemeOnCanvas() {
    var img = new Image()
    img.src = `imgs/${currImageId}.jpg`;

    if (!isEditMode) {
        gElCanvas.height = calculateHeight(img.width, img.height)
        gElCanvas.width = 600;
        isEditMode = true;

        if (document.body.clientWidth <= 860) {
            gElCanvas.height = calculateHeight(img.width, img.height)
            gElCanvas.width = document.body.clientWidth;
        }

    }
    img.height = gElCanvas.height
    img.width = gElCanvas.width;
    setLowerLineHeight(gElCanvas.height)
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.width, img.height);
        drawTextOnCanvas();
    }
}

function drawTextOnCanvas() {

    getMemeInfo().lines.forEach(function (line, idx) {

        if (idx === getMemeInfo().currMarkedText) gCtx.strokeStyle = 'blue';
        else gCtx.strokeStyle = line.strokeColor;
        gCtx.fillStyle = line.color;
        gCtx.font = line.size + 'px ' + line.font;
        gCtx.textAlign = line.align;
        gCtx.fillText(line.txt.toUpperCase(), getMemeInfo().lines[idx].x, getMemeInfo().lines[idx].y);
        gCtx.strokeText(line.txt.toUpperCase(), getMemeInfo().lines[idx].x, getMemeInfo().lines[idx].y);
    })
}

function onAddSticker(stickerId) {
    var sticker = new Image()
    sticker.src = `imgs/stickers/${stickerId}.png`;
    currSticker = stickerId;

    getSticker(currSticker).x = gElCanvas.width / 2
    getSticker(currSticker).y = gElCanvas.height / 2

    sticker.onload = () => {
        gCtx.drawImage(sticker, getSticker(currSticker).x, getSticker(currSticker).y, sticker.width, sticker.height);
        drawTextOnCanvas();
    }
}

function changeTextToMeme(inputFromUser) {
    setLineText(inputFromUser)
    drawMemeOnCanvas();
}

function enterEditMode(selectedImgId) {
    currImageId = selectedImgId;
    document.querySelector('.gallery-imgs').classList.toggle('hidden-div');
    document.querySelector('.container').classList.toggle('hidden-div');
    drawMemeOnCanvas();
    setFocus();
    renderStickers(stickers);
}

function onChangeFontSize(value) {
    var newSize = parseInt(value)
    changeFontSize(newSize)
    drawMemeOnCanvas();
}

function setFocus() {
    document.getElementById('input-text-here').focus()
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
    drawMemeOnCanvas();
}

function onChangeColor(selectedColor) {
    changeColor(selectedColor)
    drawMemeOnCanvas();
    console.log('hi');

}

function onChangeAlign(direction) {
    changeTextAlign(direction)
    drawMemeOnCanvas();
}

function onRemoveText() {
    removeLine();
    drawMemeOnCanvas();
}

function onAddText() {
    addLine()
    drawMemeOnCanvas();
}

function onSaveMeme(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}

function onMovingMouse(event) {
    // !!!!!COORDS INSIDE CONTAINER ARE: offsetX/offsetY
    if (!gIsCurrLineMoveable) return;
    const { offsetX: x, offsetY: y } = event

    if (prevMousePosX > event.offsetX || prevMousePosY > event.offsetY) {
        getMemeInfo().lines[currLine].x = event.offsetX;
        getMemeInfo().lines[currLine].y = event.offsetY;
    }

    prevMousePosX = x
    prevMousePosY = y
    drawMemeOnCanvas();
}

function finishPosition() {
    gIsCurrLineMoveable = false;
}

function onSwitchLine(ev) {
    ev.preventDefault();
    const { offsetX: x, offsetY: y } = ev;
    prevMousePosX = x;
    prevMousePosY = y;
    // for text
    var clickedStar = gMeme.lines.findIndex(line => {
        var lineWidth = getTextWidth(line)
        if (x <= line.x + lineWidth / 2 && x >= line.x - lineWidth / 2 && y <= line.y && y >= line.y - line.size)
            return line;
    })
    if (clickedStar !== -1) {
        gMeme.currMarkedText = clickedStar;
        currLine = clickedStar;
        setFocus();
        drawMemeOnCanvas();
        gIsCurrLineMoveable = true;
        return;
    } else {
        onStickerClick(ev)
    }
}

function renderStickers(stickers) {

    var strHTMLs = stickers.map(function (sticker) {
        return `
        <img id='${sticker.id}' src='${sticker.url}' onclick="onAddSticker(${sticker.id})">
                `
    })
        .join(' ');
    document.querySelector('.stickers-container').innerHTML = strHTMLs;
}

function onStickerClick(ev) {
    const { offsetX: x, offsetY: y } = ev;
    if (!currSticker) return
    var stickerXPos = getSticker(currSticker).x
    var stickerYPos = getSticker(currSticker).y
    // for stickers
    var clickedStarOnSticker = gStickers.findIndex(line => {

        if (x <= stickerXPos + stickerSize && x >= stickerXPos - stickerSize && y >= stickerYPos && y <= stickerYPos + stickerSize) {
            giStickerMovable = true;
            console.log(line);

            return line;
        }
        
        if (clickedStarOnSticker !== -1) {
            gMeme.currMarkedText = clickedStarOnSticker;
            currLine = clickedStarOnSticker;
            setFocus();
            drawMemeOnCanvas();
            gIsCurrLineMoveable = true;
            return;
        }
    })
}