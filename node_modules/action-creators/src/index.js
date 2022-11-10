const createDebug = require('debug');
const Joi = require('joi');

const usedNamespaces = {};
const usedTypes = {};

/**
 * Check if object
 * @param {*} a
 * @returns {boolean}
 * @private
 */
function _isObject(a) {
  return !!a && (a.constructor === Object);
}

/**
 * Create a new namespace
 * @param {String} namespace
 * @returns {{createAction: Function}}
 */
function createNamespace(namespace) {
  if (namespace == null) {
    throw new Error('namespace is required');
  }
  if (typeof namespace !== 'string') {
    throw new Error('namespace must be a string');
  }
  if (usedNamespaces[namespace]) {
    throw new Error(`namespace "${namespace}" is already defined`);
  }
  usedNamespaces[namespace] = true;

  const debug = createDebug(`ac:${namespace}`);

  /**
   * Create an action
   * @param {String} type the action type
   * @param {Array} argNames the arguments names
   * @param {Object} schema the joi schema
   * @param {Function} transform the function to transform the created action
   * @returns {Function}
   */
  function createAction(type, argNames, schema, transform) {
    const fullType = `${namespace}/${type}`;
    if (type == null) {
      throw new Error('type is required');
    }
    if (typeof type !== 'string') {
      throw new Error('type must be a string');
    }
    if (usedTypes[fullType]) {
      throw new Error(`type "${type}" is already defined in namespace "${namespace}"`);
    }
    if (argNames == null) {
      throw new Error('argNames is required');
    }
    if (!Array.isArray(argNames)) {
      throw new Error('argNames must be an array');
    }
    if (schema == null) {
      throw new Error('schema is required');
    }
    if (!_isObject(schema)) {
      throw new Error('schema must be an object');
    }
    if (transform != null && typeof transform !== 'function') {
      throw new Error('transform must be a function');
    }
    usedTypes[fullType] = true;

    // eslint-disable-next-line require-jsdoc
    function actionCreator(...args) {
      const payload = {};
      argNames.forEach((argName, i) => {
        payload[argName] = args[i];
      });
      debug(type, payload);
      Joi.assert(payload, schema, `Validation failed for: "${fullType}"`);
      const action = {
        type: fullType,
        payload,
      };
      if (transform) {
        const transformed = transform(action);
        debug(type, 'transformed', transformed);
        return transformed;
      }
      return action;
    }

    actionCreator.toString = () => fullType;
    return actionCreator;
  }

  return {
    createAction,
  };
}

module.exports = createNamespace;
