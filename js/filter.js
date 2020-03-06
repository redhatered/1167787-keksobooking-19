'use strict';

(function () {
  var LIMIT = 5;
  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var housingFeatures = filterForm.querySelector('#housing-features');
  var dataToFilter = [];
  var filteredData = [];
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

  function doFiltering() {
    filteredData = [];
    for (var i = 0; i < dataToFilter.length; i++) {
      if (dataToFilter[i].offer
        && filterSelect(housingType, dataToFilter[i], 'type')
        && filterPrice(dataToFilter[i])
        && filterSelect(housingRooms, dataToFilter[i], 'rooms')
        && filterSelect(housingGuests, dataToFilter[i], 'guests')
        && filterFeatures(dataToFilter[i])
      ) {
        filteredData.push(dataToFilter[i]);
      }
      if (filteredData.length === LIMIT) {
        break;
      }
    }
    window.pin.removePins();
    window.pin.renderPins(filteredData);
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
    doFiltering();
    filterForm.addEventListener('change', window.filter.changeFilterFormHandler);
    filterForm.querySelectorAll('fieldset, select').forEach(function (item) {
      item.removeAttribute('disabled');
    });
  }

  function disable() {
    filterForm.reset();
    filterForm.querySelectorAll('fieldset, select').forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    filterForm.removeEventListener('change', window.filter.changeFilterFormHandler);
  }

  window.filter = {
    activate: activate,
    disable: disable,
    changeFilterFormHandler: window.debounce(doFiltering),
  };
})();
