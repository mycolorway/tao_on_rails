/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
var Module,
  slice = [].slice,
  indexOf = [].indexOf;





/* harmony default export */ __webpack_exports__["a"] = (Module = (function() {
  var id;

  class Module {
    static extend(obj) {
      var key, ref, val;
      if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isFunction(obj)) {
        obj = obj.call(this);
      }
      if (!(obj && typeof obj === 'object')) {
        return;
      }
      for (key in obj) {
        val = obj[key];
        if (key !== 'included' && key !== 'extended') {
          this[key] = val;
        }
      }
      if ((ref = obj.extended) != null) {
        ref.call(this);
      }
      return this;
    }

    static include(obj) {
      var key, ref, val;
      if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isFunction(obj)) {
        obj = obj.call(this);
      }
      if (!(obj && typeof obj === 'object')) {
        return;
      }
      for (key in obj) {
        val = obj[key];
        if (key !== 'included' && key !== 'extended') {
          this.prototype[key] = val;
        }
      }
      if ((ref = obj.included) != null) {
        ref.call(this);
      }
      return this;
    }

    static get(name, method) {
      return Object.defineProperty(this.prototype, name, {
        get: method,
        configurable: true
      });
    }

    static set(name, method) {
      return Object.defineProperty(this.prototype, name, {
        set: method,
        configurable: true
      });
    }

    static property(...names) {
      var i, options, ref;
      ref = names, names = 2 <= ref.length ? slice.call(ref, 0, i = ref.length - 1) : (i = 0, []), options = ref[i++];
      if (options === void 0) {
        options = {};
      }
      if (typeof options !== 'object') {
        names.push(options);
        options = {};
      }
      return names.forEach((name) => {
        this.get(name, function() {
          if (!__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isUndefined(this._proterties[name])) {
            return this._proterties[name];
          } else if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isFunction(options.default)) {
            return options.default.call(this);
          } else {
            return options.default;
          }
        });
        return this.set(name, function(val) {
          var name1;
          if (this._proterties[name] === val) {
            return;
          }
          this._proterties[name] = val;
          return typeof this[name1 = `_${name}Changed`] === "function" ? this[name1]() : void 0;
        });
      });
    }

    static option(...names) {
      var i, options, ref;
      ref = names, names = 2 <= ref.length ? slice.call(ref, 0, i = ref.length - 1) : (i = 0, []), options = ref[i++];
      if (options === void 0) {
        options = {};
      }
      if (typeof options !== 'object') {
        names.push(options);
        options = {};
      }
      return names.forEach((name) => {
        if (indexOf.call(this._options, name) < 0) {
          this._options.push(name);
        }
        return this.property(name, options);
      });
    }

    static aliasMethod(newMethod, oldMethod) {
      return this.prototype[newMethod] = function() {
        var ref;
        return (ref = this[oldMethod]) != null ? ref.apply(this, arguments) : void 0;
      };
    }

    constructor(options = {}) {
      var key, val;
      this.id = ++id;
      this._proterties = {};
      if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isObject(options)) {
        for (key in options) {
          val = options[key];
          if (indexOf.call(this.constructor._options, key) >= 0) {
            this[key] = val;
          }
        }
      }
      this._init();
    }

    _init() {}

    // to be implemented
    on(...args) {
      return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).on(...args);
    }

    off(...args) {
      return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).off(...args);
    }

    trigger(...args) {
      return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).triggerHandler(...args);
    }

    one(...args) {
      return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).one(...args);
    }

  };

  id = 0;

  Module._options = [];

  return Module;

})());


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ComponentBasedOn */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__attribute_manager__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
var ComponentBasedOn, components,
  slice = [].slice;







components = {};

ComponentBasedOn = function(superClassName = 'HTMLElement') {
  var ComponentClass;
  if (components[superClassName]) {
    return components[superClassName];
  }
  ComponentClass = (function() {
    var count, superClass;

    class ComponentClass {
      static extend(obj) {
        var key, ref, val;
        if (__WEBPACK_IMPORTED_MODULE_2_lodash___default.a.isFunction(obj)) {
          obj = obj.call(this);
        }
        if (!(obj && typeof obj === 'object')) {
          return;
        }
        for (key in obj) {
          val = obj[key];
          if (key !== 'included' && key !== 'extended') {
            this[key] = val;
          }
        }
        if ((ref = obj.extended) != null) {
          ref.call(this);
        }
        return this;
      }

      static include(obj) {
        var key, ref, val;
        if (__WEBPACK_IMPORTED_MODULE_2_lodash___default.a.isFunction(obj)) {
          obj = obj.call(this);
        }
        if (!(obj && typeof obj === 'object')) {
          return;
        }
        for (key in obj) {
          val = obj[key];
          if (key !== 'included' && key !== 'extended') {
            this.prototype[key] = val;
          }
        }
        if ((ref = obj.included) != null) {
          ref.call(this);
        }
        return this;
      }

      static get(attributeName, getMethod) {
        return Object.defineProperty(this.prototype, attributeName, {
          get: getMethod,
          configurable: true
        });
      }

      static set(attributeName, setMethod) {
        return Object.defineProperty(this.prototype, attributeName, {
          set: setMethod,
          configurable: true
        });
      }

      static attribute(...names) {
        var i, options, ref;
        ref = names, names = 2 <= ref.length ? slice.call(ref, 0, i = ref.length - 1) : (i = 0, []), options = ref[i++];
        if (options === void 0) {
          options = {};
        }
        if (typeof options !== 'object') {
          names.push(options);
          options = {};
        }
        return names.forEach((name) => {
          var attrName;
          attrName = __WEBPACK_IMPORTED_MODULE_2_lodash___default.a.kebabCase(name);
          this.get(name, function() {
            return __WEBPACK_IMPORTED_MODULE_0__attribute_manager__["a" /* default */].getAttribute(this, attrName, options);
          });
          this.set(name, function(val) {
            if (this._beforeAttributeChanged(attrName, val) === false) {
              return;
            }
            return __WEBPACK_IMPORTED_MODULE_0__attribute_manager__["a" /* default */].setAttribute(this, attrName, val, options);
          });
          if (options.observe) {
            return this.observedAttributes.push(attrName);
          }
        });
      }

      static tag(tag) {
        if (!__WEBPACK_IMPORTED_MODULE_2_lodash___default.a.isUndefined(tag)) {
          this._tag = tag;
        }
        return this._tag;
      }

      static register(componentClass) {
        if (!(componentClass.tag() && window.customElements)) {
          return;
        }
        return customElements.define(componentClass.tag(), componentClass);
      }

      constructor() {
        var _instance;
        _instance = superClass.apply(this, arguments);
        this._created();
        return _instance;
      }

      connectedCallback() {
        return __WEBPACK_IMPORTED_MODULE_1_jquery___default()(() => {
          this.connected = true;
          if (!this.initialized) {
            this.taoId = ++count;
            this._init();
            this.initialized = true;
            this.namespacedTrigger('initialized');
          }
          this._connected();
          return this.namespacedTrigger('connected');
        });
      }

      disconnectedCallback() {
        return __WEBPACK_IMPORTED_MODULE_1_jquery___default()(() => {
          this.connected = false;
          this._disconnected();
          return this.namespacedTrigger('disconnected');
        });
      }

      attributeChangedCallback(name) {
        if (!this.connected) {
          return;
        }
        return this._attributeChanged(name);
      }

      _created() {}

      // called when the element was created
      _init() {}

      // called when the element was connected to dom for the first time
      _connected() {}

      // called when the element was connected to dom
      _disconnected() {}

      // called when the element was disconnected from dom
      _beforeAttributeChanged(name, val) {
        var name1;
        return typeof this[name1 = `_before${__WEBPACK_IMPORTED_MODULE_2_lodash___default.a.upperFirst(__WEBPACK_IMPORTED_MODULE_2_lodash___default.a.camelCase(name))}Changed`] === "function" ? this[name1](val) : void 0;
      }

      _attributeChanged(name) {
        var name1;
        return typeof this[name1 = `_${__WEBPACK_IMPORTED_MODULE_2_lodash___default.a.camelCase(name)}Changed`] === "function" ? this[name1]() : void 0;
      }

      reflow() {
        Tao.helpers.reflow(this);
        return this;
      }

      beforeCache() {}

      // called before turbolinks cache pages
      findComponent(...selectors) {
        var callback;
        if (__WEBPACK_IMPORTED_MODULE_2_lodash___default.a.isFunction(__WEBPACK_IMPORTED_MODULE_2_lodash___default.a.last(selectors))) {
          callback = selectors.pop();
        }
        return Tao.helpers.findComponent(selectors, callback, this);
      }

      on(name, ...args) {
        if (name && name.indexOf('.') < 0) {
          name = `${name}.${this.constructor._tag}-${this.taoId}`;
        }
        return this.jq.on(name, ...args);
      }

      off(name = '', ...args) {
        if (name.indexOf('.') < 0) {
          name = `${name}.${this.constructor._tag}-${this.taoId}`;
        }
        return this.jq.off(name, ...args);
      }

      trigger(...args) {
        return this.jq.trigger(...args);
      }

      triggerHandler(...args) {
        return this.jq.triggerHandler(...args);
      }

      namespacedTrigger(name, params) {
        this.trigger(`tao:${name}`, params);
        return this.trigger(`${this.constructor._tag}:${name}`, params);
      }

      one(...args) {
        return this.jq.one(...args);
      }

    };

    // coffee's inheritance code is not compatible with custom elements
    superClass = window[superClassName];

    ComponentClass.prototype = Object.create(superClass.prototype, {
      constructor: {
        value: ComponentClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });

    if (Object.setPrototypeOf != null) {
      Object.setPrototypeOf(ComponentClass, superClass);
    } else {
      ComponentClass.__proto__ = superClass;
    }

    count = 0;

    ComponentClass._tag = 'tao-component';

    ComponentClass.observedAttributes = [];

    ComponentClass.get('jq', function() {
      return __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this);
    });

    ComponentClass.attribute('taoId');

    return ComponentClass;

  })();
  return components[superClassName] = ComponentClass;
};

/* harmony default export */ __webpack_exports__["a"] = (ComponentBasedOn('HTMLElement'));




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
var AttributeManager, manager;





manager = null;

/* harmony default export */ __webpack_exports__["a"] = (AttributeManager = (function() {
  class AttributeManager extends __WEBPACK_IMPORTED_MODULE_0__module__["a" /* default */] {
    static getManager() {
      return manager || (manager = new AttributeManager());
    }

    static getAttribute(element, name, options) {
      var ref;
      manager = this.getManager();
      options = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.extend({}, this.defaultOptions, options);
      return (ref = manager._attributes[__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.camelCase(options.type)]) != null ? ref.get(element, name, options) : void 0;
    }

    static setAttribute(element, name, val, options) {
      var ref;
      manager = this.getManager();
      options = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.extend({}, this.defaultOptions, options);
      return (ref = manager._attributes[__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.camelCase(options.type)]) != null ? ref.set(element, name, val, options) : void 0;
    }

    static registerAttribute(type, config) {
      if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isString(config)) {
        return this.prototype._attributes[type] = this.prototype._attributes[config];
      } else {
        return this.prototype._attributes[type] = config;
      }
    }

  };

  AttributeManager.defaultOptions = {
    type: 'string'
  };

  AttributeManager.prototype._attributes = {};

  AttributeManager.registerAttribute('string', {
    get: function(element, name, options) {
      return element.getAttribute(name) || options.default || '';
    },
    set: function(element, name, val, options) {
      return element.setAttribute(name, val.toString());
    }
  });

  AttributeManager.registerAttribute('number', {
    get: function(element, name, options) {
      var value;
      value = parseFloat(element.getAttribute(name));
      if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isNaN(value)) {
        if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isNumber(options.default)) {
          return options.default;
        } else {
          return null;
        }
      } else {
        return value;
      }
    },
    set: function(element, name, val, options) {
      return element.setAttribute(name, val.toString());
    }
  });

  AttributeManager.registerAttribute('boolean', {
    get: function(element, name, options) {
      return element.hasAttribute(name);
    },
    set: function(element, name, val, options) {
      if (val) {
        return element.setAttribute(name, '');
      } else {
        return element.removeAttribute(name);
      }
    }
  });

  AttributeManager.registerAttribute('bool', 'boolean');

  AttributeManager.registerAttribute('hash', {
    get: function(element, name, options) {
      var e, value;
      value = element.getAttribute(name);
      if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isString(value)) {
        try {
          return JSON.parse(value);
        } catch (error) {
          e = error;
          return options.default || null;
        }
      } else {
        return options.default || null;
      }
    },
    set: function(element, name, val, options) {
      var e;
      val = (function() {
        try {
          return JSON.stringify(val);
        } catch (error) {
          e = error;
          return '{}';
        }
      })();
      return element.setAttribute(name, val);
    }
  });

  AttributeManager.registerAttribute('object', 'hash');

  AttributeManager.registerAttribute('array', {
    get: function(element, name, options) {
      var e, value;
      value = element.getAttribute(name);
      if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isString(value)) {
        try {
          return JSON.parse(value);
        } catch (error) {
          e = error;
          return options.default || null;
        }
      } else {
        return options.default || null;
      }
    },
    set: function(element, name, val, options) {
      var e;
      val = (function() {
        try {
          return JSON.stringify(val);
        } catch (error) {
          e = error;
          return '[]';
        }
      })();
      return element.setAttribute(name, val);
    }
  });

  return AttributeManager;

})());


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__custom_elements__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__application__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__attribute_manager__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helpers__ = __webpack_require__(11);














/* harmony default export */ __webpack_exports__["default"] = ({Module: __WEBPACK_IMPORTED_MODULE_1__module__["a" /* default */], Component: __WEBPACK_IMPORTED_MODULE_2__component__["a" /* default */], Application: __WEBPACK_IMPORTED_MODULE_3__application__["a" /* default */], Page: __WEBPACK_IMPORTED_MODULE_4__page__["a" /* default */], AttributeManager: __WEBPACK_IMPORTED_MODULE_5__attribute_manager__["a" /* default */], helpers: __WEBPACK_IMPORTED_MODULE_6__helpers__["a" /* default */]});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__native_shim__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__native_shim___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__native_shim__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webcomponents_custom_elements__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webcomponents_custom_elements___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__webcomponents_custom_elements__);
var ref;





if ((ref = window.customElements) != null) {
  if (typeof ref.polyfillWrapFlushCallback === "function") {
    ref.polyfillWrapFlushCallback(function(flush) {
      return $(function() {
        return flush();
      });
    });
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// /**
//  * @license
//  * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
//  * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
//  * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
//  * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
//  * Code distributed by Google as part of the polymer project is also
//  * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
//  */
if (window.customElements) {
  eval('(() => {\n  \'use strict\';\n  // Do nothing if `customElements` does not exist.\n  if (!window.customElements) return;\n  const NativeHTMLElement = window.HTMLElement;\n  const nativeDefine = window.customElements.define;\n  const nativeGet = window.customElements.get;\n  /**\n   * Map of user-provided constructors to tag names.\n   *\n   * @type {Map<Function, string>}\n   */\n  const tagnameByConstructor = new Map();\n  /**\n   * Map of tag names to user-provided constructors.\n   *\n   * @type {Map<string, Function>}\n   */\n  const constructorByTagname = new Map();\n  /**\n   * Whether the constructors are being called by a browser process, ie parsing\n   * or createElement.\n   */\n  let browserConstruction = false;\n  /**\n   * Whether the constructors are being called by a user-space process, ie\n   * calling an element constructor.\n   */\n  let userConstruction = false;\n  window.HTMLElement = function() {\n    if (!browserConstruction) {\n      const tagname = tagnameByConstructor.get(this.constructor);\n      const fakeClass = nativeGet.call(window.customElements, tagname);\n      // Make sure that the fake constructor doesn\'t call back to this constructor\n      userConstruction = true;\n      const instance = new (fakeClass)();\n      return instance;\n    }\n    // Else do nothing. This will be reached by ES5-style classes doing\n    // HTMLElement.call() during initialization\n    browserConstruction = false;\n  };\n  // By setting the patched HTMLElement\'s prototype property to the native\n  // HTMLElement\'s prototype we make sure that:\n  //     document.createElement(\'a\') instanceof HTMLElement\n  // works because instanceof uses HTMLElement.prototype, which is on the\n  // ptototype chain of built-in elements.\n  window.HTMLElement.prototype = NativeHTMLElement.prototype;\n  const define = (tagname, elementClass) => {\n    const elementProto = elementClass.prototype;\n    const StandInElement = class extends NativeHTMLElement {\n      constructor() {\n        // Call the native HTMLElement constructor, this gives us the\n        // under-construction instance as `this`:\n        super();\n        // The prototype will be wrong up because the browser used our fake\n        // class, so fix it:\n        Object.setPrototypeOf(this, elementProto);\n        if (!userConstruction) {\n          // Make sure that user-defined constructor bottom\'s out to a do-nothing\n          // HTMLElement() call\n          browserConstruction = true;\n          // Call the user-defined constructor on our instance:\n          elementClass.call(this);\n        }\n        userConstruction = false;\n      }\n    };\n    const standInProto = StandInElement.prototype;\n    StandInElement.observedAttributes = elementClass.observedAttributes;\n    standInProto.connectedCallback = elementProto.connectedCallback;\n    standInProto.disconnectedCallback = elementProto.disconnectedCallback;\n    standInProto.attributeChangedCallback = elementProto.attributeChangedCallback;\n    standInProto.adoptedCallback = elementProto.adoptedCallback;\n    tagnameByConstructor.set(elementClass, tagname);\n    constructorByTagname.set(tagname, elementClass);\n    nativeDefine.call(window.customElements, tagname, StandInElement);\n  };\n  const get = (tagname) => constructorByTagname.get(tagname);\n  // Workaround for Safari bug where patching customElements can be lost, likely\n  // due to native wrapper garbage collection issue\n  Object.defineProperty(window, \'customElements\',\n    {value: window.customElements, configurable: true, writable: true});\n  Object.defineProperty(window.customElements, \'define\',\n    {value: define, configurable: true, writable: true});\n  Object.defineProperty(window.customElements, \'get\',\n    {value: get, configurable: true, writable: true});\n})();');
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

(function(){
'use strict';var h=new function(){};var aa=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function m(b){var a=aa.has(b);b=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(b);return!a&&b}function n(b){var a=b.isConnected;if(void 0!==a)return a;for(;b&&!(b.__CE_isImportDocument||b instanceof Document);)b=b.parentNode||(window.ShadowRoot&&b instanceof ShadowRoot?b.host:void 0);return!(!b||!(b.__CE_isImportDocument||b instanceof Document))}
function p(b,a){for(;a&&a!==b&&!a.nextSibling;)a=a.parentNode;return a&&a!==b?a.nextSibling:null}
function t(b,a,d){d=d?d:new Set;for(var c=b;c;){if(c.nodeType===Node.ELEMENT_NODE){var e=c;a(e);var f=e.localName;if("link"===f&&"import"===e.getAttribute("rel")){c=e.import;if(c instanceof Node&&!d.has(c))for(d.add(c),c=c.firstChild;c;c=c.nextSibling)t(c,a,d);c=p(b,e);continue}else if("template"===f){c=p(b,e);continue}if(e=e.__CE_shadowRoot)for(e=e.firstChild;e;e=e.nextSibling)t(e,a,d)}c=c.firstChild?c.firstChild:p(b,c)}}function u(b,a,d){b[a]=d};function v(){this.a=new Map;this.o=new Map;this.f=[];this.b=!1}function ba(b,a,d){b.a.set(a,d);b.o.set(d.constructor,d)}function w(b,a){b.b=!0;b.f.push(a)}function x(b,a){b.b&&t(a,function(a){return y(b,a)})}function y(b,a){if(b.b&&!a.__CE_patched){a.__CE_patched=!0;for(var d=0;d<b.f.length;d++)b.f[d](a)}}function z(b,a){var d=[];t(a,function(b){return d.push(b)});for(a=0;a<d.length;a++){var c=d[a];1===c.__CE_state?b.connectedCallback(c):A(b,c)}}
function B(b,a){var d=[];t(a,function(b){return d.push(b)});for(a=0;a<d.length;a++){var c=d[a];1===c.__CE_state&&b.disconnectedCallback(c)}}
function C(b,a,d){d=d?d:{};var c=d.w||new Set,e=d.s||function(a){return A(b,a)},f=[];t(a,function(a){if("link"===a.localName&&"import"===a.getAttribute("rel")){var d=a.import;d instanceof Node&&"complete"===d.readyState?(d.__CE_isImportDocument=!0,d.__CE_hasRegistry=!0):a.addEventListener("load",function(){var d=a.import;if(!d.__CE_documentLoadHandled){d.__CE_documentLoadHandled=!0;d.__CE_isImportDocument=!0;d.__CE_hasRegistry=!0;var f=new Set(c);f.delete(d);C(b,d,{w:f,s:e})}})}else f.push(a)},c);
if(b.b)for(a=0;a<f.length;a++)y(b,f[a]);for(a=0;a<f.length;a++)e(f[a])}
function A(b,a){if(void 0===a.__CE_state){var d=b.a.get(a.localName);if(d){d.constructionStack.push(a);var c=d.constructor;try{try{if(new c!==a)throw Error("The custom element constructor did not produce the element being upgraded.");}finally{d.constructionStack.pop()}}catch(r){throw a.__CE_state=2,r;}a.__CE_state=1;a.__CE_definition=d;if(d.attributeChangedCallback)for(d=d.observedAttributes,c=0;c<d.length;c++){var e=d[c],f=a.getAttribute(e);null!==f&&b.attributeChangedCallback(a,e,null,f,null)}n(a)&&
b.connectedCallback(a)}}}v.prototype.connectedCallback=function(b){var a=b.__CE_definition;a.connectedCallback&&a.connectedCallback.call(b)};v.prototype.disconnectedCallback=function(b){var a=b.__CE_definition;a.disconnectedCallback&&a.disconnectedCallback.call(b)};v.prototype.attributeChangedCallback=function(b,a,d,c,e){var f=b.__CE_definition;f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(a)&&f.attributeChangedCallback.call(b,a,d,c,e)};function D(b,a){this.c=b;this.a=a;this.b=void 0;C(this.c,this.a);"loading"===this.a.readyState&&(this.b=new MutationObserver(this.f.bind(this)),this.b.observe(this.a,{childList:!0,subtree:!0}))}function E(b){b.b&&b.b.disconnect()}D.prototype.f=function(b){var a=this.a.readyState;"interactive"!==a&&"complete"!==a||E(this);for(a=0;a<b.length;a++)for(var d=b[a].addedNodes,c=0;c<d.length;c++)C(this.c,d[c])};function ca(){var b=this;this.b=this.a=void 0;this.f=new Promise(function(a){b.b=a;b.a&&a(b.a)})}function F(b){if(b.a)throw Error("Already resolved.");b.a=void 0;b.b&&b.b(void 0)};function G(b){this.i=!1;this.c=b;this.m=new Map;this.j=function(b){return b()};this.g=!1;this.l=[];this.u=new D(b,document)}
G.prototype.define=function(b,a){var d=this;if(!(a instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!m(b))throw new SyntaxError("The element name '"+b+"' is not valid.");if(this.c.a.get(b))throw Error("A custom element with name '"+b+"' has already been defined.");if(this.i)throw Error("A custom element is already being defined.");this.i=!0;var c,e,f,r,k;try{var g=function(b){var a=l[b];if(void 0!==a&&!(a instanceof Function))throw Error("The '"+b+"' callback must be a function.");
return a},l=a.prototype;if(!(l instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");c=g("connectedCallback");e=g("disconnectedCallback");f=g("adoptedCallback");r=g("attributeChangedCallback");k=a.observedAttributes||[]}catch(q){return}finally{this.i=!1}a={localName:b,constructor:a,connectedCallback:c,disconnectedCallback:e,adoptedCallback:f,attributeChangedCallback:r,observedAttributes:k,constructionStack:[]};ba(this.c,b,a);this.l.push(a);this.g||
(this.g=!0,this.j(function(){return da(d)}))};function da(b){if(!1!==b.g){b.g=!1;for(var a=b.l,d=[],c=new Map,e=0;e<a.length;e++)c.set(a[e].localName,[]);C(b.c,document,{s:function(a){if(void 0===a.__CE_state){var e=a.localName,f=c.get(e);f?f.push(a):b.c.a.get(e)&&d.push(a)}}});for(e=0;e<d.length;e++)A(b.c,d[e]);for(;0<a.length;){for(var f=a.shift(),e=f.localName,f=c.get(f.localName),r=0;r<f.length;r++)A(b.c,f[r]);(e=b.m.get(e))&&F(e)}}}G.prototype.get=function(b){if(b=this.c.a.get(b))return b.constructor};
G.prototype.whenDefined=function(b){if(!m(b))return Promise.reject(new SyntaxError("'"+b+"' is not a valid custom element name."));var a=this.m.get(b);if(a)return a.f;a=new ca;this.m.set(b,a);this.c.a.get(b)&&!this.l.some(function(a){return a.localName===b})&&F(a);return a.f};G.prototype.v=function(b){E(this.u);var a=this.j;this.j=function(d){return b(function(){return a(d)})}};window.CustomElementRegistry=G;G.prototype.define=G.prototype.define;G.prototype.get=G.prototype.get;
G.prototype.whenDefined=G.prototype.whenDefined;G.prototype.polyfillWrapFlushCallback=G.prototype.v;var H=window.Document.prototype.createElement,ea=window.Document.prototype.createElementNS,fa=window.Document.prototype.importNode,ga=window.Document.prototype.prepend,ha=window.Document.prototype.append,ia=window.DocumentFragment.prototype.prepend,ja=window.DocumentFragment.prototype.append,I=window.Node.prototype.cloneNode,J=window.Node.prototype.appendChild,K=window.Node.prototype.insertBefore,L=window.Node.prototype.removeChild,M=window.Node.prototype.replaceChild,N=Object.getOwnPropertyDescriptor(window.Node.prototype,
"textContent"),O=window.Element.prototype.attachShadow,P=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),Q=window.Element.prototype.getAttribute,R=window.Element.prototype.setAttribute,S=window.Element.prototype.removeAttribute,T=window.Element.prototype.getAttributeNS,U=window.Element.prototype.setAttributeNS,ka=window.Element.prototype.removeAttributeNS,la=window.Element.prototype.insertAdjacentElement,ma=window.Element.prototype.prepend,na=window.Element.prototype.append,
V=window.Element.prototype.before,oa=window.Element.prototype.after,pa=window.Element.prototype.replaceWith,qa=window.Element.prototype.remove,ra=window.HTMLElement,W=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),sa=window.HTMLElement.prototype.insertAdjacentElement;function ta(){var b=X;window.HTMLElement=function(){function a(){var a=this.constructor,c=b.o.get(a);if(!c)throw Error("The custom element being constructed was not registered with `customElements`.");var e=c.constructionStack;if(!e.length)return e=H.call(document,c.localName),Object.setPrototypeOf(e,a.prototype),e.__CE_state=1,e.__CE_definition=c,y(b,e),e;var c=e.length-1,f=e[c];if(f===h)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
e[c]=h;Object.setPrototypeOf(f,a.prototype);y(b,f);return f}a.prototype=ra.prototype;return a}()};function Y(b,a,d){function c(a){return function(d){for(var e=[],c=0;c<arguments.length;++c)e[c-0]=arguments[c];for(var c=[],f=[],l=0;l<e.length;l++){var q=e[l];q instanceof Element&&n(q)&&f.push(q);if(q instanceof DocumentFragment)for(q=q.firstChild;q;q=q.nextSibling)c.push(q);else c.push(q)}a.apply(this,e);for(e=0;e<f.length;e++)B(b,f[e]);if(n(this))for(e=0;e<c.length;e++)f=c[e],f instanceof Element&&z(b,f)}}d.h&&(a.prepend=c(d.h));d.append&&(a.append=c(d.append))};function ua(){var b=X;u(Document.prototype,"createElement",function(a){if(this.__CE_hasRegistry){var d=b.a.get(a);if(d)return new d.constructor}a=H.call(this,a);y(b,a);return a});u(Document.prototype,"importNode",function(a,d){a=fa.call(this,a,d);this.__CE_hasRegistry?C(b,a):x(b,a);return a});u(Document.prototype,"createElementNS",function(a,d){if(this.__CE_hasRegistry&&(null===a||"http://www.w3.org/1999/xhtml"===a)){var c=b.a.get(d);if(c)return new c.constructor}a=ea.call(this,a,d);y(b,a);return a});
Y(b,Document.prototype,{h:ga,append:ha})};function va(){var b=X;function a(a,c){Object.defineProperty(a,"textContent",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(a){if(this.nodeType===Node.TEXT_NODE)c.set.call(this,a);else{var e=void 0;if(this.firstChild){var d=this.childNodes,k=d.length;if(0<k&&n(this))for(var e=Array(k),g=0;g<k;g++)e[g]=d[g]}c.set.call(this,a);if(e)for(a=0;a<e.length;a++)B(b,e[a])}}})}u(Node.prototype,"insertBefore",function(a,c){if(a instanceof DocumentFragment){var e=Array.prototype.slice.apply(a.childNodes);
a=K.call(this,a,c);if(n(this))for(c=0;c<e.length;c++)z(b,e[c]);return a}e=n(a);c=K.call(this,a,c);e&&B(b,a);n(this)&&z(b,a);return c});u(Node.prototype,"appendChild",function(a){if(a instanceof DocumentFragment){var c=Array.prototype.slice.apply(a.childNodes);a=J.call(this,a);if(n(this))for(var e=0;e<c.length;e++)z(b,c[e]);return a}c=n(a);e=J.call(this,a);c&&B(b,a);n(this)&&z(b,a);return e});u(Node.prototype,"cloneNode",function(a){a=I.call(this,a);this.ownerDocument.__CE_hasRegistry?C(b,a):x(b,a);
return a});u(Node.prototype,"removeChild",function(a){var c=n(a),e=L.call(this,a);c&&B(b,a);return e});u(Node.prototype,"replaceChild",function(a,c){if(a instanceof DocumentFragment){var e=Array.prototype.slice.apply(a.childNodes);a=M.call(this,a,c);if(n(this))for(B(b,c),c=0;c<e.length;c++)z(b,e[c]);return a}var e=n(a),f=M.call(this,a,c),d=n(this);d&&B(b,c);e&&B(b,a);d&&z(b,a);return f});N&&N.get?a(Node.prototype,N):w(b,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){for(var a=[],b=
0;b<this.childNodes.length;b++)a.push(this.childNodes[b].textContent);return a.join("")},set:function(a){for(;this.firstChild;)L.call(this,this.firstChild);J.call(this,document.createTextNode(a))}})})};function wa(b){var a=Element.prototype;function d(a){return function(e){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];for(var d=[],k=[],g=0;g<c.length;g++){var l=c[g];l instanceof Element&&n(l)&&k.push(l);if(l instanceof DocumentFragment)for(l=l.firstChild;l;l=l.nextSibling)d.push(l);else d.push(l)}a.apply(this,c);for(c=0;c<k.length;c++)B(b,k[c]);if(n(this))for(c=0;c<d.length;c++)k=d[c],k instanceof Element&&z(b,k)}}V&&(a.before=d(V));V&&(a.after=d(oa));pa&&u(a,"replaceWith",function(a){for(var e=
[],c=0;c<arguments.length;++c)e[c-0]=arguments[c];for(var c=[],d=[],k=0;k<e.length;k++){var g=e[k];g instanceof Element&&n(g)&&d.push(g);if(g instanceof DocumentFragment)for(g=g.firstChild;g;g=g.nextSibling)c.push(g);else c.push(g)}k=n(this);pa.apply(this,e);for(e=0;e<d.length;e++)B(b,d[e]);if(k)for(B(b,this),e=0;e<c.length;e++)d=c[e],d instanceof Element&&z(b,d)});qa&&u(a,"remove",function(){var a=n(this);qa.call(this);a&&B(b,this)})};function xa(){var b=X;function a(a,c){Object.defineProperty(a,"innerHTML",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(a){var e=this,d=void 0;n(this)&&(d=[],t(this,function(a){a!==e&&d.push(a)}));c.set.call(this,a);if(d)for(var f=0;f<d.length;f++){var r=d[f];1===r.__CE_state&&b.disconnectedCallback(r)}this.ownerDocument.__CE_hasRegistry?C(b,this):x(b,this);return a}})}function d(a,c){u(a,"insertAdjacentElement",function(a,e){var d=n(e);a=c.call(this,a,e);d&&B(b,e);n(a)&&z(b,e);
return a})}O&&u(Element.prototype,"attachShadow",function(a){return this.__CE_shadowRoot=a=O.call(this,a)});if(P&&P.get)a(Element.prototype,P);else if(W&&W.get)a(HTMLElement.prototype,W);else{var c=H.call(document,"div");w(b,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){return I.call(this,!0).innerHTML},set:function(a){var b="template"===this.localName?this.content:this;for(c.innerHTML=a;0<b.childNodes.length;)L.call(b,b.childNodes[0]);for(;0<c.childNodes.length;)J.call(b,c.childNodes[0])}})})}u(Element.prototype,
"setAttribute",function(a,c){if(1!==this.__CE_state)return R.call(this,a,c);var e=Q.call(this,a);R.call(this,a,c);c=Q.call(this,a);b.attributeChangedCallback(this,a,e,c,null)});u(Element.prototype,"setAttributeNS",function(a,c,d){if(1!==this.__CE_state)return U.call(this,a,c,d);var e=T.call(this,a,c);U.call(this,a,c,d);d=T.call(this,a,c);b.attributeChangedCallback(this,c,e,d,a)});u(Element.prototype,"removeAttribute",function(a){if(1!==this.__CE_state)return S.call(this,a);var c=Q.call(this,a);S.call(this,
a);null!==c&&b.attributeChangedCallback(this,a,c,null,null)});u(Element.prototype,"removeAttributeNS",function(a,c){if(1!==this.__CE_state)return ka.call(this,a,c);var d=T.call(this,a,c);ka.call(this,a,c);var e=T.call(this,a,c);d!==e&&b.attributeChangedCallback(this,c,d,e,a)});sa?d(HTMLElement.prototype,sa):la?d(Element.prototype,la):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");Y(b,Element.prototype,{h:ma,append:na});wa(b)};/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var Z=window.customElements;if(!Z||Z.forcePolyfill||"function"!=typeof Z.define||"function"!=typeof Z.get){var X=new v;ta();ua();Y(X,DocumentFragment.prototype,{h:ia,append:ja});va();xa();document.__CE_hasRegistry=!0;var customElements=new G(X);Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:customElements})};
}).call(self);

//# sourceMappingURL=custom-elements.min.js.map


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
var Application;





/* harmony default export */ __webpack_exports__["a"] = (Application = (function() {
  class Application extends __WEBPACK_IMPORTED_MODULE_0__module__["a" /* default */] {
    static initializer(name, callback) {
      return this._initializers[name] = callback;
    }

    static removeInitializer(name) {
      return this._initializers[name] = null;
    }

    _init() {
      var callback, name, ref, results;
      this._initGon();
      this._initI18n();
      this._initUjs();
      this._initTurbolinks();
      ref = this.constructor._initializers;
      results = [];
      for (name in ref) {
        callback = ref[name];
        results.push(typeof callback === "function" ? callback(this) : void 0);
      }
      return results;
    }

    _initGon() {
      if (!window.gon) {
        return;
      }
      __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.extend(this, window.gon);
      return window.gon = null;
    }

    _initUjs() {
      return __WEBPACK_IMPORTED_MODULE_1_jquery___default()(document).on("ajax:before", 'a[data-remote]', function() {
        var $link;
        $link = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this);
        if ($link.hasClass('disabled')) {
          return false;
        }
        return $link.addClass('disabled');
      }).on("ajax:complete", 'a[data-remote]', function() {
        return __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this).removeClass('disabled');
      });
    }

    _initI18n() {
      if (window.I18n && this.locale) {
        return I18n.locale = this.locale;
      }
    }

    _initPage($page) {
      return window.currentPage = this.currentPage = $page[0];
    }

    _initTurbolinks() {
      return __WEBPACK_IMPORTED_MODULE_1_jquery___default()(document).on('turbolinks:before-visit', (e) => {
        var ref, ref1;
        if (((ref = this.currentPage) != null ? typeof ref.trigger === "function" ? ref.trigger('before-leave') : void 0 : void 0) === false) {
          e.preventDefault();
          return;
        }
        return this.trigger('before-page-visit', [(ref1 = e.originalEvent) != null ? ref1.data.url : void 0]);
      }).on('turbolinks:request-start', (e) => {
        var ref;
        return this.trigger('page-request-start', [(ref = e.originalEvent) != null ? ref.data.xhr : void 0]);
      }).on('turbolinks:visit', (e) => {
        var ref;
        return this.trigger('page-visit', [(ref = e.originalEvent) != null ? ref.data.url : void 0]);
      }).on('turbolinks:before-cache', (e) => {
        var ref;
        this.trigger('before-page-cache', [this.currentPage]);
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.currentPage).find('[tao-id]').each(function(i, el) {
          if (typeof el.beforeCache === "function") {
            el.beforeCache();
          }
          return null;
        });
        if ((ref = this.currentPage) != null) {
          if (typeof ref.beforeCache === "function") {
            ref.beforeCache();
          }
        }
        return window.currentPage = this.currentPage = null;
      }).on('turbolinks:request-end', (e) => {
        var ref;
        return this.trigger('page-request-end', [(ref = e.originalEvent) != null ? ref.data.xhr : void 0]);
      }).on('turbolinks:before-render', (e) => {
        var ref;
        // turbolinks render won't trigger patching of customElements polyfills
        if (customElements._internals) {
          customElements._internals.disconnectTree(document.body);
        }
        return this.trigger('before-page-render', [__WEBPACK_IMPORTED_MODULE_1_jquery___default()((ref = e.originalEvent) != null ? ref.data.newBody : void 0)]);
      }).on('turbolinks:render', (e) => {
        // turbolinks render won't trigger patching of customElements polyfills
        if (customElements._internals) {
          customElements._internals.connectTree(document.body);
        }
        return this.trigger('page-render', [__WEBPACK_IMPORTED_MODULE_1_jquery___default()('body > .tao-page')]);
      }).on('turbolinks:load', (e) => {
        var $page;
        $page = __WEBPACK_IMPORTED_MODULE_1_jquery___default()('body > .tao-page');
        if (!($page.length > 0)) {
          return;
        }
        this._initGon();
        this._initPage($page);
        return this.trigger('page-load', [this.currentPage]);
      });
    }

  };

  Application._initializers = {};

  return Application;

})());


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component__ = __webpack_require__(3);
var Page;



/* harmony default export */ __webpack_exports__["a"] = (Page = (function() {
  class Page extends __WEBPACK_IMPORTED_MODULE_0__component__["a" /* default */] {
    beforeCache() {}

  };

  Page.attribute('layout', {
    default: 'default'
  });

  return Page;

})());


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);




/* harmony default export */ __webpack_exports__["a"] = ({
  reflow: function(el) {
    return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el)[0].offsetHeight;
  },
  findComponent: function(selectors, callback, scope = document) {
    var components;
    if (!__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isArray(selectors)) {
      selectors = [selectors];
    }
    components = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.flatten(selectors.map((s) => {
      return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(scope).find(s).get();
    }));
    if (components.length > 0 && __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isFunction(callback)) {
      this.componentReady(components, function() {
        return callback(...components);
      });
    }
    if (components.length > 1) {
      return components;
    } else if (components.length === 1) {
      return components[0];
    } else {
      return null;
    }
  },
  componentReady: function(components, callback) {
    var promises;
    if (!__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isArray(components)) {
      components = [components];
    }
    promises = components.map(function(el) {
      var deferred;
      deferred = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Deferred();
      if (el.connected) {
        setTimeout(function() {
          return deferred.resolve();
        });
      } else {
        el.on('tao:connected.taoReady', function(e) {
          if (e.target !== el) {
            return;
          }
          el.off('tao:connected.taoReady');
          return deferred.resolve();
        });
      }
      return deferred.promise();
    });
    return __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.when(...promises).then(function() {
      return callback();
    });
  }
});


/***/ })
/******/ ]);