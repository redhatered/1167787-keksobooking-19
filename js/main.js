'use strict';

var AVATAR_URL = 'img/avatars/user';
var AVATAR_URL_EXT = '.png';
var OFFER_TITLES = ['Сдам комнату', 'Сдам квартиру', 'Сдам дом', 'Сдам гараж', 'Сдам помещение под склад'];
var MIN_PRICE = 1000;
var MAX_PRICE = 10000;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 8;
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['описание 1', 'описание 2', 'описание 3'];
var PHOTO_URLS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
var LOCATION_X_MIN = 0;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var LEFT_BTN_MOUSE_CODE = 0;
var ENTER_KEY = 'Enter';
var PIN_TAIL_HEIGHT = 22;

var mapOverlay = document.querySelector('.map__overlay');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var mapFiltersForm = document.querySelector('.map__filters');
var mapPinMain = document.querySelector('.map__pin--main');
var inputAddress = adForm.querySelector('#address');
var selectRoomNumber = adForm.querySelector('#room_number');
var selectCapacity = adForm.querySelector('#capacity');
var fragment = document.createDocumentFragment();

var offers = [];

switchPageToDisabledState();
generateOffers();
setAddress(getMapPinMainCoords());
validateRoomNumberSelect();
// showMap();
// renderPins();

mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
mapPinMain.addEventListener('keydown', onMapPinMainKeydown);
selectRoomNumber.addEventListener('change', validateRoomNumberSelect);
selectCapacity.addEventListener('change', validateRoomNumberSelect);


function validateRoomNumberSelect() {
  if (selectRoomNumber.value < selectCapacity.value) {
    selectRoomNumber.setCustomValidity('Количество мест, больше чем количество комнат');
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

function onMapPinMainMousedown(evt) {
  if (evt.button === LEFT_BTN_MOUSE_CODE) {
    switchPageToActiveState();
  }
}

function onMapPinMainKeydown(evt) {
  if (evt.key === ENTER_KEY) {
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
  setAddress(getMapPinMainCoords());
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
  setAddress(getMapPinMainCoords());
}

function renderPins() {
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }
  mapPins.appendChild(fragment);
}

function renderPin(offerData) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = offerData.location.x - (PIN_WIDTH / 2) + 'px';
  pinElement.style.top = offerData.location.y - PIN_HEIGHT + 'px';
  var img = pinElement.querySelector('img');
  img.setAttribute('src', offerData.author.avatar);
  img.setAttribute('alt', offerData.offer.title);

  return pinElement;
}

function generateOffers() {
  for (var i = 1; i <= 8; i++) {
    offers.push(generateOffer(i));
  }
}

function generateOffer(index) {
  var authorAvatarNum = '0' + index;
  var authorAvatarUrl = AVATAR_URL + authorAvatarNum + AVATAR_URL_EXT;
  var offerTitle = getRandomItem(OFFER_TITLES);
  var locationX = getRandomInt(LOCATION_X_MIN, mapOverlay.offsetWidth);
  var locationY = getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);
  var offerPrice = getRandomInt(MIN_PRICE, MAX_PRICE);
  var offerType = getRandomItem(OFFER_TYPES);
  var offerRooms = getRandomInt(ROOMS_MIN, ROOMS_MAX);
  var offerGuests = getRandomInt(GUESTS_MIN, GUESTS_MAX);
  var offerCheckin = getRandomItem(CHECKINS);
  var offerCheckout = getRandomItem(CHECKOUTS);
  var offerFeatures = FEATURES.slice(getRandomInt(0, FEATURES.length - 1));
  var offerDescription = getRandomItem(DESCRIPTIONS);
  var offerPhotos = PHOTO_URLS.slice(getRandomInt(0, PHOTO_URLS.length - 1));

  return {
    'author': {
      'avatar': authorAvatarUrl,
    },
    'offer': {
      'title': offerTitle,
      'address': locationX + ', ' + locationY,
      'price': offerPrice,
      'type': offerType,
      'rooms': offerRooms,
      'guests': offerGuests,
      'checkin': offerCheckin,
      'checkout': offerCheckout,
      'features': offerFeatures,
      'description': offerDescription,
      'photos': offerPhotos,
    },
    'location': {
      'x': locationX,
      'y': locationY,
    }
  };
}


function getRandomInt(min, max) {
  var rand = min + Math.random() * (max - min);
  return Math.round(rand);
}

function getRandomItem(itemsArr) {
  return itemsArr[Math.floor(Math.random() * itemsArr.length)];
}
