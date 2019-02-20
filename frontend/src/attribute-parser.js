const parsers = new WeakMap();

export function getAttributeParser(type) {
  return parsers.get(type);
}

export function registerAttributeParser(type, parser) {
  parsers.set(type, parsers.get(parser) || parser);
  return parser;
}

registerAttributeParser(String, {
  parse(value, { defaultValue = '' } = {}) {
    return value || defaultValue;
  },
  stringify(value) {
    return value.toString();
  },
});

registerAttributeParser(Number, {
  parse(value, { defaultValue = 0 } = {}) {
    const number = Number(value);
    return value === null || Number.isNaN(number) ? defaultValue : number;
  },
  stringify(value) {
    return value.toString();
  },
});

registerAttributeParser(Boolean, {
  parse(value) {
    if (value === '') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    return !!value;
  },
  stringify(value) {
    return value.toString();
  },
});

registerAttributeParser(Object, {
  parse(value, { defaultValue = null } = {}) {
    if (value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return defaultValue;
      }
    } else {
      return defaultValue;
    }
  },
  stringify(value) {
    try {
      return JSON.stringify(value);
    } catch (e) {
      return null;
    }
  },
});
registerAttributeParser(Array, Object);
