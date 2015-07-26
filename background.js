Headers = function(headers){
  this.headers = headers;
};

Headers.prototype.get = function(name){
  var header;
  for (var i = this.headers.length - 1; i >= 0; i--) {
    header = this.headers[i]
    if (header.name === name) return header;
  };
};

Headers.prototype.log = function(name, value){
  console.group()
  this.headers.forEach(function(t){ console.log(t.name+': '+t.value); });
  console.groupEnd()
};

Headers.prototype.set = function(name, value){
  var header = this.get(name)
  if (header){
    header.value = value
  }else{
    this.add(name, value);
  }
}
Headers.prototype.add = function(name, value){
  this.headers.push({name: name, value: value});
}

var accessControlRequestHeaders;

var requestListener = function(details) {
  var headers = new Headers(details.requestHeaders);
  console.info('REQUEST HEADERS BEFORE')
  headers.log()
  headers.set("Origin","http://evil.com/")
  // accessControlRequestHeaders = headers.get("Access-Control-Request-Headers")
  console.info('REQUEST HEADERS AFTER')
  headers.log()
  return {requestHeaders: details.requestHeaders}
};


var responseListener = function(details) {
  var headers = new Headers(details.responseHeaders);
  console.info('RESPONSE HEADERS BEFORE')
  headers.log()
  headers.set('Access-Control-Allow-Origin', '*')
  // headers.add('Access-Control-Allow-Headers', accessControlRequestHeaders)
  headers.add('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
  console.info('RESPONSE HEADERS AFTER')
  headers.log()
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




