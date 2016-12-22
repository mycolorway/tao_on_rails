#= require lodash
#= require polyfills/polyfills

components = {}

TaoComponentBasedOn = (superClass = 'HTMLElement') ->
  return components[superClass] if components[superClass]

  class components[superClass] extends window[superClass]

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
        attrName = _.kebabCase(name)
        @get name, ->
          if @hasAttribute attrName
            @getAttribute(attrName) || true
          else if options.default
            options.default
          else
            false
        @set name, (val) ->
          if val == true
            @setAttribute attrName, ''
          else if val != false
            @setAttribute attrName, val
          else
            @removeAttribute attrName
        @observedAttributes.push(attrName) if options.observe

    @tag: '' # to be set by child class

    @register: (componentClass) ->
      return unless componentClass.tag
      customElements.define componentClass.tag, componentClass

    @observedAttributes: []

    connectedCallback: ->
      @connected = true
      @classList.add 'tao-component'
      @_init()

    disconnectedCallback: ->
      @connected = false
      @_destroy()

    attributeChangedCallback: (attrName, oldValue, newValue) ->
      @["_#{_.camelCase attrName}Changed"]?(newValue, oldValue)

    on: (args...) ->
      $(@).on args...

    off: (args...) ->
      $(@).off args...

    trigger: (args...) ->
      $(@).triggerHandler(args...)

    one: (args...) ->
      $(@).one args...

    _init: ->
      # to be implemented

    _destroy: ->
      # to be implemented

    prepareCache: ->
      # called before turbolinks cache pages

window.TaoComponentBasedOn = TaoComponentBasedOn
window.TaoComponent = TaoComponentBasedOn 'HTMLElement'
