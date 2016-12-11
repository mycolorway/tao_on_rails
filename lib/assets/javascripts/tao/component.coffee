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

    @property: (name, observed) ->
      attrName = _.kebabCase(name)
      @get name, -> @getAttribute attrName
      @set name, (val) ->
        if val == true
          @setAttribute attrName, ''
        else if val == false
          @setAttribute attrName, val
        else
          @removeAttribute attrName
      @observedAttributes.push(attrName) if observed

    @tag: '' # to be set by child class

    @register: (componentClass) ->
      return unless componentClass.tag
      customElements.define componentClass.tag, componentClass

    @observedAttributes: []

    connectedCallback: ->
      @connected = true
      @_init()

    disconnectedCallback: ->
      @connected = false
      @_destroy()

    attributeChangedCallback: (attrName, oldValue, newValue) ->
      @["#{_.camelCase attrName}Changed"]?(newValue, oldValue)

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

    _destory: ->
      # to be implemented

window.TaoComponentBasedOn = TaoComponentBasedOn
window.TaoComponent = TaoComponentBasedOn 'HTMLElement'
