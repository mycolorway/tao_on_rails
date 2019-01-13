import { getAttributeParser } from './attribute-parser';
import {
  dasherize, camelize, domReady, isFunction, componnetReady,
} from './utils';
import mergeMixins from './merge-mixins';

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
  const componentClass = class extends HTMLElement {
    static $count = 0;

    static $tag = tagName;

    static $tao = true;

    static observedAttributes = Object.keys(properties).reduce((acc, key) => {
      if (isFunction(properties[key].observer)) acc.push(dasherize(key));
      return acc;
    }, []);

    static register() {
      if (!this.$tag || !window.customElements) return;
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
        const attributeParser = getAttributeParser(property.type);

        Object.defineProperty(this, key, {
          configurable: true,
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
      });
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
      if (this.taoStatus === 'connected' || this.taoStatus === 'ready') {
        const property = this.properties[camelize(attributeName)];
        if (property && property.observer) {
          property.observer.call(this, newValue, oldValue);
        }
      }
    }

    connectedCallback() {
      domReady().then(() => {
        if (!this.initialized) {
          this.constructor.$count += 1;
          this.taoId = this.constructor.$count;
          this.init();
          this.initialized = true;
          this.namespacedTrigger('initialized');
        }

        this.connected();
        this.taoStatus = 'connected';
        this.namespacedTrigger('connected');
        this.childrenReady().then(() => {
          this.ready();
          this.taoStatus = 'ready';
          this.namespacedTrigger('ready');
        });
      });
    }

    disconnectedCallback() {
      domReady().then(() => {
        this.disconnected();
        this.taoStatus = null;
        this.namespacedTrigger('disconnected');
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

    namespacedTrigger(name, detail = null) {
      [`tao:${name}`, `${this.$tag}:${name}`].forEach((eventName) => {
        this.trigger(eventName, detail);
      });
    }

    trigger(name, detail = null) {
      this.dispatchEvent(new CustomEvent(name, {
        detail,
        cancelable: true,
      }));
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
