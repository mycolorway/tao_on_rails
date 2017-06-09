class <%= name.camelize %> extends TaoComponent

  @tag '<%= name.dasherize %>'

  _init: ->
    # called when the page connected to dom for the first time

  _connected: ->
    # called every time the page connected to dom

  _disconnected: ->
    # called every time the page disconnected from dom

TaoComponent.register <%= name.camelize %>
