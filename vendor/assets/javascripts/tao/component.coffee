#= require lodash
#= require custom-elements
#= require native-shim

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

    @observedAttributes: []

    connectedCallback: ->
      @_init()

    disconnectedCallback: ->
      @_destroy()

    attributeChangedCallback: (attrName, oldValue, newValue) ->
      @["#{_.camelCase attrName}Changed"]?(newValue, oldValue)

    _init: ->
      # to be implemented

    _destory: ->
      # to be implemented

window.TaoComponentBasedOn = TaoComponentBasedOn
window.TaoComponent = TaoComponentBasedOn 'HTMLElement'
