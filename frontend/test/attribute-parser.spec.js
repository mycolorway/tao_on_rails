import { getAttributeParser } from '../src/attribute-parser';

describe('attribute parser', () => {
  it('parse string attribute', () => {
    const parser = getAttributeParser(String);

    expect(parser.parse('test')).toBe('test');
    expect(parser.parse(null, { defaultValue: 'test' })).toBe('test');
    expect(parser.stringify('test')).toBe('test');
  });

  it('parse number attribute', () => {
    const parser = getAttributeParser(Number);

    expect(parser.parse('1')).toBe(1);
    expect(parser.parse(null)).toBe(0);
    expect(parser.parse('test', { defaultValue: 1 })).toBe(1);
    expect(parser.stringify(1)).toBe('1');
  });

  it('parse boolean attribute', () => {
    const parser = getAttributeParser(Boolean);

    expect(parser.parse('')).toBe(true);
    expect(parser.parse('false')).toBe(false);
    expect(parser.parse(null)).toBe(false);
    expect(parser.parse('1')).toBe(true);
    expect(parser.stringify(true)).toBe('true');
    expect(parser.stringify(false)).toBe('false');
  });


  it('parse object/array attribute', () => {
    const parser = getAttributeParser(Array);

    expect(parser.parse('{"x": 1}')).toEqual({ x: 1 });
    expect(parser.parse('test', { defaultValue: { x: 1 } })).toEqual({ x: 1 });
    expect(parser.parse('[1,2,3]')).toEqual([1, 2, 3]);
    expect(parser.parse('test', { defaultValue: [1, 2, 3] })).toEqual([1, 2, 3]);
    expect(parser.stringify({ x: 1 })).toBe('{"x":1}');
    expect(parser.stringify([1, 2, 3])).toBe('[1,2,3]');
  });
});
