'use strict';

(function () {
  var BASE_URL = 'https://js.dump.academy/keksobooking';
  var LOAD_METHOD = '/data';
  var SUCCESS_STATUS = 200;
  var TIMEOUT_IN_MS = 5000;

  function initXhr(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  }

  function load(onLoad, onError) {
    var xhr = initXhr(onLoad, onError);

    xhr.open('GET', BASE_URL + LOAD_METHOD);
    xhr.send();
  }

  window.backend = {
    load: load,
  };
})();

