import mergeMixins from '../src/merge-mixins';

describe('merge mixins module', () => {
  it('merge mixins into options', () => {
    const readyCalls = [];
    const mixin3 = {
      properties: {
        x: 'x3',
      },
      ready() {
        readyCalls.push(`${this}3`);
      },
      customProperty: 'test3',
    };
    const mixin1 = {
      mixins: [mixin3],
      properties: {
        x: 'x1',
        z: 'z1',
      },
      ready() {
        readyCalls.push(`${this}1`);
      },
      customProperty: 'test1',
    };
    const mixin2 = {
      properties: {
        x: 'x2',
        z: 'z2',
      },
      ready() {
        readyCalls.push(`${this}2`);
      },
      customProperty: 'test2',
    };

    const options = {
      mixins: [mixin1, mixin2],
      properties: {
        x: 'x',
        y: 'y',
      },
      ready() {
        readyCalls.push(this);
      },
      customProperty: 'test',
    };

    const mergedOptions = mergeMixins(options);

    expect(mergedOptions.mixins).toBeUndefined();
    expect(mergedOptions.properties).toEqual({
      x: { type: 'x' },
      y: { type: 'y' },
      z: { type: 'z1' },
    });

    expect(mergedOptions.customProperty).toBe('test');
    mergedOptions.ready.call('ready');

    expect(readyCalls).toEqual(['ready2', 'ready3', 'ready1', 'ready']);
  });
});
