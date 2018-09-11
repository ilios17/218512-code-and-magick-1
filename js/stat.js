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
var USER_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var WHITE_CLOUD_COLOR = '#fff';
var GREY_CLOUD_COLOR = 'rgba(0, 0, 0, 0.7)';
var WIN_TEXT_COLOR = '#000';
var textX = CLOUD_X + BAR_GAP;
var secondCloudX = CLOUD_X + GAP;
var secondCloudY = CLOUD_Y + GAP;
var cloudUpperTextY = CLOUD_Y + FONT_GAP * 2;
var cloudLowerTextY = CLOUD_Y + FONT_GAP * 4;
var statBarX = CLOUD_X + BAR_GAP;
var statBarXGap = BAR_WIDTH + BAR_GAP;
var nameTextXGap = BAR_WIDTH + BAR_GAP;
var nameTextY = CLOUD_Y + CLOUD_HEIGHT - FONT_GAP;
var statBarYGap = CLOUD_Y - FONT_GAP * 2;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = WIN_TEXT_COLOR;
  ctx.font = '16px PT Mono';
  ctx.fillText(text, x, y);
};

var renderWinWindow = function (ctx) {
  renderCloud(ctx, secondCloudX, secondCloudY, GREY_CLOUD_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE_CLOUD_COLOR);
  renderText(ctx, 'Ура, вы победили!', textX, cloudUpperTextY);
  renderText(ctx, 'Список результатов:', textX, cloudLowerTextY);
};

var getRandomColor = function () {
  var randomColor = 'hsl(240, ' + Math.ceil(Math.random() * 100) + '%, 50%)';
  return randomColor;
};

window.renderStatistics = function (ctx, names, times) {
  var statisticsWindow = renderWinWindow(ctx);
  var maxTime = Math.floor(getMaxElement(times));

  for (var i = 0; i < names.length; i++) {
    names[i] !== 'Вы' ? ctx.fillStyle = getRandomColor() : ctx.fillStyle = USER_BAR_COLOR;

    var playerTime = Math.floor(times[i]);

    ctx.fillRect(statBarX + statBarXGap * i, statBarYGap + (CLOUD_HEIGHT - BAR_HEIGHT * playerTime / maxTime), BAR_WIDTH, (BAR_HEIGHT * playerTime) / maxTime);
    ctx.fillStyle = WIN_TEXT_COLOR;
    ctx.fillText(names[i], textX + nameTextXGap * i, nameTextY);
  }
  return statisticsWindow;
};
