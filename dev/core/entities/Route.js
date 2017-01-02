import Entity from '../Entity';
import AuthenticationStrategy from '../policies/AuthenticationStrategy';
import TypeEnforcementService from '../services/TypeEnforcementService';

/**
 * @export
 * @class Route
 * @extends {Entity}
 */
export default class Route extends Entity {
    /**
     * Creates an instance of Route.
     * 
     * @param {Object} route
     * 
     * @memberOf Route
     */
    constructor(route) {
        super();
        this.setPath(route.path)
            .setArguments(route.arguments)
            .setMethods(route.methods)
            .setController(route.controller)
            .setPolicy(route.policy);
    }

    /**
     * @returns {string}
     * 
     * @memberOf Route
     */
    getPath() {
        return this.path;
    }

    /**
     * @param {string} path
     * @returns {Route}
     * 
     * @memberOf Route
     */
    setPath(path) {
        this.path = TypeEnforcementService.enforceTypes(path, "string", path => "");
        return this;
    }

    /**
     * @returns {string[]}
     * 
     * @memberOf Route
     */
    getArguments() {
        return this.arguments;
    }

    /**
     * @param {string[]} args
     * @returns {Route}
     * 
     * @memberOf Route
     */
    setArguments(args) {
        this.arguments = args || "";
        return this;
    }

    /**
     * @returns {string[]}
     * 
     * @memberOf Route
     */
    getMethods() {
        return this.methods;
    }

    /**
     * @param {string[]} methods
     * @returns {Route}
     * 
     * @memberOf Route
     */
    setMethods(methods) {
        this.methods = methods || ['get'];
        return this;
    }

    /**
     * @returns {Function(res, req)}
     * 
     * @memberOf Route
     */
    getController() {
        return this.controller;
    }

    /**
     * @param {Function(res, req)} controller
     * @returns {Route}
     * 
     * @memberOf Route
     */
    setController(controller) {
        this.controller = controller || null;
        return this;
    }

    /**
     * @returns {AuthenticationStrategy|null}
     * 
     * @memberOf Route
     */
    getPolicy() {
        return this.policy;
    }

    /**
     * @param {AuthenticationStrategy} policy
     * @returns {Route}
     * 
     * @memberOf Route
     */
    setPolicy(policy) {
        this.policy = TypeEnforcementService.enforceInstance(policy, AuthenticationStrategy, policy => null);
        return this;
    }

}