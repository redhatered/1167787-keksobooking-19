'use strict';

(function () {
  function render(message, btnText, templateId, className, messageClass, btnClass) {
    var popupTemplate = document.querySelector(templateId)
      .content
      .querySelector(className);
    var popupElement = popupTemplate.cloneNode(true);

    if (messageClass) {
      var messageBlock = popupElement.querySelector(messageClass);
      messageBlock.textContent = message;

      popupElement.addEventListener('click', popupClickHandler);
    }
    if (btnClass) {
      var btn = popupElement.querySelector(btnClass);
      btn.textContent = btnText;

      btn.addEventListener('click', btnClickHandler);
    }

    document.addEventListener('keydown', windowEscPressHandler);

    function hidePopup() {
      document.removeEventListener('keydown', windowEscPressHandler);
      popupElement.removeEventListener('click', popupClickHandler);
      document.querySelector('body').removeChild(popupElement);
    }

    function windowEscPressHandler(evt) {
      window.utils.isEscEvent(evt, hidePopup);
    }

    function popupClickHandler(evt) {
      if (!(evt.target && evt.target.matches(messageClass))) {
        hidePopup();
      }
    }

    function btnClickHandler() {
      hidePopup();
    }

    document.querySelector('body').appendChild(popupElement);
  }

  function renderError(message, btnText) {
    render(message, btnText, '#error', '.error', '.error__message', '.error__button');
  }

  window.popup = {
    renderError: renderError,
  };
})();
