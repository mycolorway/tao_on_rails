#= require ./component

class TaoPage extends TaoComponent

  @attribute 'layout'

  prepareCache: ->
    $(@).find('.tao-component').each (i, el) =>
      el.prepareCache?()
      null

window.TaoPage = TaoPage
