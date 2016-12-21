{module, test} = QUnit

module 'TaoComponent',

  before: ->
    class @TestComponent extends TaoComponent
      tag: 'test-component'

    TaoComponent.register @TestComponent

, ->

  test 'Tao Component inherits from HTMLElement', (assert) ->
    assert.ok @TestComponent.prototype instanceof HTMLElement
