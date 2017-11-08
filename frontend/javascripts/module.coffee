import $ from 'jquery'
import _ from 'lodash'

export default class Module

  id = 0

  @extend: (obj) ->
    obj = obj.call(@) if _.isFunction obj
    return unless obj and typeof obj == 'object'

    for key, val of obj when key not in ['included', 'extended']
      @[key] = val

    obj.extended?.call(@)
    @

  @include: (obj) ->
    obj = obj.call(@) if _.isFunction obj
    return unless obj and typeof obj == 'object'

    for key, val of obj when key not in ['included', 'extended']
      @::[key] = val

    obj.included?.call(@)
    @

  @get: (name, method) ->
    Object.defineProperty @prototype, name,
      get: method
      configurable: true

  @set: (name, method) ->
    Object.defineProperty @prototype, name,
      set: method
      configurable: true

  @property: (names..., options = {}) ->
    unless typeof options == 'object'
      names.push(options)
      options = {}

    names.forEach (name) =>
      @get name, ->
        unless _.isUndefined @_proterties[name]
          @_proterties[name]
        else if _.isFunction options.default
          options.default.call @
        else
          options.default
      @set name, (val) ->
        return if @_proterties[name] == val
        @_proterties[name] = val
        @["_#{name}Changed"]?()

  @_options: []

  @option: (names..., options = {}) ->
    unless typeof options == 'object'
      names.push(options)
      options = {}

    names.forEach (name) =>
      @_options.push(name) unless name in @_options
      @property name, options

  @aliasMethod: (newMethod, oldMethod) ->
    @::[newMethod] = ->
      @[oldMethod]?.apply(@, arguments)

  constructor: (options = {}) ->
    @id = ++id
    @_proterties = {}

    if _.isObject options
      for key, val of options
        @[key] = val if key in @constructor._options

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
