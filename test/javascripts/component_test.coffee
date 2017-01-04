{module, test} = QUnit

module 'TaoComponent',

  before: ->
    class @TestComponent extends TaoComponent

      @tag: 'test-component'

      @attribute 'name', 'age', observe: true

      @attribute 'active', default: true

      _init: ->
        @trigger 'initialized'

      _connected: ->
        @trigger 'connected'

      _disconnected: ->
        @trigger 'disconnected'

      _nameChanged: ->
        @trigger 'nameChanged'

    TaoComponent.register @TestComponent

  beforeEach: ->
    @component = $('<test-component>').appendTo('body').get(0)

  afterEach: ->
    @component.jq.off().remove()

, ->

  test 'inherits from HTMLElement', (assert) ->
    assert.ok @component instanceof HTMLElement

  test 'has observed attributes', (assert) ->
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

  test 'has attributes with default value', (assert) ->
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

    component.one 'connected', ->
      assert.ok component.initialized
      assert.ok component.connected
      assert.equal initializeCount, 1
      assert.equal connectCount, 1
      assert.equal disconnectCount, 0

      component.one 'disconnected', ->
        assert.ok component.initialized
        assert.notOk component.connected
        assert.equal initializeCount, 1
        assert.equal connectCount, 1
        assert.equal disconnectCount, 1

        component.one 'connected', ->
          assert.ok component.initialized
          assert.ok component.connected
          assert.equal initializeCount, 1
          assert.equal connectCount, 2
          assert.equal disconnectCount, 1
          done()

        component.jq.appendTo 'body'

      component.jq.detach()

    component.jq.appendTo 'body'

  test 'jq attribute returns jquery object', (assert) ->
    assert.ok @component.jq.jquery
    assert.equal @component.jq.get(0), @component
