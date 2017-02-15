#= require ./module

parser = null

class TaoAttributeParser extends TaoModule

  @defaultOptions =
    type: 'string'

  @getParser: ->
    parser ||= new TaoAttributeParser()

  @parse: (value, options = {}) ->
    parser = @getParser()
    options = _.extend {}, @defaultOptions, options
    if parse = parser["_#{_.camelCase "parse_#{options.type}"}"]
      parse.call parser, value, options
    else
      value

  @stringify: (value, options = {}) ->
    parser = @getParser()
    options = _.extend {}, @defaultOptions, options
    if stringify = parser["_#{_.camelCase "stringify_#{options.type}"}"]
      stringify.call parser, value, options
    else
      value

  _parseString: (value, options) ->
    value || options.default || ''

  _parseBoolean: (value, options) ->
    if _.isNil value
      options.default || false
    else if value == 'true'
      true
    else if value == 'false'
      false
    else
      !!value

  @aliasMethod '_parseBool', '_parseBoolean'

  _parseHash: (value, options) ->
    if _.isString value
      try
        JSON.parse value
      catch e
        options.default || {}
    else
      options.default || {}

  @aliasMethod '_parseObject', '_parseHash'

  _parseArray: (value, options) ->
    if _.isString value
      try
        JSON.parse value
      catch e
        options.default || []
    else
      options.default || []

  _stringifyString: (value, options) ->
    value.toString()

  _stringifyBoolean: (value, options) ->
    unless _.isBoolean value
      value = options.default || false

    if value == true
      'true'
    else if value == false
      'false'
    else
      null

  @aliasMethod '_stringifyBool', '_stringifyBoolean'

  _stringifyHash: (value, options) ->
    unless _.isObject value
      value = options.default || {}

    try
      JSON.stringify value
    catch e
      '{}'

  @aliasMethod '_stringifyObject', '_stringifyHash'

  _stringifyArray: (value, options) ->
    unless _.isObject value
      value = options.default || []

    try
      JSON.stringify value
    catch e
      '[]'

Tao.AttributeParser = window.TaoAttributeParser = TaoAttributeParser
