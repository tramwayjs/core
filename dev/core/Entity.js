/**
 * @export
 * @class Entity
 */
export default class Entity {

    /**
     * Creates an instance of Entity.
     * 
     * @param {Object} obj
     * 
     * @memberOf Entity
     */
    constructor(obj) {

    }

    /**
     * @param {string} attribute
     * @returns {boolean}
     * 
     * @memberOf Entity
     */
    hasAttribute(attribute) {
        return attribute in this;
    }
    
    /**
     * @returns {string}
     * 
     * @memberOf Entity
     */
    serialize() {
        return JSON.stringify(this);
    }

    /**
     * @param {string} item
     * @returns {Entity}
     * 
     * @memberOf Entity
     */
    unserialize(item) {
        item = JSON.parse(item);
        for (var key in item) {
            this[key] = item[key];
        }
        return this;
    }
}