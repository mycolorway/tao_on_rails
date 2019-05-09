export function camelize(str, capitalize = false) {
  const result = str.trim()
    .replace(/[-_\s]+(.)?/g, (match, c) => (c ? c.toUpperCase() : ''));

  return capitalize ? result : (result.charAt(0).toLowerCase() + result.slice(1));
}

export function dasherize(str) {
  return str.trim().replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
}

export function isFunction(obj) {
  return typeof obj === 'function';
}

export function isPlainObject(object) {
  return object.toString() === '[object Object]';
}

export function domReady() {
  return new Promise((resolve) => {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      resolve();
    } else {
      document.addEventListener('DOMContentLoaded', resolve, {
        once: true,
      });
    }
  });
}

export function componnetReady(el) {
  return new Promise((resolve) => {
    if (el.taoStatus === 'ready') {
      resolve();
    } else {
      el.addEventListener('tao:ready', resolve, {
        once: true,
      });
    }
  });
}

export function componnetConnected(el) {
  return new Promise((resolve) => {
    if (el.taoStatus === 'connected' || el.taoStatus === 'ready') {
      resolve();
    } else {
      el.addEventListener('tao:connected', resolve, {
        once: true,
      });
    }
  });
}
