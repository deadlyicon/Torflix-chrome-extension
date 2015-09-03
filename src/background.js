AllowedOrigins = {}
AllowedOrigins['torflix.jaredatron.com'] = true
AllowedOrigins['torflix.dev'] = true


ORIGIN_REGEXP = /^[^\/]*:\/\/([^\/]+)/
originOfUrl = function(url){
  return url.match(ORIGIN_REGEXP)[1]
}


isTorflixUrl = function(url){
  return AllowedOrigins[originOfUrl(url)];
};

filterForTorflixTabs = function(tabs){
  return tabs.filter(function(tab){ return isTorflixUrl(tab.url); });
};


getTorflixTabs = function(callback){
  chrome.tabs.query({}, function(tabs){
    callback(filterForTorflixTabs(tabs))
  });
};





// chrome.tabs.onCreated.addListener(function(tab){
//   console.log('onCreated', tab.id, tab)
// })
chrome.tabs.onUpdated.addListener(function(tabId, changes, tab){
  // console.log('onUpdated', tabId, tab, changes)
  if (changes.status == "complete" && isTorflixUrl(tab.url)) {
    console.info('FOUND ONE', tab)
    chrome.tabs.executeScript(null, {file: "tab.js"});
    // chrome.tabs.executeScript({
    //   code: 'document.body.innerText = "lolz"'
    // });
    // debugger
  }
})









// Array.prototype.includes = function(object){
//   return this.indexOf(object) !== -1
// };

// Headers = function(headers){
//   this.headers = headers;
// };

// Headers.prototype.get = function(name){
//   var header;
//   for (var i = this.headers.length - 1; i >= 0; i--) {
//     header = this.headers[i]
//     if (header.name === name) return header.value;
//   };
// };

// Headers.prototype.log = function(name, value){
//   console.group();
//   this.headers.forEach(function(t){ console.log(t.name+': '+t.value); });
//   console.groupEnd();
//   return this;
// };

// Headers.prototype.set = function(name, value){
//   var header;
//   for (var i = this.headers.length - 1; i >= 0; i--) {
//     header = this.headers[i]
//     if (header.name === name){
//       header.value = value;
//       return this;
//     }
//   }
//   this.add(name, value);
//   return this;
// }

// Headers.prototype.add = function(name, value){
//   this.headers.push({name: name, value: value});
// }

// var accessControlRequestHeaders;

// MAX_REQEST_IDS_SIZE = 1000
// RequestIds = [];
// pruneRequestIds = function(){
//   RequestIds = RequestIds.slice(0, MAX_REQEST_IDS_SIZE)
// }


// AllowedOrigins = [
//   'torflix.jaredatron.com',
//   'torflix.dev'
// ]

// ORIGIN_REGEXP = /^https?:\/\/([^/]+)/
// originOfUrl = function(url){
//   return url.match(ORIGIN_REGEXP)[1]
// }


// var requestListener = function(details) {
//   var headers = new Headers(details.requestHeaders);
//   var origin = headers.get('origin') || headers.get('Origin')
//   var refererOrigin;

//   referer = headers.get('Referer')
//   if (referer){
//     refererOrigin = originOfUrl(referer)
//   }

//   if (AllowedOrigins.includes(origin) || AllowedOrigins.includes(refererOrigin)){
//     console.log('-> Torflix', details.requestId, details.url, {details:details});
//     RequestIds.push(details.requestId)
//   }else{
//     console.log('-> OTHER  ', details.requestId, details.url, {details:details});
//   }
//   // headers.set("Origin","http://evil.com/")
//   // accessControlRequestHeaders = headers.get("Access-Control-Request-Headers")
//   return {}
// };


// var responseListener = function(details) {
//   if (RequestIds.includes(details.requestId)){
//     console.log('<- Torflix', details.requestId, details.url, {details:details});
//     // details.statusCode = 200
//     // var headers = new Headers(details.responseHeaders);
//     return {
//       responseHeaders: [
//         {name: 'Access-Control-Allow-Origin',  value: '*'},
//         {name: 'Access-Control-Allow-Methods', value: 'GET, PUT, POST, DELETE, HEAD, OPTIONS'},
//       ]
//     };
//   }else{
//     console.log('<- OTHER  ', details.requestId, details.url, {details:details});
//   }
//   pruneRequestIds()
//   return {responseHeaders: details.responseHeaders};
// };


// (chrome.runtime.onInstalled || chrome.runtime.onStartup).addListener(function(){

//   chrome.webRequest.onBeforeSendHeaders.addListener(
//     requestListener,
//     {urls: ["*://*/*"]},
//     ["blocking", "requestHeaders"]
//   );

//   chrome.webRequest.onHeadersReceived.addListener(
//     responseListener,
//     {urls: ["*://*/*"]},
//     ["blocking", "responseHeaders"]
//   );

// });




