'use strict';

var AVATAR_URL = 'img/avatars/user{{xx}}.png';
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

var mapOverlay = document.querySelector('.map__overlay');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var offers = [];

generateOffers();
showMap();
renderPins();

function renderPins() {
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }
  mapPins.appendChild(fragment);
}

function renderPin(offerData) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = offerData.location.x + 'px';
  pinElement.style.top = offerData.location.y + 'px';
  var img = pinElement.querySelector('img');
  img.setAttribute('src', offerData.author.avatar);
  img.setAttribute('alt', offerData.offer.title);

  return pinElement;
}

function showMap() {
  document.querySelector('.map').classList.remove('map--faded');
}

function generateOffers() {
  for (var i = 0; i < 8; i++) {
    offers.push(generateOffer(i));
  }
}

function generateOffer(index) {
  var authorAvatarNum = '0' + ++index;
  var authorAvatarUrl = AVATAR_URL.replace('{{xx}}', authorAvatarNum);
  var offerTitle = getRandomItem(OFFER_TITLES);
  var locationX = randomInt(LOCATION_X_MIN, mapOverlay.offsetWidth);
  var locationY = randomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);
  var offerPrice = randomInt(MIN_PRICE, MAX_PRICE);
  var offerType = getRandomItem(OFFER_TYPES);
  var offerRooms = randomInt(ROOMS_MIN, ROOMS_MAX);
  var offerGuests = randomInt(GUESTS_MIN, GUESTS_MAX);
  var offerCheckin = getRandomItem(CHECKINS);
  var offerCheckout = getRandomItem(CHECKOUTS);
  var offerFeatures = FEATURES.slice(randomInt(0, FEATURES.length - 1));
  var offerDescription = getRandomItem(DESCRIPTIONS);
  var offerPhotos = PHOTO_URLS.slice(randomInt(0, PHOTO_URLS.length - 1));

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


function randomInt(min, max) {
  var rand = min + Math.random() * (max - min);
  return Math.round(rand);
}

function getRandomItem(itemsArr) {
  return itemsArr[Math.floor(Math.random() * itemsArr.length)];
}
