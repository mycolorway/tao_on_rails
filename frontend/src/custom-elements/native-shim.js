if (window.customElements) {
  // eslint-disable-next-line
  eval(`
  (function() {
    if (
      // No Reflect, no classes, no need for shim because native custom elements
      // require ES2015 classes or Reflect.
      window.Reflect === undefined ||
      window.customElements === undefined ||
      // The webcomponentsjs custom elements polyfill doesn't require
      // ES2015-compatible construction (\`super()\` or \`Reflect.construct\`).
      window.customElements.hasOwnProperty('polyfillWrapFlushCallback')
    ) {
      return;
    }
    const BuiltInHTMLElement = HTMLElement;
    window.HTMLElement = /** @this {!Object} */ function HTMLElement() {
      return Reflect.construct(
          BuiltInHTMLElement, [], /** @type {!Function} */ (this.constructor));
    };
    HTMLElement.prototype = BuiltInHTMLElement.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement);
  })();
  `);
}
