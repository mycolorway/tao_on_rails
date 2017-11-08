import TaoModule from '../javascripts/module'
import { expect } from 'chai'

describe 'TaoModule', ->

  ParentModule = null
  ChildModule = null

  before ->
    class ParentModule extends TaoModule
      @option 'nickname', default: 'xiao10'
      @property 'x', default: 1
      @option 'y', default: 2

      _xChanged: ->
        @trigger 'xChanged'


    class ChildModule extends ParentModule
      @option 'nickname', default: 'xiao1'
      @property 'x', default: 3
      @property 'z', default: 0

  it 'define options', ->
    expect(ParentModule._options).to.deep.equal ['nickname', 'y']
    expect(ChildModule._options).to.deep.equal ['nickname', 'y']

    child1 = new ChildModule()
    expect(child1.nickname).to.equal 'xiao1'
    expect(child1.x).to.equal 3
    expect(child1.y).to.equal 2
    expect(child1.z).to.equal 0

    child2 = new ChildModule
      nickname: 'xiao2'
      x: 9
      y: 8
      z: 7
    expect(child2.nickname).to.equal 'xiao2'
    expect(child2.x).to.equal 3
    expect(child2.y).to.equal 8
    expect(child2.z).to.equal 0

  it 'property inheritance', ->
    parentInstance = new ParentModule()
    childInstance = new ChildModule()

    expect(parentInstance.y).to.equal 2
    expect(childInstance.y).to.equal 2

  it 'property changed hook', ->
    parentInstance = new ParentModule()

    xChangedCount = 0
    parentInstance.on 'xChanged', ->
      xChangedCount++

    expect(parentInstance.x).to.equal 1
    expect(xChangedCount).to.equal 0

    parentInstance.x = 2
    expect(parentInstance.x).to.equal 2
    expect(xChangedCount).to.equal 1

    parentInstance.x = 3
    expect(parentInstance.x).to.equal 3
    expect(xChangedCount).to.equal 2

    parentInstance.x = 3
    expect(parentInstance.x).to.equal 3
    expect(xChangedCount).to.equal 2

  it 'self-increased module id', ->
    instance1 = new ParentModule()
    id = instance1.id

    instance2 = new ParentModule()
    expect(instance2.id).to.equal id + 1

    instance3 = new ChildModule()
    expect(instance3.id).to.equal id + 2

  it 'mixins', ->
    ParentModule.include ->
      @property 'z', default: 3
      mixinVariable: 'heihei'

    instance = new ParentModule()
    expect(instance.z).to.equal 3
    expect(instance.mixinVariable).to.equal 'heihei'
