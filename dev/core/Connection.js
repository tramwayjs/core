import AbstractMethodError from './errors/AbstractMethodError';

/**
 * @abstract
 * @export
 * @class Connection
 */
export default class Connection {
    /**
     * Creates an instance of Connection.
     * 
     * @param {Object} params
     * 
     * @memberOf Connection
     */
    constructor(params) {
        
    }

    /**
     * @param {number|string} id
     * @param {function(Error, Object)} cb
     * 
     * @memberOf Connection
     */
    getItem(id, cb) {
        throw new AbstractMethodError();
    }

    /**
     * @param {string[] | number[]} ids
     * @param {function(Error, Object[])} cb
     * 
     * @memberOf Connection
     */
    getItems(ids, cb) {
        throw new AbstractMethodError();
    }

    /**
     * @param {function(Error, boolean)} cb
     * 
     * @memberOf Connection
     */
    getAllItems(cb) {
        throw new AbstractMethodError();
    }

    /**
     * @param {string | Object} conditions
     * @param {function(Error, Object[])} cb
     * 
     * @memberOf Connection
     */
    findItems(conditions, cb) {
        throw new AbstractMethodError();
    }

    /**
     * @param {number|string} id
     * @param {function(Error, boolean)} cb
     * 
     * @memberOf Connection
     */
    hasItem(id, cb) {
        throw new AbstractMethodError();
    }

    /**
     * @param { string[] | number[] } ids
     * @param {function(Error, boolean)} cb
     * 
     * @memberOf Connection
     */
    hasItems(ids, cb) {
        throw new AbstractMethodError();
    }

    /**
     * @param {string | Object} conditions
     * @param {function(Error, number)} cb
     * 
     * @memberOf Connection
     */
    countItems(conditions, cb) {
        throw new AbstractMethodError();
    }

    /**
     * @param {Object} item
     * @param {function(Error, Object)} cb
     * 
     * @memberOf Connection
     */
    createItem(item, cb) {
        throw new AbstractMethodError();
    }

    /**
     * @param {number|string} id
     * @param {Object} item
     * @param {function(Error, Object)} cb
     * 
     * @memberOf Connection
     */
    updateItem(id, item, cb) {
        throw new AbstractMethodError();
    }

    /**
     * @param {number|string} id
     * @param {function(Error, Object)} cb
     * 
     * @memberOf Connection
     */
    deleteItem(id, cb) {
        throw new AbstractMethodError();
    }

    /**
     * @param { number[] | string[]} id
     * @param {function(Error, Object[])} cb
     * 
     * @memberOf Connection
     */
    deleteItems(id, cb) {
        throw new AbstractMethodError();
    }

    /**
     * Recommended to use other functions first.
     * @param {string} query
     * @param {[] | Object} values
     * @param {function(Error, Object[])} cb
     * 
     * @memberOf Connection
     */
    query(query, values, cb) {
        throw new AbstractMethodError();
    }

}