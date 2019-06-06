import { getAttributeParser } from './attribute-parser';
import {
  dasherize, camelize, domReady, isFunction, componnetReady,
} from './utils';
import mergeMixins from './merge-mixins';

let componentCount = 0;

function generateComponentClass(tagName, options = {}) {
  const {
    properties = {},
    created,
    init,
    connected,
    ready,
    disconnected,
    ...customOptions
  } = options;
  const componentClass = class extends window.HTMLElement {
    static $tag = tagName;

    static $tao = true;

    static observedAttributes = Object.keys(properties).reduce((acc, key) => {
      const { observer } = properties[key];
      if (isFunction(observer) || typeof observer === 'string') acc.push(dasherize(key));
      return acc;
    }, []);

    static register() {
      if (!this.$tag || !window.customElements || customElements.get(this.$tag)) return;
      customElements.define(this.$tag, this);
    }

    $props = Object.assign({}, properties, {
      taoId: { type: String },
    });

    get properties() {
      return this.$props;
    }

    set properties(value) {
      this.$props = value;
    }

    get $tag() {
      return this.constructor.$tag;
    }

    constructor() {
      super();
      this.created();
    }

    created() {
      this.initProperties();
      if (isFunction(created)) created.call(this);
    }

    init() {
      if (isFunction(init)) init.call(this);
    }

    connected() {
      if (isFunction(connected)) connected.call(this);
    }

    ready() {
      if (isFunction(ready)) ready.call(this);
    }

    disconnected() {
      if (isFunction(disconnected)) disconnected.call(this);
    }

    initProperties() {
      Object.keys(this.properties).forEach((key) => {
        const property = this.properties[key];
        const attributeName = dasherize(key);

        if (isFunction(property.get) || isFunction(property.set)) {
          Object.defineProperty(this, key, {
            configurable: true,
            enumerable: true,
            get: property.get,
            set: property.set,
          });
        } else if (property.syncAttribute === false) {
          Object.defineProperty(this, key, {
            configurable: true,
            enumerable: true,
            value: property.default,
            writable: true,
          });
        } else if (property.type) {
          const attributeParser = getAttributeParser(property.type);
          Object.defineProperty(this, key, {
            configurable: true,
            enumerable: true,
            get() {
              if (property.type === Boolean) {
                return this.hasAttribute(attributeName);
              }
              return attributeParser.parse(this.getAttribute(attributeName), {
                defaultValue: property.default,
              });
            },
            set(value) {
              if (property.type === Boolean) {
                if (value) {
                  this.setAttribute(attributeName, '');
                } else {
                  this.removeAttribute(attributeName);
                }
              } else {
                this.setAttribute(attributeName, attributeParser.stringify(value));
              }
            },
          });
        }
      });
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
      if (this.taoStatus === 'connected' || this.taoStatus === 'ready') {
        const property = this.properties[camelize(attributeName)];
        if (property && property.observer) {
          const attributeParser = getAttributeParser(property.type);
          const parsedNewValue = attributeParser.parse(newValue, {
            defaultValue: property.default,
          });
          const parsedOldValue = attributeParser.parse(oldValue, {
            defaultValue: property.default,
          });
          if (isFunction(property.observer)) {
            property.observer.call(this, parsedNewValue, parsedOldValue);
          } else if (typeof property.observer === 'string' && isFunction(this[property.observer])) {
            this[property.observer].call(this, parsedNewValue, parsedOldValue);
          }
        }
      }
    }

    connectedCallback() {
      domReady().then(() => {
        if (!this.initialized) {
          componentCount += 1;
          this.taoId = componentCount;
          this.init();
          this.initialized = true;
          this.namespacedTrigger('initialized');
        }

        this.connected();
        this.taoStatus = 'connected';
        this.namespacedTrigger('connected');
        this.childrenReady().then(() => {
          if (this.taoStatus === 'connected') { // make sure current status is still connected
            this.ready();
            this.taoStatus = 'ready';
            this.namespacedTrigger('ready');
          }
        });
      });
    }

    disconnectedCallback() {
      domReady().then(() => {
        if (this.taoStatus === 'connected' || this.taoStatus === 'ready') {
          this.disconnected();
          this.childrenDisconnected();
          this.taoStatus = null;
          this.namespacedTrigger('disconnected');
        }
      });
    }

    childrenReady() {
      const promises = [];
      this.querySelectorAll('*').forEach((el) => {
        if (customElements.get(el.tagName.toLowerCase())) {
          promises.push(componnetReady(el));
        }
      });
      return Promise.all(promises);
    }

    childrenDisconnected() {
      this.querySelectorAll('[tao-id]').forEach((el) => {
        if (el.taoStatus === 'connected' || el.taoStatus === 'ready') {
          el.disconnected();
          // eslint-disable-next-line no-param-reassign
          el.taoStatus = null;
          el.namespacedTrigger('disconnected');
        }
      });
    }

    namespacedTrigger(name, params = {}) {
      [`tao:${name}`, `${this.$tag}:${name}`].forEach((eventName) => {
        this.trigger(eventName, params);
      });
    }

    trigger(name, params = {}) {
      this.dispatchEvent(new CustomEvent(name, Object.assign({
        cancelable: true,
      }, params)));
    }
  };

  Object.assign(componentClass.prototype, customOptions);
  componentClass.$options = options;
  return componentClass;
}

export default function (tagName, options = {}) {
  const componentClass = generateComponentClass(tagName, mergeMixins(options));
  componentClass.register();
  return componentClass;
}
