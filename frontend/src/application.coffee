import Module from './module'
import $ from 'jquery'

class Application extends Module

  @_initializers: {}

  @initializer: (name, callback) ->
    @_initializers[name] = callback

  @removeInitializer: (name) ->
    @_initializers[name] = null

  _init: ->
    @_initGon()
    @_initI18n()
    @_initUjs()
    @_initTurbolinks()

    callback?(@) for name, callback of @constructor._initializers

  _initGon: ->
    return unless window.gon
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
    I18n.locale = @locale if window.I18n && @locale

  _initPage: ($page) ->
    window.currentPage = @currentPage = $page[0]

  _initTurbolinks: ->
    $(document).on 'turbolinks:before-visit', (e) =>
      if @currentPage?.trigger?('before-leave') == false
        e.preventDefault()
        return

      @trigger 'before-page-visit', [e.originalEvent?.data.url]

    .on 'turbolinks:request-start', (e) =>
      @trigger 'page-request-start', [e.originalEvent?.data.xhr]

    .on 'turbolinks:visit', (e) =>
      @trigger 'page-visit', [e.originalEvent?.data.url]

    .on 'turbolinks:before-cache', (e) =>
      @trigger 'before-page-cache', [@currentPage]
      $(@currentPage).find('[tao-id]').each (i, el) ->
        el.beforeCache?()
        null
      @currentPage?.beforeCache?()
      window.currentPage = @currentPage = null

    .on 'turbolinks:request-end', (e) =>
      @trigger 'page-request-end', [e.originalEvent?.data.xhr]

    .on 'turbolinks:before-render', (e) =>
      # turbolinks render won't trigger patching of customElements polyfills
      if customElements._internals
        customElements._internals.disconnectTree document.body

      @trigger 'before-page-render', [$ e.originalEvent?.data.newBody]

    .on 'turbolinks:render', (e) =>
      # turbolinks render won't trigger patching of customElements polyfills
      if customElements._internals
        customElements._internals.connectTree document.body

      @trigger 'page-render', [$('body > .tao-page')]

    .on 'turbolinks:load', (e) =>
      $page = $ 'body > .tao-page'
      return unless $page.length > 0
      @_initGon()
      @_initPage $page
      @trigger 'page-load', [@currentPage]

export default Application
