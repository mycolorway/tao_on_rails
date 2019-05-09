import { Component } from '../src/index';
import { componnetReady } from '../src/utils';

describe('component', () => {
  let component;
  let hooks = {};

  beforeAll(() => {
    hooks = {
      nameObserver: jasmine.createSpy('nameObserver'),
      activeObserver: jasmine.createSpy('activeObserver'),
      created: jasmine.createSpy('created'),
      init: jasmine.createSpy('init'),
      connected: jasmine.createSpy('connected'),
      ready: jasmine.createSpy('ready'),
      disconnected: jasmine.createSpy('disconnected'),
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
        active: {
          type: Boolean,
          observer: '_activeChanged',
        },
        json: {
          type: Object,
          default: { x: 1 },
        },
        array: Array,
        customProp: {
          get() {
            return `${this.fullName}_${this.age}`;
          },
        },
        notAttribute: {
          type: Boolean,
          syncAttribute: false,
          default: false,
        },
      },
      created: hooks.created,
      init: hooks.init,
      connected: hooks.connected,
      _activeChanged: hooks.activeObserver,
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
    expect(hooks.nameObserver).toHaveBeenCalledWith('farthinker', '');

    expect(component.active).toBe(false);
    expect(component.hasAttribute('active')).toBe(false);
    component.active = true;

    expect(component.active).toBe(true);
    expect(component.hasAttribute('active')).toBe(true);
    expect(hooks.activeObserver).toHaveBeenCalledWith(true, false);

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

  it('call ready hook after all child component are ready', async () => {
    hooks.ready.calls.reset();
    const parentComponent = document.createElement('test-component');
    const childComponent = document.createElement('test-component');
    parentComponent.fullName = 'parent';
    childComponent.fullName = 'child';
    parentComponent.appendChild(childComponent);
    document.body.appendChild(parentComponent);
    await componnetReady(parentComponent);

    expect(hooks.ready).toHaveBeenCalledTimes(2);
    expect(hooks.ready.calls.first().object).toBe(childComponent);
    expect(hooks.ready.calls.mostRecent().object).toBe(parentComponent);
  });

  it('could has custom properties', () => {
    component.fullName = 'farthinker';
    component.age = 18;

    expect(component.customProp).toBe('farthinker_18');
  });

  it('could has independent properties', () => {
    expect(component.notAttribute).toBe(false);
    component.notAttribute = true;

    expect(component.notAttribute).toBe(true);
    expect(component.hasAttribute('not-attribute')).toBe(false);
  });
});
