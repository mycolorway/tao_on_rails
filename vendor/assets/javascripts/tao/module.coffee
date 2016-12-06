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

  constructor: (opts) ->
    @_setOptions opts
    @_init()

  _setOptions: (opts) ->
    @opts = $.extend {}, TaoModule.opts, opts

  _init: ->

  on: (args...) ->
    $(@).on args...

  off: (args...) ->
    $(@).off args...

  trigger: (args...) ->
    $(@).triggerHandler(args...)

  one: (args...) ->
    $(@).one args...

window.TaoModule = TaoModule
