#= require ./component

class TaoPage extends TaoComponent

  @attribute 'layout', default: 'default'

  beforeCache: ->

Tao.Page = window.TaoPage = TaoPage
