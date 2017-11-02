import TaoComponent from '../../src/tao/component'
import $ from 'jquery'
import { expect } from 'chai'

describe 'TaoComponent', ->

  TestComponent = null
  component = null

  before ->
    class TestComponent extends TaoComponent

      @include ->
        @attribute 'fromMixin', default: 'yes'
        mixinVariable: 'heihei'

      @tag 'test-component'

      @attribute 'name', 'age', observe: true

      @attribute 'active', type: 'bool'

      @attribute 'json', type: 'object', default: {x: 1}

      @attribute 'array', type: 'array'

      _nameChanged: ->
        @trigger 'nameChanged'

    TaoComponent.register TestComponent

  beforeEach (done) ->
    component = $('<test-component array="[1,2]" />').appendTo('body').get(0)
    setTimeout -> done()

  afterEach ->
    component.jq.off().remove()
    component = null

  it 'inherits from HTMLElement', ->
    expect(component instanceof HTMLElement).to.be.ok

  it 'has observed attributes', ->
    nameChangedCount = 0
    component.on 'nameChanged', ->
      nameChangedCount += 1

    expect(component.name).to.be.not.ok
    expect(component.hasAttribute('name')).to.be.false
    expect(nameChangedCount).to.equal 0

    component.name = 'farthinker'
    expect(component.name).to.equal 'farthinker'
    expect(component.getAttribute('name')).to.equal 'farthinker'
    expect(nameChangedCount).to.equal 1

  it 'has attributes with default value', ->
    expect(component.active).to.be.false
    expect(component.hasAttribute('active')).to.be.false
    expect(component.json).to.deep.equal {x: 1}
    expect(component.array).to.deep.equal [1, 2]

    component.active = false
    expect(component.active).to.be.false
    expect(component.hasAttribute('active')).to.be.false

    component.json = {test: 1}
    expect(component.json).to.deep.equal {test: 1}
    expect(component.getAttribute('json')).to.equal '{\"test\":1}'

    component.array = [1, 2, 3]
    expect(component.array).to.deep.equal [1, 2, 3]
    expect(component.getAttribute('array')).to.equal '[1,2,3]'

  it 'call _init and _connect method when connected to DOM', (done) ->
    component = document.createElement('test-component')
    expect(component.initialized).to.not.be.ok
    expect(component.connected).to.not.be.ok

    initializeCount = 0
    connectCount = 0
    disconnectCount = 0
    component.on 'tao:initialized', ->
      initializeCount += 1
    .on 'test-component:connected', ->
      expect(component.connected).to.be.true
      connectCount += 1
    .on 'test-component:disconnected', ->
      expect(component.connected).to.be.false
      disconnectCount += 1

    component.one 'test-component:connected', ->
      expect(component.initialized).to.be.ok
      expect(component.connected).to.be.ok
      expect(initializeCount).to.equal 1
      expect(connectCount).to.equal 1
      expect(disconnectCount).to.equal 0

      component.one 'test-component:disconnected', ->
        expect(component.initialized).to.be.ok
        expect(component.connected).to.not.be.ok
        expect(initializeCount).to.equal 1
        expect(connectCount).to.equal 1
        expect(disconnectCount).to.equal 1

        component.one 'test-component:connected', ->
          expect(component.initialized).to.be.ok
          expect(component.connected).to.be.ok
          expect(initializeCount).to.equal 1
          expect(connectCount).to.equal 2
          expect(disconnectCount).to.equal 1
          done()

        component.jq.appendTo 'body'

      component.jq.detach()

    component.jq.appendTo 'body'

  it 'has a jq attribute returns jquery object', ->
    expect(component.jq.jquery).to.be.ok
    expect(component.jq.get(0)).to.equal component

  it 'supports mixins', ->
    expect(component.fromMixin).to.equal 'yes'
    expect(component.mixinVariable).to.equal 'heihei'
