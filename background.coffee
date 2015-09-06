Headers = require './Headers'

AllowedOrigins = {}
AllowedOrigins['torflix.jaredatron.com'] = true
AllowedOrigins['torflix.dev'] = true
AllowedOrigins['deadlyicon-putio.herokuapp.com'] = true
ORIGIN_REGEXP = /^[^\/]*:\/\/([^\/]+)/

originOfUrl = (url) ->
  try
    url.match(ORIGIN_REGEXP)[1]
  catch
    null

isTorflixUrl = (url) ->
  AllowedOrigins[originOfUrl(url)]

isTorflixRequest = (headers) ->
  isTorflixUrl(headers.get('Origin')) || isTorflixUrl(headers.get('Referer'))

# filterForTorflixTabs = (tabs) ->
#   tabs.filter (tab) ->
#     isTorflixUrl tab.url

# getTorflixTabs = (callback) ->
#   chrome.tabs.query {}, (tabs) ->
#     callback filterForTorflixTabs(tabs)
#     return
#   return

# chrome.tabs.onUpdated.addListener (tabId, changes, tab) ->
#   if changes.status == 'complete' and isTorflixUrl(tab.url)
#     console.info 'FOUND ONE', tab
#     chrome.tabs.executeScript null, file: 'tab.js'





chrome.runtime.onInstalled.addListener (details) ->
  console.log("%conInstall#{JSON.stringify(details, null, 2)}","color:red;")
  addListeners()

chrome.runtime.onStartup.addListener (details) ->
  console.log("%conStartup #{JSON.stringify(details, null, 2)}","color:red;")
  addListeners()

chrome.runtime.onConnect.addListener (details) ->
  console.log("%conConnect #{JSON.stringify(details, null, 2)}","color:red;")
  addListeners()


addListeners = ->
  chrome.webRequest.onHeadersReceived.removeListener(responseListener)
  chrome.webRequest.onBeforeSendHeaders.removeListener(requestListener)

  chrome.webRequest.onHeadersReceived.addListener responseListener, { urls: ['*://*/*'] }, [
    'blocking'
    'responseHeaders'
  ]
  chrome.webRequest.onBeforeSendHeaders.addListener requestListener, { urls: ['*://*/*'] }, [
    'blocking'
    'requestHeaders'
  ]


TorlfixRequests = {}

requestListener = (details) ->
  headers = new Headers(details.requestHeaders)
  if isTorflixRequest(headers)
    console.groupCollapsed("%cRequest","color:red;")
    console.log(JSON.stringify(details, null, 2))
    headers.set 'Origin', 'http://evil.com/'
    storedHeaders = TorlfixRequests[details.requestId] ||= {}
    storedHeaders['Access-Control-Request-Headers'] = headers.get('Access-Control-Request-Headers')
    console.log(JSON.stringify(details, null, 2))
    console.log('TorlfixRequests', TorlfixRequests)
    console.groupEnd('Request')

  return { requestHeaders: details.requestHeaders }


responseListener = (details) ->
  console.log('TorlfixRequests', TorlfixRequests)
  storedHeaders = TorlfixRequests[details.requestId]
  if storedHeaders
    console.groupCollapsed("%cResponse","color:blue;")
    delete TorlfixRequests[details.requestId]
    console.log(JSON.stringify(details, null, 2))
    headers = new Headers(details.responseHeaders)
    headers.set 'Access-Control-Allow-Origin', '*'
    if storedHeaders['Access-Control-Request-Headers']
      headers.set 'Access-Control-Allow-Headers', storedHeaders['Access-Control-Request-Headers']
    # else
    #   headers.rem 'Access-Control-Allow-Headers'
    headers.update 'Access-Control-Allow-Credentials', 'true'
    headers.set 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE'
    headers.set 'Allow', 'POST, GET, OPTIONS, PUT, DELETE'
    console.log(JSON.stringify(details, null, 2))
    console.groupEnd('Request')

  return { responseHeaders: details.responseHeaders }


addListeners()
