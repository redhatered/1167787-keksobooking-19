'use strict';

(function () {
  function render(message, btnText, templateId, className, messageClass, btnClass, callbackAfterHide) {
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

    function hidePopup(callback) {
      document.removeEventListener('keydown', windowEscPressHandler);
      popupElement.removeEventListener('click', popupClickHandler);
      document.querySelector('body').removeChild(popupElement);
      if (callback) {
        callback();
      }
    }

    function windowEscPressHandler(evt) {
      window.utils.isEscEvent(evt, function () {
        hidePopup(callbackAfterHide);
      });
    }

    function popupClickHandler(evt) {
      if (!(evt.target && evt.target.matches(messageClass))) {
        hidePopup(callbackAfterHide);
      }
    }

    function btnClickHandler() {
      hidePopup(callbackAfterHide);
    }

    document.querySelector('body').appendChild(popupElement);
  }

  function renderError(message, btnText) {
    render(message, btnText, '#error', '.error', '.error__message', '.error__button', errorCallback);
  }

  function errorCallback() {
    window.page.switchPageToDisabledState();
  }

  window.popup = {
    renderError: renderError,
  };
})();
