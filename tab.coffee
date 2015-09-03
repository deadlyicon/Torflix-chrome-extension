initialize = ->
  global.TorflixChromeExtensionLoaded = true
  console.log('TorflixChromeExtension initializing')

  DOMEventMessageBus = require 'dom-event-message-bus'
  jQuery = require 'jquery'



  messageBus = new DOMEventMessageBus
    name:         'EXTENSION'
    color:        'orange'
    DOMNode:       document
    sendEvent:    'fromChromeExtension'
    receiveEvent: 'toChromeExtension'




  messageBus.onReceiveMessage = (message) ->
    # {id, type, payload} = message
    switch message.type
      when 'HTTPRequest'
        HTTPRequest(message)



  HTTPRequest = ({id, type, payload}) ->
    request = payload
    eventType = "HTTPRequestUpdate-#{request.id}"
    jQuery.ajax(request).complete (response) ->
      messageBus.dispatchEvent eventType,
        request:      request
        status:       response.status
        responseText: response.responseText
        responseJSON: response.responseJSON
    eventType


  messageBus.sendMessage 'ready'


  global.messageBus = messageBus
  global.jQuery = jQuery
# end

if global.TorflixChromeExtensionLoaded
  console.log('TorflixChromeExtension already loaded')
else
  initialize()
