const assert = require('assert');
const utils = require('tramway-core-testsuite');
const lib = require('../index.js');
var describeCoreClass = utils.describeCoreClass;
var describeFunction = utils.describeFunction;

describe("Simple acceptance tests to ensure library returns what's promised.", function(){
    describe("Should return a proper 'App' class", describeCoreClass(
        lib.App, 
        "App", 
        [],
        ["use", "initialize", "start", "addLogger"],
        function(testClass, testInstance, classFunctions, instanceFunctions) {
            describe("The 'use' function should have the same signature", describeFunction(
                testInstance["use"], 
                ["middleware"]
            ));

            describe("The 'initialize' function should have the same signature", describeFunction(
                testInstance["initialize"], 
                []
            ));

            describe("The 'start' function should have the same signature", describeFunction(
                testInstance["start"], 
                []
            ));

            describe("The 'addLogger' function should have the same signature", describeFunction(
                testInstance["addLogger"], 
                ['logger']
            ));
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