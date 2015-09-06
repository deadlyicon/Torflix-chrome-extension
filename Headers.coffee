module.exports = class Headers
  constructor: (@headers) ->

  _get: (name) ->
    for header in @headers
      return header if header.name.toLowerCase() == name.toLowerCase()

  get: (name) ->
    @_get(name)?.value

  include: (name) ->
    !!@_get(name)

  set: (name, value) ->
    header = @_get(name)
    if !header
      header = {name: name}
      @headers.push(header)
    header.value = value
    this

  update: (name, value) ->
    @set(name, value) if @_get(name)?
    this

  log: ->
    console.group()
    for header in headers
      console.log(header.name+': '+JSON.stringify(header.value, null, 2))
    console.groupEnd()
    this
