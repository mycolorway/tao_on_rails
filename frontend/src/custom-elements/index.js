import './native-shim';
import '@mycolorway/custom-elements';
import { domReady } from '../utils';

if (window.customElements && window.customElements.polyfillWrapFlushCallback) {
  window.customElements.polyfillWrapFlushCallback((flush) => {
    domReady().then(() => flush());
  });
}
