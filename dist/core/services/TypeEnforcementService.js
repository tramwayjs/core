"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _WrongTypeError = _interopRequireDefault(require("../errors/WrongTypeError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TypeEnforcementService {
  /**
   * @static
   * @param {any} value
   * @param {Set<string>|string[]|string} types
   * @param {function(value): value} errorHandler
   * @returns {any}
   * 
   * @memberOf TypeEnforcementService
   */
  static enforceTypes(value, types, errorHandler) {
    if ("string" === typeof types) {
      types = [types];
    }

    if (types instanceof Array) {
      types = new Set(types);
    }

    if (!types.has(typeof value)) {
      if ("function" === typeof errorHandler) {
        return errorHandler(value);
      }

      throw new _WrongTypeError.default([...types].join(' or, '), typeof value);
    }

    return value;
  }
  /** 
   * @static
   * @param {any} value
   * @param {Object} expectedClass
   * @param {function(value): value} errorHandler
   * @returns
   * 
   * @memberOf TypeEnforcementService
   */


  static enforceInstance(value, expectedClass, errorHandler) {
    if (!value instanceof expectedClass) {
      if ("function" === typeof errorHandler) {
        return errorHandler(value);
      }

      throw new _WrongTypeError.default(expectedClass.name, typeof value);
    }

    return value;
  }

}

exports.default = TypeEnforcementService;