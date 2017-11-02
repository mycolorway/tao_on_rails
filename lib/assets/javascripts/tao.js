(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["tao"] = factory(require("jquery"), require("lodash"));
	else
		root["Tao"] = factory(root["$"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
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

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jquery = _interopRequireDefault(__webpack_require__(0));

var _lodash = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Module,
    slice = [].slice,
    indexOf = [].indexOf;

var _default = Module = function () {
  var id;

  var Module =
  /*#__PURE__*/
  function () {
    _createClass(Module, null, [{
      key: "extend",
      value: function extend(obj) {
        var key, ref, val;

        if (_lodash.default.isFunction(obj)) {
          obj = obj.call(this);
        }

        if (!(obj && _typeof(obj) === 'object')) {
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
    }, {
      key: "include",
      value: function include(obj) {
        var key, ref, val;

        if (_lodash.default.isFunction(obj)) {
          obj = obj.call(this);
        }

        if (!(obj && _typeof(obj) === 'object')) {
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
    }, {
      key: "get",
      value: function get(name, method) {
        return Object.defineProperty(this.prototype, name, {
          get: method,
          configurable: true
        });
      }
    }, {
      key: "set",
      value: function set(name, method) {
        return Object.defineProperty(this.prototype, name, {
          set: method,
          configurable: true
        });
      }
    }, {
      key: "property",
      value: function property() {
        var _this = this;

        for (var _len = arguments.length, names = new Array(_len), _key = 0; _key < _len; _key++) {
          names[_key] = arguments[_key];
        }

        var i, options, ref;
        ref = names, names = 2 <= ref.length ? slice.call(ref, 0, i = ref.length - 1) : (i = 0, []), options = ref[i++];

        if (options === void 0) {
          options = {};
        }

        if (_typeof(options) !== 'object') {
          names.push(options);
          options = {};
        }

        return names.forEach(function (name) {
          _this.get(name, function () {
            if (!_lodash.default.isUndefined(this._proterties[name])) {
              return this._proterties[name];
            } else if (_lodash.default.isFunction(options.default)) {
              return options.default.call(this);
            } else {
              return options.default;
            }
          });

          return _this.set(name, function (val) {
            var name1;

            if (this._proterties[name] === val) {
              return;
            }

            this._proterties[name] = val;
            return typeof this[name1 = "_".concat(name, "Changed")] === "function" ? this[name1]() : void 0;
          });
        });
      }
    }, {
      key: "option",
      value: function option() {
        var _this2 = this;

        for (var _len2 = arguments.length, names = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          names[_key2] = arguments[_key2];
        }

        var i, options, ref;
        ref = names, names = 2 <= ref.length ? slice.call(ref, 0, i = ref.length - 1) : (i = 0, []), options = ref[i++];

        if (options === void 0) {
          options = {};
        }

        if (_typeof(options) !== 'object') {
          names.push(options);
          options = {};
        }

        return names.forEach(function (name) {
          if (indexOf.call(_this2._options, name) < 0) {
            _this2._options.push(name);
          }

          return _this2.property(name, options);
        });
      }
    }, {
      key: "aliasMethod",
      value: function aliasMethod(newMethod, oldMethod) {
        return this.prototype[newMethod] = function () {
          var ref;
          return (ref = this[oldMethod]) != null ? ref.apply(this, arguments) : void 0;
        };
      }
    }]);

    function Module() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Module);

      var key, val;
      this.id = ++id;
      this._proterties = {};

      if (_lodash.default.isObject(options)) {
        for (key in options) {
          val = options[key];

          if (indexOf.call(this.constructor._options, key) >= 0) {
            this[key] = val;
          }
        }
      }

      this._init();
    }

    _createClass(Module, [{
      key: "_init",
      value: function _init() {} // to be implemented

    }, {
      key: "on",
      value: function on() {
        var _$;

        return (_$ = (0, _jquery.default)(this)).on.apply(_$, arguments);
      }
    }, {
      key: "off",
      value: function off() {
        var _$2;

        return (_$2 = (0, _jquery.default)(this)).off.apply(_$2, arguments);
      }
    }, {
      key: "trigger",
      value: function trigger() {
        var _$3;

        return (_$3 = (0, _jquery.default)(this)).triggerHandler.apply(_$3, arguments);
      }
    }, {
      key: "one",
      value: function one() {
        var _$4;

        return (_$4 = (0, _jquery.default)(this)).one.apply(_$4, arguments);
      }
    }]);

    return Module;
  }();

  ;
  id = 0;
  Module._options = [];
  return Module;
}();

exports.default = _default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentBasedOn = exports.default = void 0;

var _attribute_manager = _interopRequireDefault(__webpack_require__(4));

var _jquery = _interopRequireDefault(__webpack_require__(0));

var _lodash = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ComponentBasedOn,
    components,
    slice = [].slice;
exports.ComponentBasedOn = ComponentBasedOn;
components = {};

exports.ComponentBasedOn = ComponentBasedOn = function ComponentBasedOn() {
  var superClassName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'HTMLElement';
  var ComponentClass;

  if (components[superClassName]) {
    return components[superClassName];
  }

  ComponentClass = function () {
    var count, superClass;

    var ComponentClass =
    /*#__PURE__*/
    function () {
      _createClass(ComponentClass, null, [{
        key: "extend",
        value: function extend(obj) {
          var key, ref, val;

          if (_lodash.default.isFunction(obj)) {
            obj = obj.call(this);
          }

          if (!(obj && _typeof(obj) === 'object')) {
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
      }, {
        key: "include",
        value: function include(obj) {
          var key, ref, val;

          if (_lodash.default.isFunction(obj)) {
            obj = obj.call(this);
          }

          if (!(obj && _typeof(obj) === 'object')) {
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
      }, {
        key: "get",
        value: function get(attributeName, getMethod) {
          return Object.defineProperty(this.prototype, attributeName, {
            get: getMethod,
            configurable: true
          });
        }
      }, {
        key: "set",
        value: function set(attributeName, setMethod) {
          return Object.defineProperty(this.prototype, attributeName, {
            set: setMethod,
            configurable: true
          });
        }
      }, {
        key: "attribute",
        value: function attribute() {
          var _this = this;

          for (var _len = arguments.length, names = new Array(_len), _key = 0; _key < _len; _key++) {
            names[_key] = arguments[_key];
          }

          var i, options, ref;
          ref = names, names = 2 <= ref.length ? slice.call(ref, 0, i = ref.length - 1) : (i = 0, []), options = ref[i++];

          if (options === void 0) {
            options = {};
          }

          if (_typeof(options) !== 'object') {
            names.push(options);
            options = {};
          }

          return names.forEach(function (name) {
            var attrName;
            attrName = _lodash.default.kebabCase(name);

            _this.get(name, function () {
              return _attribute_manager.default.getAttribute(this, attrName, options);
            });

            _this.set(name, function (val) {
              if (this._beforeAttributeChanged(attrName, val) === false) {
                return;
              }

              return _attribute_manager.default.setAttribute(this, attrName, val, options);
            });

            if (options.observe) {
              return _this.observedAttributes.push(attrName);
            }
          });
        }
      }, {
        key: "tag",
        value: function tag(_tag) {
          if (!_lodash.default.isUndefined(_tag)) {
            this._tag = _tag;
          }

          return this._tag;
        }
      }, {
        key: "register",
        value: function register(componentClass) {
          if (!(componentClass.tag() && window.customElements)) {
            return;
          }

          return customElements.define(componentClass.tag(), componentClass);
        }
      }]);

      function ComponentClass() {
        _classCallCheck(this, ComponentClass);

        var _instance;

        _instance = superClass.apply(this, arguments);

        this._created();

        return _instance;
      }

      _createClass(ComponentClass, [{
        key: "connectedCallback",
        value: function connectedCallback() {
          var _this2 = this;

          return (0, _jquery.default)(function () {
            _this2.connected = true;

            if (!_this2.initialized) {
              _this2.taoId = ++count;

              _this2._init();

              _this2.initialized = true;

              _this2.namespacedTrigger('initialized');
            }

            _this2._connected();

            return _this2.namespacedTrigger('connected');
          });
        }
      }, {
        key: "disconnectedCallback",
        value: function disconnectedCallback() {
          var _this3 = this;

          return (0, _jquery.default)(function () {
            _this3.connected = false;

            _this3._disconnected();

            return _this3.namespacedTrigger('disconnected');
          });
        }
      }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback(name) {
          if (!this.connected) {
            return;
          }

          return this._attributeChanged(name);
        }
      }, {
        key: "_created",
        value: function _created() {} // called when the element was created

      }, {
        key: "_init",
        value: function _init() {} // called when the element was connected to dom for the first time

      }, {
        key: "_connected",
        value: function _connected() {} // called when the element was connected to dom

      }, {
        key: "_disconnected",
        value: function _disconnected() {} // called when the element was disconnected from dom

      }, {
        key: "_beforeAttributeChanged",
        value: function _beforeAttributeChanged(name, val) {
          var name1;
          return typeof this[name1 = "_before".concat(_lodash.default.upperFirst(_lodash.default.camelCase(name)), "Changed")] === "function" ? this[name1](val) : void 0;
        }
      }, {
        key: "_attributeChanged",
        value: function _attributeChanged(name) {
          var name1;
          return typeof this[name1 = "_".concat(_lodash.default.camelCase(name), "Changed")] === "function" ? this[name1]() : void 0;
        }
      }, {
        key: "reflow",
        value: function reflow() {
          Tao.helpers.reflow(this);
          return this;
        }
      }, {
        key: "beforeCache",
        value: function beforeCache() {} // called before turbolinks cache pages

      }, {
        key: "findComponent",
        value: function findComponent() {
          var callback;

          for (var _len2 = arguments.length, selectors = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            selectors[_key2] = arguments[_key2];
          }

          if (_lodash.default.isFunction(_lodash.default.last(selectors))) {
            callback = selectors.pop();
          }

          return Tao.helpers.findComponent(selectors, callback, this);
        }
      }, {
        key: "on",
        value: function on(name) {
          var _jq;

          if (name && name.indexOf('.') < 0) {
            name = "".concat(name, ".").concat(this.constructor._tag, "-").concat(this.taoId);
          }

          for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            args[_key3 - 1] = arguments[_key3];
          }

          return (_jq = this.jq).on.apply(_jq, [name].concat(args));
        }
      }, {
        key: "off",
        value: function off() {
          var _jq2;

          var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

          if (name.indexOf('.') < 0) {
            name = "".concat(name, ".").concat(this.constructor._tag, "-").concat(this.taoId);
          }

          for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            args[_key4 - 1] = arguments[_key4];
          }

          return (_jq2 = this.jq).off.apply(_jq2, [name].concat(args));
        }
      }, {
        key: "trigger",
        value: function trigger() {
          var _jq3;

          return (_jq3 = this.jq).trigger.apply(_jq3, arguments);
        }
      }, {
        key: "triggerHandler",
        value: function triggerHandler() {
          var _jq4;

          return (_jq4 = this.jq).triggerHandler.apply(_jq4, arguments);
        }
      }, {
        key: "namespacedTrigger",
        value: function namespacedTrigger(name, params) {
          this.trigger("tao:".concat(name), params);
          return this.trigger("".concat(this.constructor._tag, ":").concat(name), params);
        }
      }, {
        key: "one",
        value: function one() {
          var _jq5;

          return (_jq5 = this.jq).one.apply(_jq5, arguments);
        }
      }]);

      return ComponentClass;
    }();

    ; // coffee's inheritance code is not compatible with custom elements

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
    ComponentClass.get('jq', function () {
      return (0, _jquery.default)(this);
    });
    ComponentClass.attribute('taoId');
    return ComponentClass;
  }();

  return components[superClassName] = ComponentClass;
};

var _default = ComponentBasedOn('HTMLElement');

exports.default = _default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _module = _interopRequireDefault(__webpack_require__(2));

var _lodash = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AttributeManager, manager;
manager = null;

var _default = AttributeManager = function () {
  var AttributeManager =
  /*#__PURE__*/
  function (_Module) {
    _inherits(AttributeManager, _Module);

    function AttributeManager() {
      _classCallCheck(this, AttributeManager);

      return _possibleConstructorReturn(this, (AttributeManager.__proto__ || Object.getPrototypeOf(AttributeManager)).apply(this, arguments));
    }

    _createClass(AttributeManager, null, [{
      key: "getManager",
      value: function getManager() {
        return manager || (manager = new AttributeManager());
      }
    }, {
      key: "getAttribute",
      value: function getAttribute(element, name, options) {
        var ref;
        manager = this.getManager();
        options = _lodash.default.extend({}, this.defaultOptions, options);
        return (ref = manager._attributes[_lodash.default.camelCase(options.type)]) != null ? ref.get(element, name, options) : void 0;
      }
    }, {
      key: "setAttribute",
      value: function setAttribute(element, name, val, options) {
        var ref;
        manager = this.getManager();
        options = _lodash.default.extend({}, this.defaultOptions, options);
        return (ref = manager._attributes[_lodash.default.camelCase(options.type)]) != null ? ref.set(element, name, val, options) : void 0;
      }
    }, {
      key: "registerAttribute",
      value: function registerAttribute(type, config) {
        if (_lodash.default.isString(config)) {
          return this.prototype._attributes[type] = this.prototype._attributes[config];
        } else {
          return this.prototype._attributes[type] = config;
        }
      }
    }]);

    return AttributeManager;
  }(_module.default);

  ;
  AttributeManager.defaultOptions = {
    type: 'string'
  };
  AttributeManager.prototype._attributes = {};
  AttributeManager.registerAttribute('string', {
    get: function get(element, name, options) {
      return element.getAttribute(name) || options.default || '';
    },
    set: function set(element, name, val, options) {
      return element.setAttribute(name, val.toString());
    }
  });
  AttributeManager.registerAttribute('number', {
    get: function get(element, name, options) {
      var value;
      value = parseFloat(element.getAttribute(name));

      if (_lodash.default.isNaN(value)) {
        if (_lodash.default.isNumber(options.default)) {
          return options.default;
        } else {
          return null;
        }
      } else {
        return value;
      }
    },
    set: function set(element, name, val, options) {
      return element.setAttribute(name, val.toString());
    }
  });
  AttributeManager.registerAttribute('boolean', {
    get: function get(element, name, options) {
      return element.hasAttribute(name);
    },
    set: function set(element, name, val, options) {
      if (val) {
        return element.setAttribute(name, '');
      } else {
        return element.removeAttribute(name);
      }
    }
  });
  AttributeManager.registerAttribute('bool', 'boolean');
  AttributeManager.registerAttribute('hash', {
    get: function get(element, name, options) {
      var e, value;
      value = element.getAttribute(name);

      if (_lodash.default.isString(value)) {
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
    set: function set(element, name, val, options) {
      var e;

      val = function () {
        try {
          return JSON.stringify(val);
        } catch (error) {
          e = error;
          return '{}';
        }
      }();

      return element.setAttribute(name, val);
    }
  });
  AttributeManager.registerAttribute('object', 'hash');
  AttributeManager.registerAttribute('array', {
    get: function get(element, name, options) {
      var e, value;
      value = element.getAttribute(name);

      if (_lodash.default.isString(value)) {
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
    set: function set(element, name, val, options) {
      var e;

      val = function () {
        try {
          return JSON.stringify(val);
        } catch (error) {
          e = error;
          return '[]';
        }
      }();

      return element.setAttribute(name, val);
    }
  });
  return AttributeManager;
}();

exports.default = _default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(6);

var _module = _interopRequireDefault(__webpack_require__(2));

var _component = _interopRequireDefault(__webpack_require__(3));

var _application = _interopRequireDefault(__webpack_require__(9));

var _page = _interopRequireDefault(__webpack_require__(10));

var _attribute_manager = _interopRequireDefault(__webpack_require__(4));

var _helpers = _interopRequireDefault(__webpack_require__(11));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Module: _module.default,
  Component: _component.default,
  Application: _application.default,
  Page: _page.default,
  AttributeManager: _attribute_manager.default,
  helpers: _helpers.default
};
exports.default = _default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(7);

__webpack_require__(8);

var ref;

if ((ref = window.customElements) != null) {
  if (typeof ref.polyfillWrapFlushCallback === "function") {
    ref.polyfillWrapFlushCallback(function (flush) {
      return $(function () {
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _module = _interopRequireDefault(__webpack_require__(2));

var _jquery = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Application;

var _default = Application = function () {
  var Application =
  /*#__PURE__*/
  function (_Module) {
    _inherits(Application, _Module);

    function Application() {
      _classCallCheck(this, Application);

      return _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).apply(this, arguments));
    }

    _createClass(Application, [{
      key: "_init",
      value: function _init() {
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
    }, {
      key: "_initGon",
      value: function _initGon() {
        if (!window.gon) {
          return;
        }

        _jquery.default.extend(this, window.gon);

        return window.gon = null;
      }
    }, {
      key: "_initUjs",
      value: function _initUjs() {
        return (0, _jquery.default)(document).on("ajax:before", 'a[data-remote]', function () {
          var $link;
          $link = (0, _jquery.default)(this);

          if ($link.hasClass('disabled')) {
            return false;
          }

          return $link.addClass('disabled');
        }).on("ajax:complete", 'a[data-remote]', function () {
          return (0, _jquery.default)(this).removeClass('disabled');
        });
      }
    }, {
      key: "_initI18n",
      value: function _initI18n() {
        if (window.I18n && this.locale) {
          return I18n.locale = this.locale;
        }
      }
    }, {
      key: "_initPage",
      value: function _initPage($page) {
        return window.currentPage = this.currentPage = $page[0];
      }
    }, {
      key: "_initTurbolinks",
      value: function _initTurbolinks() {
        var _this = this;

        return (0, _jquery.default)(document).on('turbolinks:before-visit', function (e) {
          var ref, ref1;

          if (((ref = _this.currentPage) != null ? typeof ref.trigger === "function" ? ref.trigger('before-leave') : void 0 : void 0) === false) {
            e.preventDefault();
            return;
          }

          return _this.trigger('before-page-visit', [(ref1 = e.originalEvent) != null ? ref1.data.url : void 0]);
        }).on('turbolinks:request-start', function (e) {
          var ref;
          return _this.trigger('page-request-start', [(ref = e.originalEvent) != null ? ref.data.xhr : void 0]);
        }).on('turbolinks:visit', function (e) {
          var ref;
          return _this.trigger('page-visit', [(ref = e.originalEvent) != null ? ref.data.url : void 0]);
        }).on('turbolinks:before-cache', function (e) {
          var ref;

          _this.trigger('before-page-cache', [_this.currentPage]);

          (0, _jquery.default)(_this.currentPage).find('[tao-id]').each(function (i, el) {
            if (typeof el.beforeCache === "function") {
              el.beforeCache();
            }

            return null;
          });

          if ((ref = _this.currentPage) != null) {
            if (typeof ref.beforeCache === "function") {
              ref.beforeCache();
            }
          }

          return window.currentPage = _this.currentPage = null;
        }).on('turbolinks:request-end', function (e) {
          var ref;
          return _this.trigger('page-request-end', [(ref = e.originalEvent) != null ? ref.data.xhr : void 0]);
        }).on('turbolinks:before-render', function (e) {
          var ref; // turbolinks render won't trigger patching of customElements polyfills

          if (customElements._internals) {
            customElements._internals.disconnectTree(document.body);
          }

          return _this.trigger('before-page-render', [(0, _jquery.default)((ref = e.originalEvent) != null ? ref.data.newBody : void 0)]);
        }).on('turbolinks:render', function (e) {
          // turbolinks render won't trigger patching of customElements polyfills
          if (customElements._internals) {
            customElements._internals.connectTree(document.body);
          }

          return _this.trigger('page-render', [(0, _jquery.default)('body > .tao-page')]);
        }).on('turbolinks:load', function (e) {
          var $page;
          $page = (0, _jquery.default)('body > .tao-page');

          if (!($page.length > 0)) {
            return;
          }

          _this._initGon();

          _this._initPage($page);

          return _this.trigger('page-load', [_this.currentPage]);
        });
      }
    }], [{
      key: "initializer",
      value: function initializer(name, callback) {
        return this._initializers[name] = callback;
      }
    }, {
      key: "removeInitializer",
      value: function removeInitializer(name) {
        return this._initializers[name] = null;
      }
    }]);

    return Application;
  }(_module.default);

  ;
  Application._initializers = {};
  return Application;
}();

exports.default = _default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(__webpack_require__(3));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page;

var _default = Page = function () {
  var Page =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Page, _Component);

    function Page() {
      _classCallCheck(this, Page);

      return _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).apply(this, arguments));
    }

    _createClass(Page, [{
      key: "beforeCache",
      value: function beforeCache() {}
    }]);

    return Page;
  }(_component.default);

  ;
  Page.attribute('layout', {
    default: 'default'
  });
  return Page;
}();

exports.default = _default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jquery = _interopRequireDefault(__webpack_require__(0));

var _lodash = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _default = {
  reflow: function reflow(el) {
    return (0, _jquery.default)(el)[0].offsetHeight;
  },
  findComponent: function findComponent(selectors, callback) {
    var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
    var components;

    if (!_lodash.default.isArray(selectors)) {
      selectors = [selectors];
    }

    components = _lodash.default.flatten(selectors.map(function (s) {
      return (0, _jquery.default)(scope).find(s).get();
    }));

    if (components.length > 0 && _lodash.default.isFunction(callback)) {
      this.componentReady(components, function () {
        return callback.apply(void 0, _toConsumableArray(components));
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
  componentReady: function componentReady(components, callback) {
    var promises;

    if (!_lodash.default.isArray(components)) {
      components = [components];
    }

    promises = components.map(function (el) {
      var deferred;
      deferred = _jquery.default.Deferred();

      if (el.connected) {
        setTimeout(function () {
          return deferred.resolve();
        });
      } else {
        el.on('tao:connected.taoReady', function (e) {
          if (e.target !== el) {
            return;
          }

          el.off('tao:connected.taoReady');
          return deferred.resolve();
        });
      }

      return deferred.promise();
    });
    return _jquery.default.when.apply($, _toConsumableArray(promises)).then(function () {
      return callback();
    });
  }
};
exports.default = _default;

/***/ })
/******/ ]);
});