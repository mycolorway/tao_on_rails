
Tao.helpers =

  reflow: (el) ->
    $(el)[0].offsetHeight

  findComponent: (selectors, callback, scope = document) ->
    selectors = [selectors] unless _.isArray selectors
    components = _.flatten selectors.map (s) => $(scope).find(s).get()

    if components.length > 0 && _.isFunction callback
      Tao.helpers.componentReady components, -> callback(components...)

    if components.length > 1
      components
    else if components.length == 1
      components[0]
    else
      null

  componentReady: (components, callback) ->
    components = [components] unless _.isArray components
    promises = components.map (el) ->
      deferred = $.Deferred()
      if el.connected
        setTimeout -> deferred.resolve()
      else
        el.on 'tao:connected.taoReady', (e) ->
          return unless e.target == el
          el.off 'tao:connected.taoReady'
          deferred.resolve()
      deferred.promise()

    $.when(promises...).then -> callback()
