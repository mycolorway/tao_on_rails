#= require ./component

class TaoPage extends TaoComponent

  @attribute 'layout', default: 'default'

  beforeCache: ->
    @jq.find('[tao-id]').each (i, el) =>
      el.beforeCache?()
      null

Tao.Page = window.TaoPage = TaoPage
