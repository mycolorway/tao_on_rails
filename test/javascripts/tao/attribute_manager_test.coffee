{module, test} = QUnit


module 'Tao Attribute Manager',

  beforeEach: ->
    @element = $('''
      <div string-attr='test' number-attr='123' bool-attr hash-attr="{&quot;x&quot;: 1}" array-attr="[1,2]"></div>
    ''').appendTo('body').get(0)

  afterEach: ->
    $(@element).remove()
    @element = null

, ->

  test 'string attribute', (assert) ->
    assert.equal Tao.AttributeManager.getAttribute(@element, 'string-attr'), 'test'
    assert.equal Tao.AttributeManager.getAttribute(@element, 'test-attr', {default: 'hahaha'}), 'hahaha'

    Tao.AttributeManager.setAttribute(@element, 'string-attr', true)
    assert.equal @element.getAttribute('string-attr'), 'true'

  test 'number attribute', (assert) ->
    assert.equal Tao.AttributeManager.getAttribute(@element, 'number-attr', {type: 'number'}), 123
    assert.equal Tao.AttributeManager.getAttribute(@element, 'test-attr', {type: 'number'}), null
    assert.equal Tao.AttributeManager.getAttribute(@element, 'test-attr', {type: 'number', default: 321}), 321

    Tao.AttributeManager.setAttribute(@element, 'number-attr', 888, {type: 'number'})
    assert.equal @element.getAttribute('number-attr'), '888'

  test 'boolean attribute', (assert) ->
    assert.equal Tao.AttributeManager.getAttribute(@element, 'bool-attr', {type: 'bool'}), true
    assert.equal Tao.AttributeManager.getAttribute(@element, 'test-attr', {type: 'bool'}), false
    assert.equal Tao.AttributeManager.getAttribute(@element, 'test-attr', {default: true, type: 'bool'}), false

    Tao.AttributeManager.setAttribute(@element, 'bool-attr', false, {type: 'bool'})
    Tao.AttributeManager.setAttribute(@element, 'test-attr', true, {type: 'bool'})
    assert.equal @element.hasAttribute('bool-attr'), false
    assert.equal @element.hasAttribute('test-attr'), true

  test 'hash attribute', (assert) ->
    assert.deepEqual Tao.AttributeManager.getAttribute(@element, 'hash-attr', {type: 'hash'}), {x: 1}
    assert.deepEqual Tao.AttributeManager.getAttribute(@element, 'test-attr', {type: 'hash'}), null
    assert.deepEqual Tao.AttributeManager.getAttribute(@element, 'test-attr', {type: 'hash', default: {y: 1}}), {y: 1}

    Tao.AttributeManager.setAttribute(@element, 'hash-attr', {test: true}, {type: 'hash'})
    assert.equal @element.getAttribute('hash-attr'), '{"test":true}'

  test 'array attribute', (assert) ->
    assert.deepEqual Tao.AttributeManager.getAttribute(@element, 'array-attr', {type: 'array'}), [1,2]
    assert.deepEqual Tao.AttributeManager.getAttribute(@element, 'test-attr', {type: 'array'}), null
    assert.deepEqual Tao.AttributeManager.getAttribute(@element, 'test-attr', {type: 'array', default: [3,4]}), [3,4]

    Tao.AttributeManager.setAttribute(@element, 'array-attr', [3, 4], {type: 'array'})
    assert.equal @element.getAttribute('array-attr'), '[3,4]'
