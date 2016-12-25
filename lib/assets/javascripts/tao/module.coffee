class TaoModule

  @extend: (obj) ->
    unless obj and typeof obj == 'object'
      throw new Error('TaoModule.extend: param should be an object')

    for key, val of obj when key not in ['included', 'extended']
      @[key] = val

    obj.extended?.call(@)
    @

  @include: (obj) ->
    unless obj and typeof obj == 'object'
      throw new Error('TaoModule.include: param should be an object')

    for key, val of obj when key not in ['included', 'extended']
      @::[key] = val

    obj.included?.call(@)
    @

  @get: (propertyName, getMethod) ->
    Object.defineProperty @prototype, propertyName,
      get: getMethod
      configurable: true

  @set: (propertyName, setMethod) ->
    Object.defineProperty @prototype, propertyName,
      set: setMethod
      configurable: true

  @property: (names..., options = {}) ->
    unless typeof options == 'object'
      names.push(options)
      options = {}

    names.forEach (name) =>
      @get name, ->
        @_properties[name] ? options.default
      @set name, (val) ->
        return if @_properties[name] == val
        @_properties[name] = val
        @["_#{name}Changed"]?()

  constructor: (options = {}) ->
    @_properties = {}
    
    if typeof options == 'object'
      @[key] = val for key, val of options

    @_init()

  _init: ->
    # to be implemented

  on: (args...) ->
    $(@).on args...

  off: (args...) ->
    $(@).off args...

  trigger: (args...) ->
    $(@).triggerHandler(args...)

  one: (args...) ->
    $(@).one args...

window.TaoModule = TaoModule
