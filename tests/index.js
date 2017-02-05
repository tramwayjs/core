const assert = require('assert');
const utils = require('tramway-core-testsuite');
const lib = require('../index.js');
var describeCoreClass = utils.describeCoreClass;
var describeFunction = utils.describeFunction;

describe("Simple acceptance tests to ensure library returns what's promised.", function(){
    describe("Should return a proper 'Router' class", describeCoreClass(
        lib.Router, 
        "Router", 
        ["buildPath", "buildQuery"],
        ["initialize", "prepareRoute", "useMethod", "preparePath", "prepareArguments"],
        function(testClass, testInstance, classFunctions, instanceFunctions) {
            describe("The 'buildPath' function should have the same signature", describeFunction(
                testClass["buildPath"], 
                []
            ));
            describe("The 'buildQuery' function should have the same signature", describeFunction(
                testClass["buildQuery"], 
                ["params"]
            ));
            describe("The 'initialize' function should have the same signature", describeFunction(
                testInstance["initialize"], 
                []
            ));
            describe("The 'prepareRoute' function should have the same signature", describeFunction(
                testInstance["prepareRoute"], 
                ["route"]
            ));
            describe("The 'useMethod' function should have the same signature", describeFunction(
                testInstance["useMethod"], 
                ["method", "path", "cb"]
            ));
            describe("The 'preparePath' function should have the same signature", describeFunction(
                testInstance["preparePath"], 
                ["route"]
            ));
            describe("The 'prepareArguments' function should have the same signature", describeFunction(
                testInstance["prepareArguments"], 
                ["params"]
            ));
        }
    ));

    describe("Should return a proper 'Connection' class", describeCoreClass(
        lib.Connection, 
        "Connection", 
        [],
        ["getItem", "getItems", "getAllItems", "findItems", "hasItem", "hasItems", "countItems", "createItem", "updateItem", "deleteItem", "deleteItems", "query"],
        function(testClass, testInstance, classFunctions, instanceFunctions) {
            instanceFunctions.forEach(function(func){
                var args = [];

                switch(func) {
                    case "getItems": 
                    case "hasItems": args = ["ids", "cb"]; break;
                    case "countItems":
                    case "findItems": args = ["conditions", "cb"]; break;
                    case "getAllItems": args = ["cb"]; break;
                    case "createItem": args = ["item", "cb"]; break;
                    case "updateItem": args = ["id", "item", "cb"]; break;
                    case "query": args = ["query", "values", "cb"]; break;
                    default: args = ["id", "cb"];
                }
                
                describe("The '" + func + "' function should have the same signature", describeFunction(
                    testInstance[func], 
                    args
                ));
            });
        }
    ));

    describe("Should return a proper 'Controller' class", describeCoreClass(
        lib.Controller,
        "Controller", 
        ["index"],
        ["getRouter", "redirect"],
        function(testClass, testInstance, classFunctions, instanceFunctions) {
            describe("The 'index' function should have the same signature", describeFunction(
                testClass["index"], 
                ["res", "req", "next"]
            ));
            describe("The 'getRouter' function should have the same signature", describeFunction(
                testInstance["getRouter"],
                []
            ));
            describe("The 'redirect' function should have the same signature", describeFunction(
                testInstance["redirect"],
                ["res", "path", "status"]
            ));
        }
    ));

    describe("Should return a proper 'Entity' class", describeCoreClass(
        lib.Entity, 
        "Entity", 
        [],
        ["hasAttribute", "serialize", "unserialize"],
        function(testClass, testInstance, classFunctions, instanceFunctions) {
            describe("The 'hasAttribute' function should have the same signature", describeFunction(
                testInstance["hasAttribute"], 
                ["attribute"]
            ));
            describe("The 'serialize' function should have the same signature", describeFunction(
                testInstance["serialize"],
                []
            ));
            describe("The 'unserialize' function should have the same signature", describeFunction(
                testInstance["unserialize"],
                ["item"]
            ));
        }
    ));

    describe("Should return a proper 'Model' class", describeCoreClass(
        lib.Model, 
        "Model", 
        [],
        ["getId", "setId", "updateEntity", "exists", "get", "getAll", "create", "update", "delete", "find", "getMany", "count"],
        function(testClass, testInstance, classFunctions, instanceFunctions) {
            instanceFunctions.forEach(function(func){
                var args = [];
                switch (func) {
                    case "getId": break;
                    case "setId": args = ["value"]; break;
                    case "updateEntity": args = ["item"]; break;
                    case "getMany": args = ["ids", "cb"]; break;
                    case "find": 
                    case "count": args = ["conditions", "cb"]; break;
                    default: args = ["cb"];
                }
                describe("The '" + func + "' function should have the same signature", describeFunction(
                    testInstance[func], 
                    args
                ));
            });
        }     
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
            [],
            function(testClass, testInstance, classFunctions, instanceFunctions) {
                classFunctions.forEach(function(func){
                    describe("The '" + func + "' function should have the same signature", describeFunction(
                        testClass[func], 
                        ["model", "req", "res"]
                    ));
                });
            }
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
            ["login", "logout", "check", "getRedirectRoute"],
            function(testClass, testInstance, classFunctions, instanceFunctions) {
                instanceFunctions.forEach(function(func){
                    var args = func === "getRedirectRoute" ? [] : ["cb"];
                    describe("The '" + func + "' function should have the same signature", describeFunction(
                        testInstance[func], 
                        args
                    ));
                });
            }
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
            [],
            function(testClass, testInstance, classFunctions, instanceFunctions) {
                describe("The 'enforceTypes' function should have the same signature", describeFunction(
                    testClass["enforceTypes"], 
                    ["value", "types", "errorHandler"]
                ));

                describe("The 'enforceInstance' function should have the same signature", describeFunction(
                    testClass["enforceInstance"], 
                    ["value", "expectedClass", "errorHandler"]
                ));
            }
        ));
    });
});