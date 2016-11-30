#= require ./module

class TaoApplication extends TaoModule

  _init: ->
    @_initGon()
    @_initI18n()
    @_initUjs()
    @_bind()

  _initGon: ->
    $.extend @, window.gon
    window.gon = null

  _initUjs: ->
    $(document).on "ajax:before", 'a[data-remote]', ->
      $link = $ @
      return false if $link.hasClass('disabled')
      $link.addClass 'disabled'
    .on "ajax:complete", 'a[data-remote]', ->
      $(@).removeClass 'disabled'

  _initI18n: ->
    I18n.locale = @locale

  _initIcons: ($page) ->
    $icons = $page.siblings('#tao-icons')
    unless $icons.length > 0
      $page[0].insertAdjacentHTML('beforebegin', tao.iconsHtml || '')

  _initPage: ($page) ->
    window.currentPage = @currentPage = $page[0]

  _bind: ->
    $(document).on 'turbolinks:before-visit', (e) =>
      if @currentPage.trigger('before-leave') == false
        e.preventDefault()
        return

      @trigger 'before-page-visit', [e.originalEvent?.data.url]

    .on 'turbolinks:request-start', (e) =>
      @trigger 'page-request-start', [e.originalEvent?.data.xhr]

    .on 'turbolinks:visit', (e) =>
      @trigger 'page-visit', [e.originalEvent?.data.url]

    .on 'turbolinks:before-cache', (e) =>
      @currentPage.trigger 'before-cache'
      @trigger 'before-page-cache', [@currentPage]
      window.currentPage = @currentPage = null

    .on 'turbolinks:request-end', (e) =>
      @trigger 'page-request-end', [e.originalEvent?.data.xhr]

    .on 'turbolinks:before-render', (e) =>
      @trigger 'before-page-render', [$ e.originalEvent?.data.newBody]

    .on 'turbolinks:render', (e) =>
      @trigger 'page-render', [$('body > .page')]

    .on 'turbolinks:load', (e) =>
      $page = $ 'body > .page'
      return unless $page.length > 0
      @_initIcons $page
      @_initPage $page
      @trigger 'page-load', [@currentPage]

window.TaoApplication = TaoApplication
