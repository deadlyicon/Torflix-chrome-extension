/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var AllowedOrigins, Headers, ORIGIN_REGEXP, TorlfixRequests, addListeners, isTorflixRequest, isTorflixUrl, originOfUrl, requestListener, responseListener;

	Headers = __webpack_require__(1);

	AllowedOrigins = {};

	AllowedOrigins['torflix.jaredatron.com'] = true;

	AllowedOrigins['torflix.dev'] = true;

	AllowedOrigins['deadlyicon-putio.herokuapp.com'] = true;

	ORIGIN_REGEXP = /^[^\/]*:\/\/([^\/]+)/;

	originOfUrl = function(url) {
	  var error;
	  try {
	    return url.match(ORIGIN_REGEXP)[1];
	  } catch (error) {
	    return null;
	  }
	};

	isTorflixUrl = function(url) {
	  return AllowedOrigins[originOfUrl(url)];
	};

	isTorflixRequest = function(headers) {
	  return isTorflixUrl(headers.get('Origin')) || isTorflixUrl(headers.get('Referer'));
	};

	chrome.runtime.onInstalled.addListener(function(details) {
	  console.log("%conInstall" + (JSON.stringify(details, null, 2)), "color:red;");
	  return addListeners();
	});

	chrome.runtime.onStartup.addListener(function(details) {
	  console.log("%conStartup " + (JSON.stringify(details, null, 2)), "color:red;");
	  return addListeners();
	});

	chrome.runtime.onConnect.addListener(function(details) {
	  console.log("%conConnect " + (JSON.stringify(details, null, 2)), "color:red;");
	  return addListeners();
	});

	addListeners = function() {
	  chrome.webRequest.onHeadersReceived.removeListener(responseListener);
	  chrome.webRequest.onBeforeSendHeaders.removeListener(requestListener);
	  chrome.webRequest.onHeadersReceived.addListener(responseListener, {
	    urls: ['*://*/*']
	  }, ['blocking', 'responseHeaders']);
	  return chrome.webRequest.onBeforeSendHeaders.addListener(requestListener, {
	    urls: ['*://*/*']
	  }, ['blocking', 'requestHeaders']);
	};

	TorlfixRequests = {};

	requestListener = function(details) {
	  var headers, name, storedHeaders;
	  headers = new Headers(details.requestHeaders);
	  if (isTorflixRequest(headers)) {
	    console.groupCollapsed("%cRequest", "color:red;");
	    console.log(JSON.stringify(details, null, 2));
	    headers.set('Origin', 'http://evil.com/');
	    storedHeaders = TorlfixRequests[name = details.requestId] || (TorlfixRequests[name] = {});
	    storedHeaders['Access-Control-Request-Headers'] = headers.get('Access-Control-Request-Headers');
	    console.log(JSON.stringify(details, null, 2));
	    console.log('TorlfixRequests', TorlfixRequests);
	    console.groupEnd('Request');
	  }
	  return {
	    requestHeaders: details.requestHeaders
	  };
	};

	responseListener = function(details) {
	  var headers, storedHeaders;
	  console.log('TorlfixRequests', TorlfixRequests);
	  storedHeaders = TorlfixRequests[details.requestId];
	  if (storedHeaders) {
	    console.groupCollapsed("%cResponse", "color:blue;");
	    delete TorlfixRequests[details.requestId];
	    console.log(JSON.stringify(details, null, 2));
	    headers = new Headers(details.responseHeaders);
	    headers.set('Access-Control-Allow-Origin', '*');
	    if (storedHeaders['Access-Control-Request-Headers']) {
	      headers.set('Access-Control-Allow-Headers', storedHeaders['Access-Control-Request-Headers']);
	    }
	    headers.update('Access-Control-Allow-Credentials', 'true');
	    headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
	    headers.set('Allow', 'POST, GET, OPTIONS, PUT, DELETE');
	    console.log(JSON.stringify(details, null, 2));
	    console.groupEnd('Request');
	  }
	  return {
	    responseHeaders: details.responseHeaders
	  };
	};

	addListeners();


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Headers;

	module.exports = Headers = (function() {
	  function Headers(headers1) {
	    this.headers = headers1;
	  }

	  Headers.prototype._get = function(name) {
	    var header, i, len, ref;
	    ref = this.headers;
	    for (i = 0, len = ref.length; i < len; i++) {
	      header = ref[i];
	      if (header.name.toLowerCase() === name.toLowerCase()) {
	        return header;
	      }
	    }
	  };

	  Headers.prototype.get = function(name) {
	    var ref;
	    return (ref = this._get(name)) != null ? ref.value : void 0;
	  };

	  Headers.prototype.include = function(name) {
	    return !!this._get(name);
	  };

	  Headers.prototype.set = function(name, value) {
	    var header;
	    header = this._get(name);
	    if (!header) {
	      header = {
	        name: name
	      };
	      this.headers.push(header);
	    }
	    header.value = value;
	    return this;
	  };

	  Headers.prototype.update = function(name, value) {
	    if (this._get(name) != null) {
	      this.set(name, value);
	    }
	    return this;
	  };

	  Headers.prototype.log = function() {
	    var header, i, len;
	    console.group();
	    for (i = 0, len = headers.length; i < len; i++) {
	      header = headers[i];
	      console.log(header.name + ': ' + JSON.stringify(header.value, null, 2));
	    }
	    console.groupEnd();
	    return this;
	  };

	  return Headers;

	})();


/***/ }
/******/ ]);