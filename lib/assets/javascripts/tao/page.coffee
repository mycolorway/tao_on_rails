#= require ./component

class TaoPage extends TaoComponent

  @attribute 'layout'

  beforeCache: ->
    @jp.find('[tao-id]').each (i, el) =>
      el.beforeCache?()
      null

window.TaoPage = TaoPage
