Array.prototype.includes = function(object){
  return this.indexOf(object) !== -1
};

Headers = function(headers){
  this.headers = headers;
};

Headers.prototype.get = function(name){
  var header;
  for (var i = this.headers.length - 1; i >= 0; i--) {
    header = this.headers[i]
    if (header.name === name) return header.value;
  };
};

Headers.prototype.log = function(name, value){
  console.group();
  this.headers.forEach(function(t){ console.log(t.name+': '+t.value); });
  console.groupEnd();
  return this;
};

Headers.prototype.set = function(name, value){
  var header;
  for (var i = this.headers.length - 1; i >= 0; i--) {
    header = this.headers[i]
    if (header.name === name){
      header.value = value;
      return this;
    }
  }
  this.add(name, value);
  return this;
}

Headers.prototype.add = function(name, value){
  this.headers.push({name: name, value: value});
}

var accessControlRequestHeaders;

MAX_REQEST_IDS_SIZE = 1000
RequestIds = [];
pruneRequestIds = function(){
  RequestIds = RequestIds.slice(0, MAX_REQEST_IDS_SIZE)
}

AllowedOrigins = [
  'http://torflix.jaredatron.com',
  'http://putio.dev'
]

var requestListener = function(details) {
  var headers = new Headers(details.requestHeaders);
  var origin = headers.get('Origin');
  if (AllowedOrigins.includes(origin)){
    console.log('Torflix Request', details.requestId, details);
    RequestIds.push(details.requestId)
  }
  // headers.set("Origin","http://evil.com/")
  // accessControlRequestHeaders = headers.get("Access-Control-Request-Headers")
  return {}
};


var responseListener = function(details) {
  if (RequestIds.includes(details.requestId)){
    console.log('Torflix Response', details.requestId, details);
    var headers = new Headers(details.responseHeaders);
    headers.set('Access-Control-Allow-Origin', '*')
    headers.add('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
    // headers.add('Access-Control-Allow-Headers', accessControlRequestHeaders)
  }
  pruneRequestIds()
  return {responseHeaders: details.responseHeaders};
};


chrome.runtime.onInstalled.addListener(function(){

  chrome.webRequest.onBeforeSendHeaders.addListener(
    requestListener,
    {urls: ["*://*/*"]},
    ["blocking", "requestHeaders"]
  );

  chrome.webRequest.onHeadersReceived.addListener(
    responseListener,
    {urls: ["*://*/*"]},
    ["blocking", "responseHeaders"]
  );

});




