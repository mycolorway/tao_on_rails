{module, test} = QUnit

module 'TaoModule',

  before: ->
    class @ParentModule extends TaoModule
      @option 'nickname', default: 'xiao10'
      @property 'x', default: 1
      @option 'y', default: 2

      _xChanged: ->
        @trigger 'xChanged'


    class @ChildModule extends @ParentModule
      @option 'nickname', default: 'xiao1'
      @property 'x', default: 3
      @property 'z', default: 0

, ->

  test 'define options', (assert) ->
    assert.deepEqual @ParentModule._options, ['nickname', 'y']
    assert.deepEqual @ChildModule._options, ['nickname', 'y']

    child1 = new @ChildModule()
    assert.equal child1.nickname, 'xiao1'
    assert.equal child1.x, 3
    assert.equal child1.y, 2
    assert.equal child1.z, 0

    child2 = new @ChildModule
      nickname: 'xiao2'
      x: 9
      y: 8
      z: 7
    assert.equal child2.nickname, 'xiao2'
    assert.equal child2.x, 3
    assert.equal child2.y, 8
    assert.equal child2.z, 0

  test 'property inheritance', (assert) ->
    parentInstance = new @ParentModule()
    childInstance = new @ChildModule()

    assert.equal parentInstance.y, 2
    assert.equal childInstance.y, 2

  test 'property changed hook', (assert) ->
    parentInstance = new @ParentModule()

    xChangedCount = 0
    parentInstance.on 'xChanged', ->
      xChangedCount++

    assert.equal parentInstance.x, 1
    assert.equal xChangedCount, 0

    parentInstance.x = 2
    assert.equal parentInstance.x, 2
    assert.equal xChangedCount, 1

    parentInstance.x = 3
    assert.equal parentInstance.x, 3
    assert.equal xChangedCount, 2

    parentInstance.x = 3
    assert.equal parentInstance.x, 3
    assert.equal xChangedCount, 2

  test 'self-increased module id', (assert) ->
    instance1 = new @ParentModule()
    id = instance1.id

    instance2 = new @ParentModule()
    assert.equal instance2.id, id + 1

    instance3 = new @ChildModule()
    assert.equal instance3.id, id + 2

  test 'mixins', (assert) ->
    @ParentModule.include ->
      @property 'z', default: 3
      mixinVariable: 'heihei'

    instance = new @ParentModule()
    assert.equal instance.z, 3
    assert.equal instance.mixinVariable, 'heihei'
