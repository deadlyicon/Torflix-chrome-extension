AllowedOrigins = {}
AllowedOrigins['torflix.jaredatron.com'] = true
AllowedOrigins['torflix.dev'] = true
AllowedOrigins['deadlyicon-putio.herokuapp.com'] = true
ORIGIN_REGEXP = /^[^\/]*:\/\/([^\/]+)/

originOfUrl = (url) ->
  url.match(ORIGIN_REGEXP)[1]

isTorflixUrl = (url) ->
  AllowedOrigins[originOfUrl(url)]

filterForTorflixTabs = (tabs) ->
  tabs.filter (tab) ->
    isTorflixUrl tab.url

getTorflixTabs = (callback) ->
  chrome.tabs.query {}, (tabs) ->
    callback filterForTorflixTabs(tabs)
    return
  return

chrome.tabs.onUpdated.addListener (tabId, changes, tab) ->
  if changes.status == 'complete' and isTorflixUrl(tab.url)
    console.info 'FOUND ONE', tab
    chrome.tabs.executeScript null, file: 'tab.js'

