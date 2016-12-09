
window.tao.helpers =

  reflow: (el) ->
    $(el)[0].offsetHeight

  icon: (name, attributes={}) ->
    $("<svg><use xlink:href=\"#icon-#{name}\"/></svg>")
      .attr attributes
      .addClass "icon icon-#{name}"
