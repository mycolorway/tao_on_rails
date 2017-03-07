#= require ./native-shim
#= require ./custom-elements
#= require jquery3
#= require_self

window.customElements?.polyfillWrapFlushCallback? (flush) ->
  $ -> flush()
