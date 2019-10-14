"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @export
 * @class WrongTypeError
 * @extends {Error}
 */
class WrongTypeError extends Error {
  /**
   * @param  {string} expectedType
   * @param  {string} gotType
   * @memberOf WrongTypeError
   */
  constructor(expectedType, gotType) {
    super(`The wrong type was passed. Expected type '${expectedType}'${gotType ? ` but got type '${gotType}'` : ''}`);
  }

}

exports.default = WrongTypeError;