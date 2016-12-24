{module, test} = QUnit

module 'TaoComponent',

  before: ->
    class @TestComponent extends TaoComponent

      @tag: 'test-component'

      @property 'name', 'age', observe: true

      @property 'active', default: true

      _nameChanged: ->
        @trigger 'nameChanged'

    TaoComponent.register @TestComponent

  beforeEach: ->
    @component = $('<test-component>').appendTo('body')[0]

  afterEach: ->
    $(@component).off().remove()

, ->

  test 'inherits from HTMLElement', (assert) ->
    assert.ok @TestComponent.prototype instanceof HTMLElement

  test 'has observed properties', (assert) ->
    nameChanged = false
    @component.on 'nameChanged', ->
      nameChanged = true

    assert.equal @component.name, false
    assert.equal @component.hasAttribute('name'), false
    assert.equal nameChanged, false

    @component.name = 'farthinker'
    assert.equal @component.name, 'farthinker'
    assert.equal @component.getAttribute('name'), 'farthinker'
    assert.equal nameChanged, true

  test 'has properties with default value', (assert) ->
    assert.equal @component.active, true
    assert.equal @component.hasAttribute('active'), false

    @component.active = false
    assert.equal @component.active, false
    assert.equal @component.getAttribute('active'), 'false'
