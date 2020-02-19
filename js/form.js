'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var inputAddress = adForm.querySelector('#address');
  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');

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

  window.form = {
    adForm: adForm,
    setAddress: setAddress,
  };
})();
