#= require ./component

class TaoPage extends TaoComponent

  @property 'layout'

  prepareCache: ->
    $(@).find('.tao-component').each (i, el) =>
      el.prepareCache?()
      null

window.TaoPage = TaoPage
