'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderText = function(ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText(text, x, y);
};


var renderWinWindow = function(ctx) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText (ctx,'Ура, вы победили!', CLOUD_X + BAR_GAP,  CLOUD_Y + FONT_GAP*2);
  renderText (ctx,'Список результатов:', CLOUD_X + BAR_GAP,  CLOUD_Y + FONT_GAP*4);
};

window.renderStatistics = function(ctx, names, times) {
  var statisticsWindow = renderWinWindow(ctx);
  var maxTime = Math.floor(getMaxElement(times));

  for (var i = 0; i < names.length; i++) {
    if (names[i] !== 'Вы') {
      var randomOpacity = Math.random() * (1.1 - 0.1) + 0.1;
      ctx.fillStyle ='rgba(0, 0, 255,' + randomOpacity.toFixed(1) +')'
    }
    else{
    ctx.fillStyle ='rgba(255, 0, 0, 1)'
    }

  var playerTime =  Math.floor(times[i]);

  ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP)*i, CLOUD_Y+(CLOUD_HEIGHT-BAR_HEIGHT * playerTime / maxTime)-FONT_GAP*2, BAR_WIDTH, (BAR_HEIGHT * playerTime) / maxTime);
  ctx.fillStyle = '#000';
  ctx.fillText(names[i],CLOUD_X+ BAR_GAP + (BAR_WIDTH + BAR_GAP)*i, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP);
  }
};
