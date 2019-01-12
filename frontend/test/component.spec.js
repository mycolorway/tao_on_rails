import { Component } from '../src/index';
import { componnetReady } from '../src/utils';

describe('component', () => {
  let component;
  let hooks = {};

  beforeAll(() => {
    hooks = {
      nameObserver: jasmine.createSpy(),
      created: jasmine.createSpy(),
      init: jasmine.createSpy(),
      connected: jasmine.createSpy(),
      ready: jasmine.createSpy(),
      disconnected: jasmine.createSpy(),
    };
    Component('test-component', {
      mixins: [{
        properties: {
          fullName: {
            type: String,
            observer: hooks.nameObserver,
          },
          age: Number,
        },
        ready: hooks.ready,
        disconnected: hooks.disconnected,
      }],
      properties: {
        active: Boolean,
        json: {
          type: Object,
          default: { x: 1 },
        },
        array: Array,
      },
      created: hooks.created,
      init: hooks.init,
      connected: hooks.connected,
    });
  });

  beforeEach(async () => {
    component = document.createElement('test-component');
    component.setAttribute('array', '[1,2]');
    document.body.appendChild(component);
    await componnetReady(component);
  });

  afterEach(() => {
    Object.keys(hooks).forEach((hookName) => {
      hooks[hookName].calls.reset();
    });
    if (component.parentNode) component.parentNode.removeChild(component);
    component = null;
  });

  it('inherits from HTMLElement', () => {
    expect(component instanceof HTMLElement).toBe(true);
  });

  it('parses attributes', () => {
    expect(component.fullName).toBe('');
    expect(component.hasAttribute('full-name')).toBe(false);

    component.fullName = 'farthinker';

    expect(component.fullName).toBe('farthinker');
    expect(component.getAttribute('full-name')).toBe('farthinker');
    expect(hooks.nameObserver).toHaveBeenCalledWith('farthinker', null);

    expect(component.active).toBe(false);
    expect(component.hasAttribute('active')).toBe(false);
    component.active = true;

    expect(component.active).toBe(true);
    expect(component.hasAttribute('active')).toBe(true);


    expect(component.json).toEqual({ x: 1 });
    component.json = { y: 2 };

    expect(component.json).toEqual({ y: 2 });
    expect(component.getAttribute('json')).toBe('{"y":2}');

    expect(component.array).toEqual([1, 2]);
    component.array = [1, 2, 3];

    expect(component.array).toEqual([1, 2, 3]);
    expect(component.getAttribute('array')).toBe('[1,2,3]');
  });

  it('call lifecycle hooks', (done) => {
    expect(hooks.created).toHaveBeenCalledBefore(hooks.init);
    expect(hooks.init).toHaveBeenCalledBefore(hooks.connected);
    expect(hooks.connected).toHaveBeenCalledBefore(hooks.ready);
    expect(hooks.ready).toHaveBeenCalledWith();

    component.parentNode.removeChild(component);
    setTimeout(() => {
      expect(hooks.disconnected).toHaveBeenCalledWith();
      done();
    });
  });
});
