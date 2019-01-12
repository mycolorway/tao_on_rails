import '@mycolorway/custom-elements';
import '@mycolorway/custom-elements/src/native-shim';
import { domReady } from './utils';

if (window.customElements && window.customElements.polyfillWrapFlushCallback) {
  window.customElements.polyfillWrapFlushCallback((flush) => {
    domReady().then(() => flush());
  });
}
