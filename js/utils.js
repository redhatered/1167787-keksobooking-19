'use strict';

(function () {
  var LEFT_BTN_MOUSE_CODE = 0;
  var ENTER_KEY = 'Enter';

  function getRandomInt(min, max) {
    var rand = min + Math.random() * (max - min);
    return Math.round(rand);
  }

  function getRandomItem(itemsArr) {
    return itemsArr[Math.floor(Math.random() * itemsArr.length)];
  }

  window.utils = {
    getRandomInt: getRandomInt,
    getRandomItem: getRandomItem,
    ENTER_KEY: ENTER_KEY,
    LEFT_BTN_MOUSE_CODE: LEFT_BTN_MOUSE_CODE,
  };
})();
