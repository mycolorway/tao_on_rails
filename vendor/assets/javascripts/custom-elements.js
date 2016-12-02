//= require native-shim

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//= require native-shim

/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/**
 * 2.3
 * http://w3c.github.io/webcomponents/spec/custom/#dfn-element-definition
 * @typedef {{
 *  name: string,
 *  localName: string,
 *  constructor: function(new:HTMLElement),
 *  connectedCallback: (Function|undefined),
 *  disconnectedCallback: (Function|undefined),
 *  attributeChangedCallback: (Function|undefined),
 *  observedAttributes: Array<string>,
 * }}
 */
var CustomElementDefinition = void 0;

/**
 * @typedef {{
 *  resolve: !function(undefined),
 *  promise: !Promise<undefined>,
 * }}
 */
var Deferred = void 0;

(function () {
  'use strict';

  var doc = document;
  var win = window;

  /**
   * Gets 'customElement' from window so that it could be modified after
   * the polyfill loads.
   * @function
   * @return {CustomElementRegistry}
   */
  var _customElements = function _customElements() {
    return win['customElements'];
  };

  var _observerProp = '__$CE_observer';
  var _attachedProp = '__$CE_attached';
  var _upgradedProp = '__$CE_upgraded';

  if (_customElements()) {
    _customElements().flush = function () {};
    if (!_customElements().forcePolyfill) {
      nativeShim();
      return;
    }
  }

  // name validation
  // https://html.spec.whatwg.org/multipage/scripting.html#valid-custom-element-name

  /**
   * @const
   * @type {Array<string>}
   */
  var reservedTagList = ['annotation-xml', 'color-profile', 'font-face', 'font-face-src', 'font-face-uri', 'font-face-format', 'font-face-name', 'missing-glyph'];

  /**
   * @param {!string} name
   * @return {!Error|undefined}
   */
  function checkValidCustomElementName(name) {
    if (!(/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(name) && reservedTagList.indexOf(name) === -1)) {
      return new Error('The element name \'' + name + '\' is not valid.');
    }
  }

  /**
   * @param {!Node} root
   * @return {TreeWalker}
   */
  function createTreeWalker(root) {
    // IE 11 requires the third and fourth arguments be present. If the third
    // arg is null, it applies the default behaviour. However IE also requires
    // the fourth argument be present even though the other browsers ignore it.
    return doc.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, null, false);
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isElement(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  }

  /**
   * @param {!Element} element
   * @return {boolean}
   */
  function isHtmlImport(element) {
    return element.tagName === 'LINK' && element.rel && element.rel.toLowerCase().split(' ').indexOf('import') !== -1;
  }

  /**
   * @param {!Element} element
   * @return {boolean}
   */
  function isConnected(element) {
    var n = element;
    do {
      if (n[_attachedProp] || n.nodeType === Node.DOCUMENT_NODE) return true;
      n = n.parentNode || n.nodeType === Node.DOCUMENT_FRAGMENT_NODE && n.host;
    } while (n);
    return false;
  }

  /**
   * A registry of custom element definitions.
   *
   * See https://html.spec.whatwg.org/multipage/scripting.html#customelementsregistry
   *
   * @property {boolean} enableFlush Set to true to enable the flush() method
   *   to work. This should only be done for tests, as it causes a memory leak.
   */

  var CustomElementRegistry = function () {
    function CustomElementRegistry() {
      _classCallCheck(this, CustomElementRegistry);

      /** @private {!Map<string, !CustomElementDefinition>} **/
      this._definitions = new Map();

      /** @private {!Map<Function, string>} **/
      this._constructors = new Map();

      /** @private {!Map<string, !Deferred>} **/
      this._whenDefinedMap = new Map();

      /** @private {!Set<!MutationObserver>} **/
      this._observers = new Set();

      /** @private {!MutationObserver} **/
      this._attributeObserver = new MutationObserver(
      /** @type {function(Array<MutationRecord>, MutationObserver)} */
      this._handleAttributeChange.bind(this));

      /** @private {?HTMLElement} **/
      this._newInstance = null;

      /** @private {!Set<string>} **/
      this._pendingHtmlImportUrls = new Set();

      /** @type {boolean} **/
      this.enableFlush = true;

      /** @private {boolean} **/
      this._upgradeScheduled = false;

      /** @type {MutationObserver} **/
      this._mainDocumentObserver = null;
    }

    // HTML spec part 4.13.4
    // https://html.spec.whatwg.org/multipage/scripting.html#dom-customelementsregistry-define
    /**
     * @param {string} name
     * @param {function(new:HTMLElement)} constructor
     * @param {{extends: string}} options
     * @return {undefined}
     */


    _createClass(CustomElementRegistry, [{
      key: 'define',
      value: function define(name, constructor, options) {
        // 1:
        if (typeof constructor !== 'function') {
          throw new TypeError('constructor must be a Constructor');
        }

        // 2. If constructor is an interface object whose corresponding interface
        //    either is HTMLElement or has HTMLElement in its set of inherited
        //    interfaces, throw a TypeError and abort these steps.
        //
        // It doesn't appear possible to check this condition from script

        // 3:
        var nameError = checkValidCustomElementName(name);
        if (nameError) throw nameError;

        // 4, 5:
        // Note: we don't track being-defined names and constructors because
        // define() isn't normally reentrant. The only time user code can run
        // during define() is when getting callbacks off the prototype, which
        // would be highly-unusual. We can make define() reentrant-safe if needed.
        if (this._definitions.has(name)) {
          throw new Error('An element with name \'' + name + '\' is already defined');
        }

        // 6, 7:
        if (this._constructors.has(constructor)) {
          throw new Error('Definition failed for \'' + name + '\': ' + 'The constructor is already used.');
        }

        // 8:
        /** @type {string} */
        var localName = name;

        // 9, 10: We do not support extends currently.

        // 11, 12, 13: Our define() isn't rentrant-safe

        // 14.1:
        /** @type {Object} */
        var prototype = constructor.prototype;

        // 14.2:
        if ((typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)) !== 'object') {
          throw new TypeError('Definition failed for \'' + name + '\': ' + 'constructor.prototype must be an object');
        }

        /**
         * @param {string} callbackName
         * @return {Function|undefined}
         */
        function getCallback(callbackName) {
          var callback = prototype[callbackName];
          if (callback !== undefined && typeof callback !== 'function') {
            throw new Error(localName + ' \'' + callbackName + '\' is not a Function');
          }
          return callback;
        }

        // 3, 4:
        var connectedCallback = getCallback('connectedCallback');

        // 5, 6:
        var disconnectedCallback = getCallback('disconnectedCallback');

        // Divergence from spec: we always throw if attributeChangedCallback is
        // not a function.

        // 7, 9.1:
        var attributeChangedCallback = getCallback('attributeChangedCallback');

        // 8, 9.2, 9.3:
        var observedAttributes = attributeChangedCallback && constructor['observedAttributes'] || [];

        // 15:
        /** @type {CustomElementDefinition} */
        var definition = {
          name: name,
          localName: localName,
          constructor: constructor,
          connectedCallback: connectedCallback,
          disconnectedCallback: disconnectedCallback,
          attributeChangedCallback: attributeChangedCallback,
          observedAttributes: observedAttributes
        };

        // 16:
        this._definitions.set(localName, definition);
        this._constructors.set(constructor, localName);

        // 17, 18, 19:
        this._upgradeDoc();

        // 20:
        /** @type {Deferred} **/
        var deferred = this._whenDefinedMap.get(localName);
        if (deferred) {
          deferred.resolve(undefined);
          this._whenDefinedMap.delete(localName);
        }
      }

      /**
       * Returns the constructor defined for `name`, or `null`.
       *
       * @param {string} name
       * @return {Function|undefined}
       */

    }, {
      key: 'get',
      value: function get(name) {
        // https://html.spec.whatwg.org/multipage/scripting.html#custom-elements-api
        var def = this._definitions.get(name);
        return def ? def.constructor : undefined;
      }

      /**
       * Returns a `Promise` that resolves when a custom element for `name` has
       * been defined.
       *
       * @param {string} name
       * @return {!Promise}
       */

    }, {
      key: 'whenDefined',
      value: function whenDefined(name) {
        // https://html.spec.whatwg.org/multipage/scripting.html#dom-customelementsregistry-whendefined
        var nameError = checkValidCustomElementName(name);
        if (nameError) return Promise.reject(nameError);
        if (this._definitions.has(name)) return Promise.resolve();

        /** @type {Deferred} **/
        var deferred = this._whenDefinedMap.get(name);
        if (deferred) return deferred.promise;

        var resolve = void 0;
        var promise = new Promise(function (_resolve, _) {
          resolve = _resolve;
        });
        deferred = { promise: promise, resolve: resolve };
        this._whenDefinedMap.set(name, deferred);
        return promise;
      }

      /**
       * Causes all pending mutation records to be processed, and thus all
       * customization, upgrades and custom element reactions to be called.
       * `enableFlush` must be true for this to work. Only use during tests!
       */

    }, {
      key: 'flush',
      value: function flush() {
        if (this.enableFlush) {
          // console.warn("flush!!!");
          this._handleMutations(this._mainDocumentObserver.takeRecords());
          this._handleAttributeChange(this._attributeObserver.takeRecords());
          this._observers.forEach(
          /**
           * @param {!MutationObserver} observer
           * @this {CustomElementRegistry}
           */
          function (observer) {
            this._handleMutations(observer.takeRecords());
          }, this);
        }
      }

      /**
       * Upgrade all existing in document elements. This process is expensive so
       * is optionally batched based on the state of HTMLImports. (Note,
       * this batching might not be necessary if instead of walking the dom,
       * a map of upgrade candidates was maintained.)
       * @private
       */

    }, {
      key: '_upgradeDoc',
      value: function _upgradeDoc() {
        var _this2 = this;

        if (!this._upgradeScheduled) {
          this._upgradeScheduled = true;
          var onReady = function onReady() {
            _this2._upgradeScheduled = false;
            if (!_this2._mainDocumentObserver) {
              _this2._mainDocumentObserver = _this2._observeRoot(doc);
            }
            _this2._addNodes(doc.childNodes);
          };
          if (window['HTMLImports']) {
            window['HTMLImports']['whenReady'](onReady);
          } else {
            onReady();
          }
        }
      }

      /**
       * @param {?HTMLElement} instance
       * @private
       */

    }, {
      key: '_setNewInstance',
      value: function _setNewInstance(instance) {
        this._newInstance = instance;
      }

      /**
       * Observes a DOM root for mutations that trigger upgrades and reactions.
       * @param {Node} root
       * @private
       */

    }, {
      key: '_observeRoot',
      value: function _observeRoot(root) {
        // console.log('_observeRoot', root, root.baseURI);
        // console.assert(!root[_observerProp]);
        if (root[_observerProp] != null) {
          //console.warn(`Root ${root} is already observed`);
          return root[_observerProp];
        }
        root[_observerProp] = new MutationObserver(
        /** @type {function(Array<MutationRecord>, MutationObserver)} */
        this._handleMutations.bind(this));
        root[_observerProp].observe(root, { childList: true, subtree: true });
        if (this.enableFlush) {
          // this is memory leak, only use in tests
          this._observers.add(root[_observerProp]);
        }
        return root[_observerProp];
      }

      /**
       * @param {Node} root
       * @private
       */

    }, {
      key: '_unobserveRoot',
      value: function _unobserveRoot(root) {
        if (root[_observerProp] != null) {
          root[_observerProp].disconnect();
          if (this.enableFlush) {
            this._observers.delete(root[_observerProp]);
          }
          root[_observerProp] = null;
        }
      }

      /**
       * @param {!Array<!MutationRecord>} mutations
       * @private
       */

    }, {
      key: '_handleMutations',
      value: function _handleMutations(mutations) {
        for (var i = 0; i < mutations.length; i++) {
          /** @type {!MutationRecord} */
          var mutation = mutations[i];
          if (mutation.type === 'childList') {
            // Note: we can't get an ordering between additions and removals, and
            // so might diverge from spec reaction ordering
            var addedNodes = /** @type {!NodeList<!Node>} */mutation.addedNodes;
            var removedNodes = /** @type {!NodeList<!Node>} */mutation.removedNodes;
            this._removeNodes(removedNodes);
            this._addNodes(addedNodes);
          }
        }
      }

      /**
       * @param {!(NodeList<!Node>|Array<!Node>)} nodeList
       * @param {?Set<Node>=} visitedNodes
       * @private
       */

    }, {
      key: '_addNodes',
      value: function _addNodes(nodeList, visitedNodes) {
        visitedNodes = visitedNodes || new Set();

        for (var i = 0; i < nodeList.length; i++) {
          var root = nodeList[i];

          if (!isElement(root)) {
            continue;
          }

          // Since we're adding this node to an observed tree, we can unobserve
          this._unobserveRoot(root);

          var walker = createTreeWalker(root);
          do {
            var node = /** @type {!HTMLElement} */walker.currentNode;
            this._addElement(node, visitedNodes);
          } while (walker.nextNode());
        }
      }

      /**
       * @param {!HTMLElement} element
       * @param {!Set<Node>=} visitedNodes
       */

    }, {
      key: '_addElement',
      value: function _addElement(element, visitedNodes) {
        if (visitedNodes.has(element)) return;
        visitedNodes.add(element);

        /** @type {?CustomElementDefinition} */
        var definition = this._definitions.get(element.localName);
        if (definition) {
          if (!element[_upgradedProp]) {
            this._upgradeElement(element, definition, true);
          }
          if (element[_upgradedProp] && !element[_attachedProp] && isConnected(element)) {
            element[_attachedProp] = true;
            if (definition.connectedCallback) {
              definition.connectedCallback.call(element);
            }
          }
        }
        if (element.shadowRoot) {
          // TODO(justinfagnani): do we need to check that the shadowRoot
          // is observed?
          this._addNodes(element.shadowRoot.childNodes, visitedNodes);
        }
        if (isHtmlImport(element)) {
          this._addImport( /** @type {!HTMLLinkElement} */element, visitedNodes);
        }
      }

      /**
       * @param {!HTMLLinkElement} link
       * @param {!Set<Node>=} visitedNodes
       */

    }, {
      key: '_addImport',
      value: function _addImport(link, visitedNodes) {
        var _this3 = this;

        // During a tree walk to add or upgrade nodes, we may encounter multiple
        // HTML imports that reference the same document, and may encounter
        // imports in various states of loading.

        // First, we only want to process the first import for a document in a
        // walk, so we check visitedNodes for the document, not the link.
        //
        // Second, for documents that haven't loaded yet, we only want to add one
        // listener, regardless of the number of links or walks, so we track
        // pending loads in _pendingHtmlImportUrls.

        // Check to see if the import is loaded
        /** @type {?Document} */
        var _import = link.import;
        if (_import) {
          // The import is loaded, but only process the first link element
          if (visitedNodes.has(_import)) return;
          visitedNodes.add(_import);

          // The import is loaded observe it
          if (!_import[_observerProp]) this._observeRoot(_import);

          // walk the document
          this._addNodes(_import.childNodes, visitedNodes);
        } else {
          var _ret = function () {
            // The import is not loaded, so wait for it
            /** @type {string} */
            var importUrl = link.href;
            if (_this3._pendingHtmlImportUrls.has(importUrl)) return {
                v: void 0
              };
            _this3._pendingHtmlImportUrls.add(importUrl);

            /**
             * @const
             * @type {CustomElementRegistry}
             */
            var _this = _this3;
            var onLoad = function onLoad() {
              link.removeEventListener('load', /** @type {function(Event)} */onLoad);
              if (!link.import[_observerProp]) _this._observeRoot(link.import);
              // We don't pass visitedNodes because this is async and not part of
              // the current tree walk.
              _this._addNodes(link.import.childNodes);
            };
            link.addEventListener('load', onLoad);
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
      }

      /**
       * @param {NodeList} nodeList
       * @private
       */

    }, {
      key: '_removeNodes',
      value: function _removeNodes(nodeList) {
        for (var i = 0; i < nodeList.length; i++) {
          var root = nodeList[i];

          if (!isElement(root)) {
            continue;
          }

          // Since we're detatching this element from an observed root, we need to
          // reobserve it.
          // TODO(justinfagnani): can we do this in a microtask so we don't thrash
          // on creating and destroying MutationObservers on batch DOM mutations?
          this._observeRoot(root);

          var walker = createTreeWalker(root);
          do {
            var node = walker.currentNode;
            if (node[_upgradedProp] && node[_attachedProp]) {
              node[_attachedProp] = false;
              var definition = this._definitions.get(node.localName);
              if (definition && definition.disconnectedCallback) {
                definition.disconnectedCallback.call(node);
              }
            }
          } while (walker.nextNode());
        }
      }

      /**
       * Upgrades or customizes a custom element.
       *
       * @param {HTMLElement} element
       * @param {CustomElementDefinition} definition
       * @param {boolean} callConstructor
       * @private
       */

    }, {
      key: '_upgradeElement',
      value: function _upgradeElement(element, definition, callConstructor) {
        var prototype = definition.constructor.prototype;
        element.__proto__ = prototype;
        if (callConstructor) {
          this._setNewInstance(element);
          new definition.constructor();
          element[_upgradedProp] = true;
          console.assert(this._newInstance == null);
        }

        var observedAttributes = definition.observedAttributes;
        var attributeChangedCallback = definition.attributeChangedCallback;
        if (attributeChangedCallback && observedAttributes.length > 0) {
          this._attributeObserver.observe(element, {
            attributes: true,
            attributeOldValue: true,
            attributeFilter: observedAttributes
          });

          // Trigger attributeChangedCallback for existing attributes.
          // https://html.spec.whatwg.org/multipage/scripting.html#upgrades
          for (var i = 0; i < observedAttributes.length; i++) {
            var name = observedAttributes[i];
            if (element.hasAttribute(name)) {
              var value = element.getAttribute(name);
              attributeChangedCallback.call(element, name, null, value, null);
            }
          }
        }
      }

      /**
       * @param {!Array<!MutationRecord>} mutations
       * @private
       */

    }, {
      key: '_handleAttributeChange',
      value: function _handleAttributeChange(mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var mutation = mutations[i];
          if (mutation.type === 'attributes') {
            var target = /** @type {HTMLElement} */mutation.target;
            // We should be gaurenteed to have a definition because this mutation
            // observer is only observing custom elements observedAttributes
            var definition = this._definitions.get(target.localName);
            var name = /** @type {!string} */mutation.attributeName;
            var oldValue = mutation.oldValue;
            var newValue = target.getAttribute(name);
            // Skip changes that were handled synchronously by setAttribute
            if (newValue !== oldValue) {
              var namespace = mutation.attributeNamespace;
              definition.attributeChangedCallback.call(target, name, oldValue, newValue, namespace);
            }
          }
        }
      }
    }]);

    return CustomElementRegistry;
  }();

  // Closure Compiler Exports


  window['CustomElementRegistry'] = CustomElementRegistry;
  CustomElementRegistry.prototype['define'] = CustomElementRegistry.prototype.define;
  CustomElementRegistry.prototype['get'] = CustomElementRegistry.prototype.get;
  CustomElementRegistry.prototype['whenDefined'] = CustomElementRegistry.prototype.whenDefined;
  CustomElementRegistry.prototype['flush'] = CustomElementRegistry.prototype.flush;
  CustomElementRegistry.prototype['polyfilled'] = true;
  // TODO(justinfagnani): remove these in production code
  CustomElementRegistry.prototype['_observeRoot'] = CustomElementRegistry.prototype._observeRoot;
  CustomElementRegistry.prototype['_addImport'] = CustomElementRegistry.prototype._addImport;

  // patch window.HTMLElement

  /** @const */
  var origHTMLElement = win.HTMLElement;
  /**
   * @type {function(new: HTMLElement)}
   */
  var newHTMLElement = function HTMLElement() {
    var customElements = _customElements();

    // If there's an being upgraded, return that
    if (customElements._newInstance) {
      var i = customElements._newInstance;
      customElements._newInstance = null;
      return i;
    }
    if (this.constructor) {
      // Find the tagname of the constructor and create a new element with it
      var tagName = customElements._constructors.get(this.constructor);
      return _createElement(doc, tagName, undefined, false);
    }
    throw new Error('Unknown constructor. Did you call customElements.define()?');
  };
  win.HTMLElement = newHTMLElement;
  win.HTMLElement.prototype = Object.create(origHTMLElement.prototype, {
    constructor: { value: win.HTMLElement, configurable: true, writable: true }
  });

  // patch doc.createElement
  // TODO(justinfagnani): why is the cast neccessary?
  // Can we fix the Closure DOM externs?
  var _origCreateElement =
  /** @type {function(this:Document, string, (Object|undefined)=): !HTMLElement}}*/
  doc.createElement;

  /**
   * Creates a new element and upgrades it if it's a custom element.
   * @param {!Document} doc
   * @param {!string} tagName
   * @param {Object|undefined} options
   * @param {boolean} callConstructor whether or not to call the elements
   *   constructor after upgrading. If an element is created by calling its
   *   constructor, then `callConstructor` should be false to prevent double
   *   initialization.
   */
  function _createElement(doc, tagName, options, callConstructor) {
    var customElements = _customElements();
    var element = options ? _origCreateElement.call(doc, tagName, options) : _origCreateElement.call(doc, tagName);
    var definition = customElements._definitions.get(tagName.toLowerCase());
    if (definition) {
      customElements._upgradeElement(element, definition, callConstructor);
    }
    if (tagName.toLowerCase() !== 'html') {
      customElements._observeRoot(element);
    }
    return element;
  };
  doc.createElement = function (tagName, options) {
    return _createElement(doc, tagName, options, true);
  };

  // patch doc.createElementNS

  var HTMLNS = 'http://www.w3.org/1999/xhtml';

  /** @type {function(this:Document,string,string):Element} */
  var _origCreateElementNS = doc.createElementNS;
  doc.createElementNS =
  /** @type {function(this:Document,(string|null),string):!Element} */
  function (namespaceURI, qualifiedName) {
    if (namespaceURI === 'http://www.w3.org/1999/xhtml') {
      return doc.createElement(qualifiedName);
    } else {
      return _origCreateElementNS.call(doc, namespaceURI, qualifiedName);
    }
  };

  // patch Element.attachShadow

  /** @type {function({closed: boolean})} */
  var _origAttachShadow = Element.prototype['attachShadow'];
  if (_origAttachShadow) {
    Object.defineProperty(Element.prototype, 'attachShadow', {
      value: function value(options) {
        /** @type {!Node} */
        var root = _origAttachShadow.call(this, options);
        /** @type {CustomElementRegistry} */
        var customElements = _customElements();
        customElements._observeRoot(root);
        return root;
      }
    });
  }

  // patch doc.importNode

  var rawImportNode = doc.importNode;
  doc.importNode = function (node, deep) {
    var clone = /** @type{!Node} */rawImportNode.call(doc, node, deep);
    var customElements = _customElements();
    var nodes = isElement(clone) ? [clone] : clone.childNodes;
    /** @type {CustomElementRegistry} */_customElements()._addNodes(nodes);
    return clone;
  };

  // patch Element.setAttribute & removeAttribute

  var _origSetAttribute = Element.prototype.setAttribute;
  Element.prototype['setAttribute'] = function (name, value) {
    changeAttribute(this, name, value, _origSetAttribute);
  };
  var _origRemoveAttribute = Element.prototype.removeAttribute;
  Element.prototype['removeAttribute'] = function (name) {
    changeAttribute(this, name, null, _origRemoveAttribute);
  };

  function changeAttribute(element, name, value, operation) {
    name = name.toLowerCase();
    var oldValue = element.getAttribute(name);
    operation.call(element, name, value);

    // Bail if this wasn't a fully upgraded custom element
    if (element[_upgradedProp] == true) {
      var definition = _customElements()._definitions.get(element.localName);
      var observedAttributes = definition.observedAttributes;
      var attributeChangedCallback = definition.attributeChangedCallback;
      if (attributeChangedCallback && observedAttributes.indexOf(name) >= 0) {
        var newValue = element.getAttribute(name);
        if (newValue !== oldValue) {
          attributeChangedCallback.call(element, name, oldValue, newValue, null);
        }
      }
    }
  }

  Object.defineProperty(window, 'customElements', {
    value: new CustomElementRegistry(),
    configurable: true,
    enumerable: true
  });

  // TODO(justinfagnani): Remove. Temporary for backward-compatibility
  window['CustomElements'] = {
    takeRecords: function takeRecords() {
      if (_customElements().flush) _customElements().flush();
    }
  };
})();
