{module, test} = QUnit

module 'TaoComponent',

  before: ->
    class @TestComponent extends TaoComponent

      @tag: 'test-component'

      @property 'name', 'age', observe: true

      @property 'active', default: true

      _init: ->
        @trigger 'initialized'

      _connect: ->
        @trigger 'connected'

      _disconnect: ->
        @trigger 'disconnected'

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
    nameChangedCount = 0
    @component.on 'nameChanged', ->
      nameChangedCount++

    assert.equal @component.name, false
    assert.equal @component.hasAttribute('name'), false
    assert.equal nameChangedCount, 0

    @component.name = 'farthinker'
    assert.equal @component.name, 'farthinker'
    assert.equal @component.getAttribute('name'), 'farthinker'
    assert.equal nameChangedCount, 1

  test 'has properties with default value', (assert) ->
    assert.equal @component.active, true
    assert.equal @component.hasAttribute('active'), false

    @component.active = false
    assert.equal @component.active, false
    assert.equal @component.getAttribute('active'), 'false'

  test 'call _init and _connect method when connected to DOM', (assert) ->
    done = assert.async()
    component = document.createElement('test-component')
    assert.notOk component.initialized
    assert.notOk component.connected

    initializeCount = 0
    connectCount = 0
    disconnectCount = 0
    component.on 'initialized', ->
      initializeCount++
    .on 'connected', ->
      connectCount++
    .on 'disconnected', ->
      disconnectCount++

    $(component).appendTo 'body'
    setTimeout ->
      assert.ok component.initialized
      assert.ok component.connected
      assert.equal initializeCount, 1
      assert.equal connectCount, 1
      assert.equal disconnectCount, 0

      $(component).detach()
      setTimeout ->
        assert.ok component.initialized
        assert.notOk component.connected
        assert.equal initializeCount, 1
        assert.equal connectCount, 1
        assert.equal disconnectCount, 1

        $(component).appendTo 'body'
        setTimeout ->
          assert.ok component.initialized
          assert.ok component.connected
          assert.equal initializeCount, 1
          assert.equal connectCount, 2
          assert.equal disconnectCount, 1
          done()
