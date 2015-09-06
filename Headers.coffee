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

# // Headers = function(headers){
# //   this.headers = headers;
# // };

# // Headers.prototype.get = function(name){
# //   var header;
# //   for (var i = this.headers.length - 1; i >= 0; i--) {
# //     header = this.headers[i]
# //     if (header.name === name) return header.value;
# //   };
# // };

# // Headers.prototype.log = function(name, value){
# //   console.group();
# //   this.headers.forEach(function(t){ console.log(t.name+': '+t.value); });
# //   console.groupEnd();
# //   return this;
# // };

# // Headers.prototype.set = function(name, value){
# //   var header;
# //   for (var i = this.headers.length - 1; i >= 0; i--) {
# //     header = this.headers[i]
# //     if (header.name === name){
# //       header.value = value;
# //       return this;
# //     }
# //   }
# //   this.add(name, value);
# //   return this;
# // }

# // Headers.prototype.add = function(name, value){
# //   this.headers.push({name: name, value: value});
# // }
