'use strict';

(function () {
  var mapFiltersForm = document.querySelector('.map__filters');

  switchPageToDisabledState();

  function switchPageToActiveState() {
    window.map.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.adForm.querySelectorAll('fieldset').forEach(function (item) {
      item.removeAttribute('disabled');
    });
    mapFiltersForm.querySelectorAll('fieldset, select').forEach(function (item) {
      item.removeAttribute('disabled');
    });
    window.form.setAddress(window.map.getMapPinMainCoords());
    window.backend.load(loadHandler, errorHandler);
    window.map.mapPinMain.removeEventListener('mousedown', window.map.mapPinMainMousedownHandler);
    window.map.mapPinMain.removeEventListener('keydown', window.map.mapPinMainKeydownHandler);
    window.map.mapPinMain.addEventListener('mousedown', window.map.mapPinMainMousedownForDragHandler);
  }

  function errorHandler(messageError) {
    window.popup.renderError(messageError, 'ОК');
  }

  function loadHandler(offers) {
    window.pin.renderPins(offers);
  }

  function switchPageToDisabledState() {
    window.map.map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    window.form.adForm.querySelectorAll('fieldset').forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    window.form.adForm.reset();
    //filterForm.reset();
    window.pin.removePins();
    window.map.setMainPinDefaultCoords();
    window.card.close();
    mapFiltersForm.querySelectorAll('fieldset, select').forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    window.form.setAddress(window.map.getMapPinMainCoords());
    window.map.mapPinMain.addEventListener('mousedown', window.map.mapPinMainMousedownHandler);
    window.map.mapPinMain.addEventListener('keydown', window.map.mapPinMainKeydownHandler);
    window.map.mapPinMain.removeEventListener('mousedown', window.map.mapPinMainMousedownForDragHandler);
  }

  window.page = {
    switchPageToActiveState: switchPageToActiveState,
    switchPageToDisabledState: switchPageToDisabledState,
  };
})();
