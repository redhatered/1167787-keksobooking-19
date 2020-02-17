'use strict';

(function () {
  var PIN_TAIL_HEIGHT = 22;

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  window.form.setAddress(getMapPinMainCoords());

  mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

  function mapPinMainMousedownHandler(evt) {
    if (evt.button === window.utils.LEFT_BTN_MOUSE_CODE) {
      window.page.switchPageToActiveState();
    }
  }

  function mapPinMainKeydownHandler(evt) {
    if (evt.key === window.utils.ENTER_KEY) {
      window.page.switchPageToActiveState();
    }
  }

  function getMapPinMainCoords() {
    var mapIsNotActive = map.classList.contains('map--faded');
    var x = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
    var y = '';
    if (mapIsNotActive) {
      y = Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2);
    } else {
      y = Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight + PIN_TAIL_HEIGHT);
    }
    return x + ', ' + y;
  }

  window.map = {
    getMapPinMainCoords: getMapPinMainCoords,
  };
})();
