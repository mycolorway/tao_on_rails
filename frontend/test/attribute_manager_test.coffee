import { expect } from 'chai'
import $ from 'jquery'
import AttributeManager from '../src/attribute_manager'

describe 'Tao AttributeManager', ->

  element = null

  beforeEach ->
    element = $('''
      <div string-attr='test' number-attr='123' bool-attr hash-attr="{&quot;x&quot;: 1}" array-attr="[1,2]"></div>
    ''').appendTo('body').get(0)

  afterEach ->
    $(element).remove()
    element = null

  it 'string attribute', ->
    expect(AttributeManager.getAttribute(element, 'string-attr')).to.equal 'test'
    expect(AttributeManager.getAttribute(element, 'test-attr', {default: 'hahaha'})).to.equal 'hahaha'

    AttributeManager.setAttribute(element, 'string-attr', true)
    expect(element.getAttribute('string-attr')).to.equal 'true'

  it 'number attribute', ->
    expect(AttributeManager.getAttribute(element, 'number-attr', {type: 'number'})).to.equal 123
    expect(AttributeManager.getAttribute(element, 'test-attr', {type: 'number'})).to.be.null
    expect(AttributeManager.getAttribute(element, 'test-attr', {type: 'number', default: 321})).to.equal 321

    AttributeManager.setAttribute(element, 'number-attr', 888, {type: 'number'})
    expect(element.getAttribute('number-attr')).to.equal '888'

  it 'boolean attribute', ->
    expect(AttributeManager.getAttribute(element, 'bool-attr', {type: 'bool'})).to.be.true
    expect(AttributeManager.getAttribute(element, 'test-attr', {type: 'bool'})).to.be.false
    expect(AttributeManager.getAttribute(element, 'test-attr', {default: true, type: 'bool'})).to.be.false

    AttributeManager.setAttribute(element, 'bool-attr', false, {type: 'bool'})
    AttributeManager.setAttribute(element, 'test-attr', true, {type: 'bool'})
    expect(element.hasAttribute('bool-attr')).to.be.false
    expect(element.hasAttribute('test-attr')).to.be.true

  it 'hash attribute', ->
    expect(AttributeManager.getAttribute(element, 'hash-attr', {type: 'hash'})).to.deep.equal {x: 1}
    expect(AttributeManager.getAttribute(element, 'test-attr', {type: 'hash'})).to.be.null
    expect(AttributeManager.getAttribute(element, 'test-attr', {type: 'hash', default: {y: 1}})).to.deep.equal {y: 1}

    AttributeManager.setAttribute(element, 'hash-attr', {test: true}, {type: 'hash'})
    expect(element.getAttribute('hash-attr')).to.equal '{"test":true}'

  it 'array attribute', ->
    expect(AttributeManager.getAttribute(element, 'array-attr', {type: 'array'})).to.deep.equal [1,2]
    expect(AttributeManager.getAttribute(element, 'test-attr', {type: 'array'})).to.be.null
    expect(AttributeManager.getAttribute(element, 'test-attr', {type: 'array', default: [3,4]})).to.deep.equal [3,4]

    AttributeManager.setAttribute(element, 'array-attr', [3, 4], {type: 'array'})
    expect(element.getAttribute('array-attr')).to.equal '[3,4]'
