'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFiltersForm = document.querySelector('.map__filters');
  var offers = window.data.generateOffers();

  switchPageToDisabledState();

  mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

  function mapPinMainMousedownHandler(evt) {
    if (evt.button === window.utils.LEFT_BTN_MOUSE_CODE) {
      switchPageToActiveState();
    }
  }

  function mapPinMainKeydownHandler(evt) {
    if (evt.key === window.utils.ENTER_KEY) {
      switchPageToActiveState();
    }
  }

  function switchPageToActiveState() {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    adForm.querySelectorAll('fieldset').forEach(function (item) {
      item.removeAttribute('disabled');
    });
    mapFiltersForm.querySelectorAll('fieldset, select').forEach(function (item) {
      item.removeAttribute('disabled');
    });
    window.form.setAddress(window.form.getMapPinMainCoords());
    window.pin.renderPins(offers);
  }

  function switchPageToDisabledState() {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.querySelectorAll('fieldset').forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    mapFiltersForm.querySelectorAll('fieldset, select').forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    window.form.setAddress(window.form.getMapPinMainCoords());
  }
})();
