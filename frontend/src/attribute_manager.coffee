import Module from './module'
import _ from 'lodash'

manager = null

export default class AttributeManager extends Module

  @defaultOptions =
    type: 'string'

  @getManager: ->
    manager ||= new AttributeManager()

  @getAttribute: (element, name, options) ->
    manager = @getManager()
    options = _.extend {}, @defaultOptions, options
    manager._attributes[_.camelCase(options.type)]?.get element, name, options

  @setAttribute: (element, name, val, options) ->
    manager = @getManager()
    options = _.extend {}, @defaultOptions, options
    manager._attributes[_.camelCase(options.type)]?.set element, name, val, options

  _attributes: {}

  @registerAttribute: (type, config) ->
    if _.isString config
      @::_attributes[type] = @::_attributes[config]
    else
      @::_attributes[type] = config

  @registerAttribute 'string',
    get: (element, name, options) ->
      element.getAttribute(name) || options.default || ''
    set: (element, name, val, options) ->
      element.setAttribute(name, val.toString())

  @registerAttribute 'number',
    get: (element, name, options) ->
      value = parseFloat element.getAttribute(name)
      if _.isNaN value
        if _.isNumber(options.default) then options.default else null
      else
        value
    set: (element, name, val, options) ->
      element.setAttribute(name, val.toString())

  @registerAttribute 'boolean',
    get: (element, name, options) ->
      element.hasAttribute(name)
    set: (element, name, val, options) ->
      if val
        element.setAttribute name, ''
      else
        element.removeAttribute name

  @registerAttribute 'bool', 'boolean'

  @registerAttribute 'hash',
    get: (element, name, options) ->
      value = element.getAttribute name
      if _.isString value
        try
          JSON.parse value
        catch e
          options.default || null
      else
        options.default || null
    set: (element, name, val, options) ->
      val = try
        JSON.stringify val
      catch e
        '{}'
      element.setAttribute name, val

  @registerAttribute 'object', 'hash'

  @registerAttribute 'array',
    get: (element, name, options) ->
      value = element.getAttribute name
      if _.isString value
        try
          JSON.parse value
        catch e
          options.default || null
      else
        options.default || null
    set: (element, name, val, options) ->
      val = try
        JSON.stringify val
      catch e
        '[]'
      element.setAttribute name, val
