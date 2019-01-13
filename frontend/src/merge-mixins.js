const LIFECYCLE_METHODS = 'created init connected ready disconnected'.split(' ');

function mergeData(data1, data2) {
  return Object.assign({}, data1, data2);
}

function mergeLifecycleMethod(method1, method2) {
  if (!method1) {
    return method2;
  }
  if (!method2) {
    return method1;
  }

  return function mergedMethod(...args) {
    method1.apply(this, args);
    method2.apply(this, args);
  };
}

function normalizeProperties(properties) {
  return Object.keys(properties).reduce((acc, key) => {
    acc[key] = properties[key].type ? properties[key] : {
      type: properties[key],
    };
    return acc;
  }, {});
}

function mergeMixin(options, mixin) {
  const result = {};
  Object.keys(mixin).forEach((key) => {
    if (key === 'properties') {
      result.properties = normalizeProperties(mergeData(mixin.properties, options.properties));
    } else if (LIFECYCLE_METHODS.indexOf(key) > -1) {
      result[key] = mergeLifecycleMethod(mixin[key], options[key]);
    } else {
      result[key] = options[key] || mixin[key];
    }
  });

  return Object.assign({}, options, result);
}

export default function mergeMixins({ extends: parentComponents = [], mixins = [], ...options }) {
  let result = options;

  parentComponents.forEach((component) => {
    if (component.$tao && component.$options) {
      result = mergeMixin(result, mergeMixins(component.$options));
    }
  });

  mixins.forEach((mixin) => {
    result = mergeMixin(result, mergeMixins(mixin));
  });

  return result;
}
