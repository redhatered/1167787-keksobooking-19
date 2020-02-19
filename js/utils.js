'use strict';

(function () {
  var LEFT_BTN_MOUSE_CODE = 0;
  var Key = {
    ESC: 'Escape',
    ENTER: 'Enter'
  };

  function isEscEvent(evt, callback) {
    if (evt.key === Key.ESC) {
      callback();
    }
  }

  window.utils = {
    LEFT_BTN_MOUSE_CODE: LEFT_BTN_MOUSE_CODE,
    Key: Key,
    isEscEvent: isEscEvent,
  };
})();
