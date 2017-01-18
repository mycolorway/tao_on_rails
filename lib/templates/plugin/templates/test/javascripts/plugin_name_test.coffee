{module, test} = QUnit

module '<%= name.camelize %>',

  beforeEach: (assert) ->
    done = assert.async()

    @<%= name.camelize(:lower) %> = $('''
      <<%= name.dasherize %>/>
    ''').appendTo('body').get(0)

    setTimeout -> done()

  afterEach: ->
    @<%= name.camelize(:lower) %>.jq.remove()
    @<%= name.camelize(:lower) %> = null

, ->

  test 'inherits from TaoComponent', (assert) ->
    assert.ok @<%= name.camelize(:lower) %> instanceof TaoComponent
