import Connection from './Connection';
import Entity from './Entity';
import TypeEnforcementService from './services/TypeEnforcementService';
import AbstractMethodError from './errors/AbstractMethodError';

/**
 * @export
 * @class Model
 */
export default class Model {
    /**
     * Creates an instance of Model.
     * 
     * @param {Connection} connection
     * @param {Entity} entity
     * 
     * @memberOf Model
     */
    constructor(connection, entity) {
        this.connection = TypeEnforcementService.enforceInstance(connection, Connection);
        this.entity = TypeEnforcementService.enforceInstance(entity, Entity);
    }

    /**
     * @abstract
     * @memberOf Model
     */
    getId() {
        throw new AbstractMethodError();
    }

    /**
     * @abstract
     * @params {number|string|[]} value
     * @memberOf Model
     */
    setId(value) {
        throw new AbstractMethodError();
    }


    /**
     * @param {Object} item
     * @returns {Model}
     * 
     * @memberOf Model
     */
    updateEntity(item) {
        this.entity = new this.entity.constructor(item);
        return this;
    }

    /**
     * @param {function(Error, boolean)} cb
     * @returns
     * 
     * @memberOf Model
     */
    exists(cb) {
        return this.connection.hasItem(this.getId(), cb);
    }

    /**
     * @param {function(Error, Object)} cb
     * @returns
     * 
     * @memberOf Model
     */
    get(cb) {
        return this.connection.getItem(this.getId(), cb);
    }

    /**
     * @param {function(Error, Object)} cb
     * @returns
     * 
     * @memberOf Model
     */
    getAll(cb) {
        return this.connection.getAllItems(cb);
    }

    /**
     * @param {function(Error, Object)} cb
     * @returns
     * 
     * @memberOf Model
     */
    create(cb) {
        return this.connection.createItem(this.entity, cb);
    }

    /**
     * @param {function(Error, Object)} cb
     * @returns
     * 
     * @memberOf Model
     */
    update(cb) {
        return this.connection.updateItem(this.getId(), this.entity, cb);
    }

    /**
     * @param {function(Error, Object)} cb
     * @returns
     * 
     * @memberOf Model
     */
    delete(cb) {
        return this.connection.deleteItem(this.getId(), cb);
    }

    /**
     * @param {string | Object} conditions
     * @param {function(Error, Object[]} cb
     * @returns
     * 
     * @memberOf Model
     */
    find(conditions, cb) {
        return this.connection.findItems(conditions, cb);
    }

    /**
     * @param {number[] | stringp[]} ids
     * @param {function(Error, Object[]} cb
     * @returns
     * 
     * @memberOf Model
     */
    getMany(ids, cb) {
        return this.connection.getItems(ids, cb);
    }

    /**
     * @param {string | Object} conditions
     * @param {function(Error, number)} cb
     * 
     * @memberOf Model
     */
    count(conditions, cb) {
        this.connection.countItems(conditions, cb);
    }
}