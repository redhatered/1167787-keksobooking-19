'use strict';

(function () {
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

  var mapOverlay = document.querySelector('.map__overlay');

  function generateOffers() {
    var offers = [];
    for (var i = 1; i <= 8; i++) {
      offers.push(generateOffer(i));
    }
    return offers;
  }

  function generateOffer(index) {
    var authorAvatarNum = '0' + index;
    var authorAvatarUrl = AVATAR_URL + authorAvatarNum + AVATAR_URL_EXT;
    var offerTitle = window.utils.getRandomItem(OFFER_TITLES);
    var locationX = window.utils.getRandomInt(LOCATION_X_MIN, mapOverlay.offsetWidth);
    var locationY = window.utils.getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var offerPrice = window.utils.getRandomInt(MIN_PRICE, MAX_PRICE);
    var offerType = window.utils.getRandomItem(OFFER_TYPES);
    var offerRooms = window.utils.getRandomInt(ROOMS_MIN, ROOMS_MAX);
    var offerGuests = window.utils.getRandomInt(GUESTS_MIN, GUESTS_MAX);
    var offerCheckin = window.utils.getRandomItem(CHECKINS);
    var offerCheckout = window.utils.getRandomItem(CHECKOUTS);
    var offerFeatures = FEATURES.slice(window.utils.getRandomInt(0, FEATURES.length - 1));
    var offerDescription = window.utils.getRandomItem(DESCRIPTIONS);
    var offerPhotos = PHOTO_URLS.slice(window.utils.getRandomInt(0, PHOTO_URLS.length - 1));

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

  window.data = {
    generateOffers: generateOffers,
  };
})();
