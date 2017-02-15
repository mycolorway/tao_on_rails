{module, test} = QUnit

module 'TaoModule',

  before: ->
    @Parser = TaoAttributeParser

, ->

  test 'parse string', (assert) ->
    assert.equal @Parser.parse('123'), '123'
    assert.equal @Parser.parse('', {type: 'string', default: '321'}), '321'

  test 'parse bool', (assert) ->
    assert.equal @Parser.parse('true', {type: 'bool'}), true
    assert.equal @Parser.parse('false', {type: 'bool'}), false
    assert.equal @Parser.parse('', {type: 'bool'}), false
    assert.equal @Parser.parse(null, {type: 'bool', default: true}), true

  test 'parse hash', (assert) ->
    assert.equal _.isEqual(@Parser.parse('{"x": 1}', {type: 'hash'}), {x: 1}), true
    assert.equal _.isEqual(@Parser.parse('', {type: 'hash'}), {}), true
    assert.equal _.isEqual(@Parser.parse('', {type: 'hash', default: {y: 1}}), {y: 1}), true

  test 'parse array', (assert) ->
    assert.equal _.isEqual(@Parser.parse('[1,2]', {type: 'array'}), [1,2]), true
    assert.equal _.isEqual(@Parser.parse('', {type: 'array'}), []), true
    assert.equal _.isEqual(@Parser.parse('', {type: 'array', default: [3,4]}), [3,4]), true

  test 'stringify string', (assert) ->
    assert.equal @Parser.stringify('123'), '123'
    assert.equal @Parser.stringify(true), 'true'

  test 'stringify bool', (assert) ->
    assert.equal @Parser.stringify(true, {type: 'bool'}), 'true'
    assert.equal @Parser.stringify(false, {type: 'bool'}), 'false'
    assert.equal @Parser.stringify('', {type: 'bool', default: true}), 'true'

  test 'stringify hash', (assert) ->
    assert.equal @Parser.stringify({x: 1}, {type: 'hash'}), '{"x":1}'
    assert.equal @Parser.stringify('', {type: 'hash'}), '{}'
    assert.equal @Parser.stringify('', {type: 'hash', default: {y:1}}), '{"y":1}'

  test 'stringify array', (assert) ->
    assert.equal @Parser.stringify([1,2], {type: 'array'}), '[1,2]'
    assert.equal @Parser.stringify('', {type: 'array'}), '[]'
    assert.equal @Parser.stringify('', {type: 'array', default: [3,4]}), '[3,4]'
