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
  var renderedPins = [];

  function renderPins(offers, limit) {
    offers.slice(0, limit).forEach(function (offerData) {
      var renderedPin = renderPin(offerData);
      fragment.appendChild(renderedPin);
      renderedPins.push(renderedPin);
    });
    mapPins.appendChild(fragment);
  }

  function removePins() {
    if (renderedPins) {
      renderedPins.forEach(function (pin) {
        mapPins.removeChild(pin);
      });
    }
    renderedPins = [];
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
    removePins: removePins,
  };
})();
