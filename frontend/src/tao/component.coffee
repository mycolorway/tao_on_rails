import AttributeManager from './attribute_manager'
import $ from 'jquery'
import _ from 'lodash'

components = {}

ComponentBasedOn = (superClassName = 'HTMLElement') ->
  return components[superClassName] if components[superClassName]

  class ComponentClass extends window[superClassName]

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
          AttributeManager.getAttribute @, attrName, options

        @set name, (val) ->
          return if @_beforeAttributeChanged(attrName, val) == false
          AttributeManager.setAttribute @, attrName, val, options

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
      super arguments...
      @_created()

    connectedCallback: ->
      $ =>
        @connected = true

        unless @initialized
          @taoId = ++count
          @_init()
          @initialized = true
          @namespacedTrigger 'initialized'

        @_connected()
        @namespacedTrigger 'connected'

    disconnectedCallback: ->
      $ =>
        @connected = false
        @_disconnected()
        @namespacedTrigger 'disconnected'

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
      Tao.helpers.reflow @
      @

    beforeCache: ->
      # called before turbolinks cache pages

    findComponent: (selectors...) ->
      callback = selectors.pop() if _.isFunction(_.last(selectors))
      Tao.helpers.findComponent selectors, callback, @

    on: (name, args...) ->
      if name && name.indexOf('.') < 0
        name = "#{name}.#{@constructor._tag}-#{@taoId}"
      @jq.on name, args...

    off: (name = '', args...) ->
      if name.indexOf('.') < 0
        name = "#{name}.#{@constructor._tag}-#{@taoId}"
      @jq.off name, args...

    trigger: (args...) ->
      @jq.trigger(args...)

    triggerHandler: (args...) ->
      @jq.triggerHandler(args...)

    namespacedTrigger: (name, params) ->
      @trigger "tao:#{name}", params
      @trigger "#{@constructor._tag}:#{name}", params

    one: (args...) ->
      @jq.one args...

  components[superClassName] = ComponentClass

export default ComponentBasedOn('HTMLElement')
export { ComponentBasedOn }
