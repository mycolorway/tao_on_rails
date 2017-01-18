$("#<%%= dom_id(@<%= @resource %>) %>").fadeOut ->
  $(this).remove()
