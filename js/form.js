'use strict';

(function () {
  var PIN_TAIL_HEIGHT = 22;

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var inputAddress = adForm.querySelector('#address');
  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');

  setAddress(getMapPinMainCoords());
  validateRoomNumberSelect();

  selectRoomNumber.addEventListener('change', selectRoomNumberChangeHandler);
  selectCapacity.addEventListener('change', selectCapacityChangeHandler);

  function selectRoomNumberChangeHandler() {
    validateRoomNumberSelect();
  }

  function selectCapacityChangeHandler() {
    validateRoomNumberSelect();
  }

  function validateRoomNumberSelect() {
    if (parseInt(selectRoomNumber.value, 10) < parseInt(selectCapacity.value, 10)) {
      selectCapacity.setCustomValidity('Количество мест, больше чем количество комнат');
    } else {
      selectCapacity.setCustomValidity('');
    }
  }

  function setAddress(value) {
    inputAddress.value = value;
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

  window.form = {
    setAddress: setAddress,
    getMapPinMainCoords: getMapPinMainCoords,
  };
})();
