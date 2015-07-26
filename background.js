console.log('background.js')


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });


// // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
// // if (!Array.prototype.find) {
// //   Array.prototype.find = function(predicate) {
// //     if (this == null) {
// //       throw new TypeError('Array.prototype.find called on null or undefined');
// //     }
// //     if (typeof predicate !== 'function') {
// //       throw new TypeError('predicate must be a function');
// //     }
// //     var list = Object(this);
// //     var length = list.length >>> 0;
// //     var thisArg = arguments[1];
// //     var value;

// //     for (var i = 0; i < length; i++) {
// //       value = list[i];
// //       if (predicate.call(thisArg, value, i, list)) {
// //         return value;
// //       }
// //     }
// //     return undefined;
// //   };
// // }



// chrome.tabs.query({}, function(tabs){
//   tabs.filter(function(){

//   })
// })

// chrome.tabs.query(, function(tabs){
//     chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"}, function(response) {});
// });








// // // Called when the user clicks on the browser action.
// // chrome.browserAction.onClicked.addListener(function(tab) {




// //   // No tabs or host permissions needed!
// //   console.log('Turning ' + tab.url + ' red!');
// //   chrome.tabs.executeScript({
// //     code: 'document.body.style.backgroundColor="red"'
// //   });
// // });



// // chrome.tabs.sendMessage(tabId, {}, function(response){
// //   alert('RESPONSE', JSON.stringify(response))
// // })

