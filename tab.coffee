if global.TorflixChromeExtensionLoaded

  console.log('TorflixChromeExtension already loaded')

else
  global.TorflixChromeExtensionLoaded = true

  jQuery = require 'jquery'
  DOMEventMessageBus = require 'dom-event-message-bus'



  messageBus = new DOMEventMessageBus
    name:         'EXTENSION'
    color:        'orange'
    DOMNode:       document
    sendEvent:    'fromChromeExtension'
    receiveEvent: 'toChromeExtension'



  messageBus.onReceiveMessage = ({id, type, payload}) ->
    switch type

      when 'HTTPRequest'
        'HTTPRequest'

  if messageBus.isReady()
    messageBus.sendMessage('ready')
  else
    messageBus.log('NO READY :(')

  global.messageBus = messageBus
  global.jQuery = jQuery
