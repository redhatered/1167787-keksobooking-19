'use strict';

(function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70,
  };

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  function renderPins(offers) {
    for (var i = 0; i < offers.length; i++) {
      if (offers[i].offer) {
        fragment.appendChild(renderPin(offers[i]));
      }
    }
    mapPins.appendChild(fragment);
  }

  function renderPin(offerData) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = offerData.location.x - (Pin.WIDTH / 2) + 'px';
    pinElement.style.top = offerData.location.y - Pin.HEIGHT + 'px';
    var img = pinElement.querySelector('img');
    img.setAttribute('src', offerData.author.avatar);
    img.setAttribute('alt', offerData.offer.title);

    return pinElement;
  }

  window.pin = {
    renderPins: renderPins,
  };
})();
