'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var housingFeatures = filterForm.querySelector('#housing-features');
  var dataToFilter = [];
  var filteredData = [];
  var LIMIT = 5;
  var filterPriceMap = {
    'low': {
      MIN: 0,
      MAX: 10000
    },
    'middle': {
      MIN: 10000,
      MAX: 50000
    },
    'high': {
      MIN: 50000,
      MAX: 1000001
    },
  };

  function changeFilterFormHandler() {
    filteredData = dataToFilter.slice();
    filteredData = filteredData.filter(function (offerData) {
      return offerData.offer;
    }).filter(function (offerData) {
      return filterSelect(housingType, offerData, 'type');
    }).filter(function (offerData) {
      return filterPrice(offerData);
    }).filter(function (offerData) {
      return filterSelect(housingRooms, offerData, 'rooms');
    }).filter(function (offerData) {
      return filterSelect(housingGuests, offerData, 'guests');
    }).filter(function (offerData) {
      return filterFeatures(offerData);
    })
    ;
    window.pin.removePins();
    window.pin.renderPins(filteredData, LIMIT);
  }

  function filterPrice(offerData) {
    return housingPrice.value !== 'any'
      ? offerData.offer.price >= filterPriceMap[housingPrice.value].MIN &&
      offerData.offer.price < filterPriceMap[housingPrice.value].MAX
      : true;
  }

  function filterFeatures(offerData) {
    var checkedFeatures = [].slice.call(housingFeatures.querySelectorAll('input[type="checkbox"]:checked'));
    var checkedFeaturesValues = checkedFeatures.map(function (feature) {
      return feature.value;
    });
    if (checkedFeaturesValues.length) {
      return checkedFeaturesValues.every(function (element) {
        return offerData.offer.features.indexOf(element) > -1;
      });
    }

    return true;
  }

  function filterSelect(field, offerData, prop) {
    return field.value !== 'any' ? offerData.offer[prop].toString() === field.value : true;
  }

  function activate(data) {
    dataToFilter = data.slice();
    changeFilterFormHandler();
    filterForm.addEventListener('change', changeFilterFormHandler);
    filterForm.querySelectorAll('fieldset, select').forEach(function (item) {
      item.removeAttribute('disabled');
    });
  }

  function disable() {
    filterForm.reset();
    filterForm.querySelectorAll('fieldset, select').forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    filterForm.removeEventListener('change', changeFilterFormHandler);
  }

  window.filter = {
    activate: activate,
    disable: disable,
  };
})();
