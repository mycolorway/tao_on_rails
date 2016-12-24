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

    class ChildComponent extends @TestComponent

      @tag: 'child-component'

      _initShadowRoot: ->
        super
        @shadowRoot.innerHTML = '''
          <p>showdow dom</p>
          <slot></slot>
        '''

    TaoComponent.register ChildComponent


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

  test 'has shadow root', (assert) ->
    $child = $('''
      <child-component>
        <p>content</p>
      </child-component>
    ''').appendTo 'body'

    assert.equal $child[0].shadowRoot.innerHTML, '''
      <p>showdow dom</p>
      <slot></slot>
    '''
    $child.remove()
