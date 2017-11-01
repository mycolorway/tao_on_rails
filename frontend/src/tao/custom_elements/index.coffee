import './native_shim'
import '@webcomponents/custom-elements'

window.customElements?.polyfillWrapFlushCallback? (flush) ->
  $ -> flush()
