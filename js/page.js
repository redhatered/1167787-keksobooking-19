'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFiltersForm = document.querySelector('.map__filters');
  var offers = window.data.generateOffers();

  switchPageToDisabledState();

  function switchPageToActiveState() {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    adForm.querySelectorAll('fieldset').forEach(function (item) {
      item.removeAttribute('disabled');
    });
    mapFiltersForm.querySelectorAll('fieldset, select').forEach(function (item) {
      item.removeAttribute('disabled');
    });
    window.form.setAddress(window.map.getMapPinMainCoords());
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
    window.form.setAddress(window.map.getMapPinMainCoords());
  }

  window.page = {
    switchPageToActiveState: switchPageToActiveState,
  };
})();
