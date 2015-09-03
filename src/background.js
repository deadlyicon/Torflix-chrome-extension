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
/***/ function(module, exports) {

	var AllowedOrigins, ORIGIN_REGEXP, filterForTorflixTabs, getTorflixTabs, isTorflixUrl, originOfUrl;

	AllowedOrigins = {};

	AllowedOrigins['torflix.jaredatron.com'] = true;

	AllowedOrigins['torflix.dev'] = true;

	ORIGIN_REGEXP = /^[^\/]*:\/\/([^\/]+)/;

	originOfUrl = function(url) {
	  return url.match(ORIGIN_REGEXP)[1];
	};

	isTorflixUrl = function(url) {
	  return AllowedOrigins[originOfUrl(url)];
	};

	filterForTorflixTabs = function(tabs) {
	  return tabs.filter(function(tab) {
	    return isTorflixUrl(tab.url);
	  });
	};

	getTorflixTabs = function(callback) {
	  chrome.tabs.query({}, function(tabs) {
	    callback(filterForTorflixTabs(tabs));
	  });
	};

	chrome.tabs.onUpdated.addListener(function(tabId, changes, tab) {
	  if (changes.status === 'complete' && isTorflixUrl(tab.url)) {
	    console.info('FOUND ONE', tab);
	    return chrome.tabs.executeScript(null, {
	      file: 'tab.js'
	    });
	  }
	});


/***/ }
/******/ ]);