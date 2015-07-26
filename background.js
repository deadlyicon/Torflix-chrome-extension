console.log('background.js')
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('app.html', {
    'outerBounds': {
      'width': 400,
      'height': 500
    }
  });
});



var oReq = new XMLHttpRequest();
oReq.onload = function() { debugger };
oReq.open("GET", 'https://developer.chrome.com/apps/first_app', true);
oReq.send();
