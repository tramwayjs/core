"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @export
 * @class AbstractMethodError
 * @extends {Error}
 */
class AbstractMethodError extends Error {
  /**
   * Creates an instance of AbstractMethodError.
   *
   * @memberOf AbstractMethodError
   */
  constructor() {
    super("Please implement concrete method.");
  }

}

exports.default = AbstractMethodError;