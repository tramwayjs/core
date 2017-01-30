const assert = require('assert');
const utils = require('tramway-core-testsuite');
const lib = require('../index.js');
var describeCoreClass = utils.describeCoreClass;

describe("Simple acceptance tests to ensure library returns what's promised.", function(){
    describe("Should return a proper 'Router' class", describeCoreClass(
        lib.Router, 
        "Router", 
        ["buildPath", "buildQuery"],
        ["initialize", "prepareRoute", "useMethod", "preparePath", "prepareArguments"]
    ));

    describe("Should return a proper 'Connection' class", describeCoreClass(
        lib.Connection, 
        "Connection", 
        [],
        ["getItem", "getItems", "getAllItems", "findItems", "hasItem", "hasItems", "countItems", "createItem", "updateItem", "deleteItem", "deleteItems", "query"]
    ));

    describe("Should return a proper 'Controller' class", describeCoreClass(
        lib.Controller, 
        "Controller", 
        ["index"],
        ["getRouter", "redirect"]
    ));

    describe("Should return a proper 'Entity' class", describeCoreClass(
        lib.Entity, 
        "Entity", 
        [],
        ["hasAttribute", "serialize", "unserialize"]
    ));

    describe("Should return a proper 'Model' class", describeCoreClass(
        lib.Model, 
        "Model", 
        [],
        ["getId", "setId", "updateEntity", "exists", "get", "getAll", "create", "update", "delete", "find", "getMany", "count"]     
    ));

    describe("Should return an object for errors.", function(){
        it("Should return an object for errors.", function(){
            assert.strictEqual(typeof lib.errors, "object");
        });

        it("There should be the same errors as in the previous version", function(){
            assert.deepEqual(Object.keys(lib.errors), ["AbstractMethodError", "WrongTypeError"]);
        });

        describe("Should return a proper 'WrongTypeError' class", describeCoreClass(
            lib.errors.WrongTypeError, 
            "WrongTypeError", 
            [],
            []     
        ));

        describe("Should return a proper 'AbstractMethodError' class", describeCoreClass(
            lib.errors.AbstractMethodError, 
            "AbstractMethodError", 
            [],
            []     
        ));
    });
    describe("Should return an object for controllers.", function(){
        it("Should return an object for controllers.", function(){
            assert.strictEqual(typeof lib.controllers, "object");
        });

        it("There should the same number of controllers types as the previous version", function(){
            assert.strictEqual(Object.keys(lib.controllers).length, 1);
        });

        describe("Should return a consistent 'RestfulController' class.", describeCoreClass(
            lib.controllers.RestfulController, 
            "RestfulController", 
            ['get', 'getAll', 'create', 'update', 'delete'],
            []
        ));
    });
    describe("Should return an object for policies.", function(){
        it("Should return an object for policies.", function(){
            assert.strictEqual(typeof lib.policies, "object");
        });

        it("There should the same number of policies types as the previous version", function(){
            assert.strictEqual(Object.keys(lib.policies).length, 1);
        });

        describe("Should return a proper 'AuthenticationStrategy' class", describeCoreClass(
            lib.policies.AuthenticationStrategy, 
            "AuthenticationStrategy", 
            [],
            ["login", "logout", "check", "getRedirectRoute"]
        ));
    });
    describe("Should return an object for services.", function(){
        it("Should return an object for services.", function(){
            assert.strictEqual(typeof lib.services, "object");
        });

        it("There should the same number of services types as the previous version", function(){
            assert.strictEqual(Object.keys(lib.services).length, 1);
        });

        describe("Should return a proper 'TypeEnforcementService' class", describeCoreClass(
            lib.services.TypeEnforcementService, 
            "TypeEnforcementService", 
            ["enforceTypes", "enforceInstance"],
            []     
        ));
    });
});