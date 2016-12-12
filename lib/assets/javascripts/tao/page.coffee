#= require ./component

class TaoPage extends TaoComponent

  @property 'layout'

  _init: ->
    @on 'before-cache', =>
      $(@).find('.tao-component').each (i, el) =>
        el.prepareCache()
        null

  _destroy: ->
    # to be implemented

window.TaoPage = TaoPage
