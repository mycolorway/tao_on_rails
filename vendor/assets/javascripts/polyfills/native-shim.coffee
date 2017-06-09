# /**
#  * @license
#  * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
#  * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
#  * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
#  * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
#  * Code distributed by Google as part of the polymer project is also
#  * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
#  */

if window.customElements
  eval '''
  (() => {
    'use strict';

    // Do nothing if `customElements` does not exist.
    if (!window.customElements) return;

    const NativeHTMLElement = window.HTMLElement;
    const nativeDefine = window.customElements.define;
    const nativeGet = window.customElements.get;

    /**
     * Map of user-provided constructors to tag names.
     *
     * @type {Map<Function, string>}
     */
    const tagnameByConstructor = new Map();

    /**
     * Map of tag names to user-provided constructors.
     *
     * @type {Map<string, Function>}
     */
    const constructorByTagname = new Map();


    /**
     * Whether the constructors are being called by a browser process, ie parsing
     * or createElement.
     */
    let browserConstruction = false;

    /**
     * Whether the constructors are being called by a user-space process, ie
     * calling an element constructor.
     */
    let userConstruction = false;

    window.HTMLElement = function() {
      if (!browserConstruction) {
        const tagname = tagnameByConstructor.get(this.constructor);
        const fakeClass = nativeGet.call(window.customElements, tagname);

        // Make sure that the fake constructor doesn't call back to this constructor
        userConstruction = true;
        const instance = new (fakeClass)();
        return instance;
      }
      // Else do nothing. This will be reached by ES5-style classes doing
      // HTMLElement.call() during initialization
      browserConstruction = false;
    };
    // By setting the patched HTMLElement's prototype property to the native
    // HTMLElement's prototype we make sure that:
    //     document.createElement('a') instanceof HTMLElement
    // works because instanceof uses HTMLElement.prototype, which is on the
    // ptototype chain of built-in elements.
    window.HTMLElement.prototype = NativeHTMLElement.prototype;

    const define = (tagname, elementClass) => {
      const elementProto = elementClass.prototype;
      const StandInElement = class extends NativeHTMLElement {
        constructor() {
          // Call the native HTMLElement constructor, this gives us the
          // under-construction instance as `this`:
          super();

          // The prototype will be wrong up because the browser used our fake
          // class, so fix it:
          Object.setPrototypeOf(this, elementProto);

          if (!userConstruction) {
            // Make sure that user-defined constructor bottom's out to a do-nothing
            // HTMLElement() call
            browserConstruction = true;
            // Call the user-defined constructor on our instance:
            elementClass.call(this);
          }
          userConstruction = false;
        }
      };
      const standInProto = StandInElement.prototype;
      StandInElement.observedAttributes = elementClass.observedAttributes;
      standInProto.connectedCallback = elementProto.connectedCallback;
      standInProto.disconnectedCallback = elementProto.disconnectedCallback;
      standInProto.attributeChangedCallback = elementProto.attributeChangedCallback;
      standInProto.adoptedCallback = elementProto.adoptedCallback;

      tagnameByConstructor.set(elementClass, tagname);
      constructorByTagname.set(tagname, elementClass);
      nativeDefine.call(window.customElements, tagname, StandInElement);
    };

    const get = (tagname) => constructorByTagname.get(tagname);

    // Workaround for Safari bug where patching customElements can be lost, likely
    // due to native wrapper garbage collection issue
    Object.defineProperty(window, 'customElements',
      {value: window.customElements, configurable: true, writable: true});
    Object.defineProperty(window.customElements, 'define',
      {value: define, configurable: true, writable: true});
    Object.defineProperty(window.customElements, 'get',
      {value: get, configurable: true, writable: true});

  })();
'''
