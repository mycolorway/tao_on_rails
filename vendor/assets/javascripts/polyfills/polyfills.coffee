#= require ./native-shim
#= require ./custom-elements
#= require jquery3
#= require_self

customElements.polyfillWrapFlushCallback? (flush) ->
  $(document).on 'turbolinks:load', (e) ->
    flush()
