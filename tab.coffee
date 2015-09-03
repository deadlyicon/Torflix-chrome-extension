if global.TorflixChromeExtensionLoaded

  console.log('TorflixChromeExtension already loaded')

else
  global.TorflixChromeExtensionLoaded = true

  jQuery = require 'jquery'
  DOMEventMessageBus = require 'dom-event-message-bus'



  messageBus = new DOMEventMessageBus
    name:         'EXTENSION'
    DOMNode:       document
    sendEvent:    'fromChromeExtension'
    receiveEvent: 'toChromeExtension'



  messageBus.onReceiveMessage = ({id, type, payload}) ->
    switch type

      when 'ping'
        messageBus.sendMessage 'pong', payload

      when 'pong'
        console.log 'TorflixChromeExtension received pong', payload




  console.log('TorflixChromeExtension loaded')
  messageBus.sendMessage('ready')
    .then((response)->
      debugger
    )
    .catch((response)->
      debugger
    )
