'use strict';

(function () {
  var TYPE_TEXT = 'text';
  var TYPE_FEATURES = 'features';
  var TYPE_AVATAR = 'avatar';
  var TYPE_PHOTOS = 'photos';
  var offerType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };
  var currentCard = null;
  var currentPin = null;

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  function render(offerData, pinElement) {
    currentPin = pinElement;
    close();
    currentCard = cardTemplate.cloneNode(true);
    var filter = document.querySelector('.map__filters-container');
    fillItem(currentCard, '.popup__title', offerData.offer.title, TYPE_TEXT);
    fillItem(currentCard, '.popup__text--address', offerData.offer.address, TYPE_TEXT);
    fillItem(currentCard, '.popup__text--price', preparePrice(offerData.offer.price), TYPE_TEXT);
    fillItem(currentCard, '.popup__type', prepareType(offerData.offer.type), TYPE_TEXT);
    fillItem(currentCard, '.popup__text--capacity', prepareCapacity(offerData.offer.rooms, offerData.offer.guests), TYPE_TEXT);
    fillItem(currentCard, '.popup__text--time', prepareCheckinCheckout(offerData.offer.checkin, offerData.offer.checkout), TYPE_TEXT);
    fillItem(currentCard, '.popup__description', offerData.offer.description, TYPE_TEXT);
    fillItem(currentCard, '.popup__features', offerData.offer.features, TYPE_FEATURES);
    fillItem(currentCard, '.popup__avatar', offerData.author.avatar, TYPE_AVATAR);
    fillItem(currentCard, '.popup__photos', offerData.offer.photos, TYPE_PHOTOS);

    currentCard.querySelector('.popup__close').addEventListener('click', closeBtnClickHandler);
    currentCard.querySelector('.popup__close').addEventListener('keydown', closeBtnKeydownHandler);
    document.addEventListener('keydown', keydownHandler);
    window.map.map.insertBefore(currentCard, filter);
    currentCard.focus();
  }

  function closeBtnClickHandler() {
    close();
  }

  function keydownHandler(evt) {
    window.utils.isEscEvent(evt, close);
  }

  function closeBtnKeydownHandler(evt) {
    if (evt.key === window.utils.Key.ENTER) {
      close();
    }
  }

  function close() {
    if (currentCard !== null) {
      window.map.map.removeChild(currentCard);
      currentCard = null;
      currentPin.classList.remove('map__pin--active');
      document.removeEventListener('keydown', keydownHandler);
    }
  }

  function preparePrice(text) {
    return text + '\u20bd/ночь';
  }

  function prepareType(text) {
    return text in offerType ? offerType[text] : 'Не известный тип жилья';
  }

  function prepareCapacity(rooms, guests) {
    return rooms + ' комнаты для ' + guests + ' гостей';
  }

  function prepareCheckinCheckout(checkin, checkout) {
    return 'Заезд после ' + checkin + ', выезд до ' + checkout;
  }

  function fillItem(parentelement, className, dataToFill, type) {
    var element = parentelement.querySelector(className);
    if (typeof dataToFill !== 'undefined' && (dataToFill || (dataToFill instanceof 'Array' && dataToFill.length))) {
      switch (type) {
        case TYPE_TEXT:
          fillTextType(element, dataToFill);
          break;
        case TYPE_FEATURES:
          fillFeaturesType(element, dataToFill);
          break;
        case TYPE_AVATAR:
          fillAvatarType(element, dataToFill);
          break;
        case TYPE_PHOTOS:
          fillPhotosType(element, dataToFill);
          break;
      }
    } else {
      element.classList.add('hidden');
    }
  }

  function fillPhotosType(element, photos) {
    var tempPhoto = element.children[0];
    var photosFragment = document.createDocumentFragment();
    element.innerHTML = '';
    photos.forEach(function (item, index) {
      var elementPhoto = tempPhoto.cloneNode(true);
      elementPhoto.src = photos[index];
      photosFragment.appendChild(elementPhoto);
    });
    element.appendChild(photosFragment);
  }

  function fillTextType(element, dataToFill) {
    element.textContent = dataToFill;
  }

  function fillAvatarType(element, dataToFill) {
    element.setAttribute('src', dataToFill);
  }

  function fillFeaturesType(element, dataToFill) {
    var fragmentFeatures = document.createDocumentFragment();
    element.innerHTML = '';
    dataToFill.forEach(function (item) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', 'popup__feature--' + item);
      fragmentFeatures.appendChild(featureElement);
    });
    element.appendChild(fragmentFeatures);
  }

  window.card = {
    render: render,
    close: close,
  };
})();
