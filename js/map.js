'use strict';

(function () {
  var PIN_TAIL_HEIGHT = 22;
  var Y_TOP = 130;
  var Y_BOTTOM = 630;

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainDefaultLeft = getComputedStyle(mapPinMain).left;
  var mapPinMainDefaultTop = getComputedStyle(mapPinMain).top;

  window.form.setAddress(getMapPinMainCoords());

  mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

  function mapPinMainMousedownHandler(evt) {
    if (evt.button === window.utils.LEFT_BTN_MOUSE_CODE) {
      window.page.switchPageToActiveState();
    }
  }

  function mapPinMainKeydownHandler(evt) {
    if (evt.key === window.utils.Key.ENTER) {
      window.page.switchPageToActiveState();
    }
  }

  function mapPinMainMousedownForDragHandler(evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = checkYCoord(mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = checkXCoord(mapPinMain.offsetLeft - shift.x) + 'px';
      window.form.setAddress(getMapPinMainCoords());
    };

    function checkYCoord(yCoord) {
      var realYTop = Y_TOP - mapPinMain.offsetHeight - PIN_TAIL_HEIGHT;
      var realYBottom = Y_BOTTOM - mapPinMain.offsetHeight - PIN_TAIL_HEIGHT;
      if (yCoord < realYTop) {
        return realYTop;
      }
      if (yCoord > realYBottom) {
        return realYBottom;
      }

      return yCoord;
    }

    function checkXCoord(xCoord) {
      var realXLeft = -parseInt(mapPinMain.offsetWidth / 2, 10);
      var realXRight = map.offsetWidth - parseInt(mapPinMain.offsetWidth / 2, 10);
      if (xCoord < realXLeft) {
        return realXLeft;
      }
      if (xCoord > realXRight) {
        return realXRight;
      }

      return xCoord;
    }

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        var clickPreventDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          mapPinMain.removeEventListener('click', clickPreventDefaultHandler);
        };
        mapPinMain.addEventListener('click', clickPreventDefaultHandler);
      }

    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
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

  function setMainPinDefaultCoords() {
    mapPinMain.style.left = mapPinMainDefaultLeft;
    mapPinMain.style.top = mapPinMainDefaultTop;
  }

  window.map = {
    map: map,
    mapPinMain: mapPinMain,
    getMapPinMainCoords: getMapPinMainCoords,
    mapPinMainMousedownHandler: mapPinMainMousedownHandler,
    mapPinMainKeydownHandler: mapPinMainKeydownHandler,
    mapPinMainMousedownForDragHandler: mapPinMainMousedownForDragHandler,
    setMainPinDefaultCoords: setMainPinDefaultCoords,
  };
})();
