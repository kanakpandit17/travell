/* eslint-disable no-magic-numbers */
const Joi = require('joi');
const createNamespace = require('../src');

describe('createNamespace', () => {
  let namespace;
  let nextId = 1;

  beforeEach(() => {
    namespace = `ns-${nextId++}`;
  });

  describe('validation', () => {
    test('should throw an error if namespace not provided', () => {
      expect(() => createNamespace()).toThrow('namespace is required');
    });

    test('should throw an error if namespace is not a string', () => {
      expect(() => createNamespace({})).toThrow('namespace must be a string');
    });

    test('should throw an error if duplicated namespace', () => {
      createNamespace(namespace);
      expect(() => createNamespace(namespace)).toThrow(`namespace "${namespace}" is already defined`);
    });

    test('should throw an error if type not provided', () => {
      const ns = createNamespace(namespace);
      expect(() => ns.createAction()).toThrow('type is required');
    });

    test('should throw an error if type is not a string', () => {
      const ns = createNamespace(namespace);
      expect(() => ns.createAction({})).toThrow('type must be a string');
    });

    test('should throw an error if argNames not provided', () => {
      const ns = createNamespace(namespace);
      expect(() => ns.createAction('a')).toThrow('argNames is required');
    });

    test('should throw an error if argNames is not an array', () => {
      const ns = createNamespace(namespace);
      expect(() => ns.createAction('a', {})).toThrow('argNames must be an array');
    });

    test('should throw an error if schema not provided', () => {
      const ns = createNamespace(namespace);
      expect(() => ns.createAction('a', [])).toThrow('schema is required');
    });

    test('should throw an error if schema is not an object', () => {
      const ns = createNamespace(namespace);
      expect(() => ns.createAction('a', [], [])).toThrow('schema must be an object');
    });

    test('should throw an error if duplicated type', () => {
      const ns = createNamespace(namespace);
      ns.createAction('a', [], {});
      expect(() => ns.createAction('a', [], {})).toThrow(`type "a" is already defined in namespace "${namespace}"`);
    });

    test('should throw an error if transform is not a function', () => {
      const ns = createNamespace(namespace);
      expect(() => ns.createAction('a', [], {}, 123)).toThrow('transform must be a function');
    });
  });

  describe('functional', () => {
    test('should fail Joi validation', () => {
      namespace = 'JOI';
      const ns = createNamespace(namespace);
      const action = ns.createAction('ACTION', ['a', 'b'], {a: Joi.number().required(), b: Joi.number().required()});
      expect(() => action(1, 'a')).toThrow('Validation failed for: "JOI/ACTION"');
    });

    test('should create an action', () => {
      namespace = 'VALID';
      const ns = createNamespace(namespace);
      const action = ns.createAction('ACTION', ['a', 'b'], {a: Joi.number().required(), b: Joi.number().required()});
      const result = action(1, 2);
      expect(result).toEqual({
        type: 'VALID/ACTION',
        payload: {a: 1, b: 2},
      });
    });

    test('toString() should return a type', () => {
      namespace = 'CHECK_TYPE';
      const ns = createNamespace(namespace);
      const action = ns.createAction('ACTION', [], {});
      expect(action.toString()).toBe('CHECK_TYPE/ACTION');
    });

    test('transform action', () => {
      const transform = jest.fn(() => 'foo');
      const ns = createNamespace(namespace);
      const action = ns.createAction('ACTION', ['a', 'b'],
        {a: Joi.number().required(), b: Joi.number().required()}, transform);
      expect(action(1, 2)).toBe('foo');
    });
  });
});
