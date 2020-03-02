'use strict';

(function () {
  var PRICE_MIN = 0;
  var offerType = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000,
  };

  var adForm = document.querySelector('.ad-form');
  var inputAddress = adForm.querySelector('#address');
  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var type = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');

  validateRoomNumberSelect();
  setMinPrice();

  selectRoomNumber.addEventListener('change', selectRoomNumberChangeHandler);
  selectCapacity.addEventListener('change', selectCapacityChangeHandler);
  type.addEventListener('change', selectTypeChangeHandler);
  timein.addEventListener('change', selectTimeinChangeHandler);
  timeout.addEventListener('change', selectTimeoutChangeHandler);

  function selectRoomNumberChangeHandler() {
    validateRoomNumberSelect();
  }

  function selectCapacityChangeHandler() {
    validateRoomNumberSelect();
  }

  function selectTimeinChangeHandler() {
    timeout.selectedIndex = timein.selectedIndex;
  }


  function selectTimeoutChangeHandler() {
    timein.selectedIndex = timeout.selectedIndex;
  }

  function selectTypeChangeHandler() {
    setMinPrice();
  }

  function setMinPrice() {
    price.setAttribute('min', type.value in offerType ? offerType[type.value] : PRICE_MIN);
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

  window.form = {
    adForm: adForm,
    setAddress: setAddress,
  };
})();
