#= require ./attribute_manager

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
          Tao.AttributeManager.getAttribute @, attrName, options

        @set name, (val) ->
          return if @_beforeAttributeChanged(attrName, val) == false
          Tao.AttributeManager.setAttribute @, attrName, val, options

        @observedAttributes.push(attrName) if options.observe

    @_tag: 'tao-component'

    @tag: (tag) ->
      @_tag = tag unless _.isUndefined tag
      @_tag

    @register: (componentClass) ->
      return unless componentClass.tag() && window.customElements
      customElements.define componentClass.tag(), componentClass

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
        @connected = true

        unless @initialized
          @taoId = ++count
          @_init()
          @initialized = true
          @trigger 'initialized'

        @_connected()
        @trigger 'connected'

    disconnectedCallback: ->
      $ =>
        @connected = false
        @_disconnected()
        @trigger 'disconnected'

    attributeChangedCallback: (name) ->
      return unless @connected
      @_attributeChanged name

    _created: ->
      # called when the element was created

    _init: ->
      # called when the element was connected to dom for the first time

    _connected: ->
      # called when the element was connected to dom

    _disconnected: ->
      # called when the element was disconnected from dom

    _beforeAttributeChanged: (name, val) ->
      @["_before#{_.upperFirst _.camelCase name}Changed"]?(val)

    _attributeChanged: (name) ->
      @["_#{_.camelCase name}Changed"]?()

    reflow: ->
      @offsetHeight
      @

    beforeCache: ->
      # called before turbolinks cache pages

    findComponent: (selector, readyCallback) ->
      component = @jq.find(selector).get(0)
      if component.connected
        # make sure element is returned before callback
        setTimeout -> readyCallback? component
      else
        @one 'connected', selector, ->
          readyCallback? component
      component

    on: (name, args...) ->
      name = "#{name}.#{@constructor._tag}-#{@taoId}" if name && name.indexOf('.') < 0
      @jq.on name, args...

    off: (name = '', args...) ->
      name = "#{name}.#{@constructor._tag}-#{@taoId}" if name.indexOf('.') < 0
      @jq.off name, args...

    trigger: (args...) ->
      @jq.trigger(args...)

    triggerHandler: (args...) ->
      @jq.triggerHandler(args...)

    one: (args...) ->
      @jq.one args...

  components[superClassName] = ComponentClass

Tao.TaoComponentBasedOn = window.TaoComponentBasedOn = TaoComponentBasedOn
Tao.Component = window.TaoComponent = TaoComponentBasedOn 'HTMLElement'
