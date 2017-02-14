#= require ./component

class TaoPage extends TaoComponent

  @attribute 'layout', default: 'default'

  beforeCache: ->
    @jp.find('[tao-id]').each (i, el) =>
      el.beforeCache?()
      null

Tao.Page = window.TaoPage = TaoPage
