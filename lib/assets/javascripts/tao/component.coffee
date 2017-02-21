#= require lodash
#= require polyfills/polyfills
#= require ./attribute_parser

components = {}

TaoComponentBasedOn = (superClassName = 'HTMLElement') ->
  return components[superClassName] if components[superClassName]

  class ComponentClass

    # coffee's inheritance code is not compatible with custom elements
    superClass = window[superClassName]

    @prototype = Object.create superClass.prototype,
      constructor:
        value: @
        enumerable: false
        writable: true
        configurable: true

    if Object.setPrototypeOf?
      Object.setPrototypeOf @, superClass
    else
      @__proto__ = superClass


    count = 0

    @extend: (obj) ->
      unless obj and typeof obj == 'object'
        throw new Error('TaoComponent.extend: param should be an object')

      for key, val of obj when key not in ['included', 'extended']
        @[key] = val

      obj.extended?.call(@)
      @

    @include: (obj) ->
      unless obj and typeof obj == 'object'
        throw new Error('TaoComponent.include: param should be an object')

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
        attrName = _.kebabCase(name)

        @get name, ->
          val = if @hasAttribute attrName
             @getAttribute(attrName)
          else
            null
          TaoAttributeParser.parse val, options

        @set name, (val) ->
          val = TaoAttributeParser.stringify val, options
          if _.isString val
            @setAttribute attrName, val
          else
            @removeAttribute attrName

        @observedAttributes.push(attrName) if options.observe

    @tag: '' # to be set by child class

    @register: (componentClass) ->
      return unless componentClass.tag
      customElements.define componentClass.tag, componentClass

    @observedAttributes: []

    @get 'jq', ->
      $(@)

    @attribute 'taoId'

    constructor: ->
      _instance = superClass.apply @, arguments
      @_created()
      return _instance

    connectedCallback: ->
      $ =>
        unless @initialized
          @taoId = ++count
          @_init()
          @initialized = true

        @connected = true
        @_connected()

    disconnectedCallback: ->
      $ =>
        @connected = false
        @_disconnected()

    attributeChangedCallback: (name) ->
      @_attributeChanged name

    _created: ->
      # called when the element was created

    _init: ->
      # called when the element was connected to dom for the first time

    _connected: ->
      # called when the element was connected to dom

    _disconnected: ->
      # called when the element was disconnected from dom

    _attributeChanged: (name) ->
      @["_#{_.camelCase name}Changed"]?()

    beforeCache: ->
      # called before turbolinks cache pages

    on: (args...) ->
      @jq.on args...

    off: (args...) ->
      @jq.off args...

    trigger: (args...) ->
      @jq.triggerHandler(args...)

    one: (args...) ->
      @jq.one args...

  components[superClassName] = ComponentClass

Tao.TaoComponentBasedOn = window.TaoComponentBasedOn = TaoComponentBasedOn
Tao.Component = window.TaoComponent = TaoComponentBasedOn 'HTMLElement'
