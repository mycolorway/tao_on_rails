class TaoModule

  id = 0

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

  @get: (attributeName, getMethod) ->
    Object.defineProperty @prototype, attributeName,
      get: getMethod
      configurable: true

  @set: (attributeName, setMethod) ->
    Object.defineProperty @prototype, attributeName,
      set: setMethod
      configurable: true

  @attribute: (names..., options = {}) ->
    unless typeof options == 'object'
      names.push(options)
      options = {}

    names.forEach (name) =>
      @get name, ->
        @_attributes[name] ? options.default
      @set name, (val) ->
        return if @_attributes[name] == val
        @_attributes[name] = val
        @["_#{name}Changed"]?()

  constructor: (options = {}) ->
    @id = ++id
    @_attributes = {}

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
