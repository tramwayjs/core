/**
 * @export
 * @class WrongTypeError
 * @extends {Error}
 */
export default class WrongTypeError extends Error {

    /**
     * @param  {string} expectedType
     * @param  {string} gotType
     * @memberOf WrongTypeError
     */
    constructor(expectedType, gotType) {
        super(`The wrong type was passed. Expected type '${expectedType}'${gotType ? ` but got type '${gotType}'`: ''}`);
    }
}