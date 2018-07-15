Tramway is a simple framework core that can be used with Express to speed up and structure apps built in ES2015+. It includes:

1. A dynamic routing system that separates routes from routing logic and is adaptable
2. Restful routes to save time building APIs
3. An adaptive Connection system
4. Models and Entities which are separate but when used together with Connections can speed up workflow.
5. Authentication policies that allow for multiple strategies to be used and interchanged without needing the logic throughout the code.
and so much more.

This library provides the common core and it is encouraged to install the compatible pieces you need for your project.

# Installation:
1. `npm install tramway-core`

# Example project
https://gitlab.com/tramwayjs/tramway-example

# Documentation

## Recommended Folder Structure
- config
- errors
- services

## App

The App class encompasses your express app into a clean shell that can be built with the `tramway-core-dependency-injector` library.

To use `App` in your server.js the declarative way:

```
import {App} from 'tramway-core';
...

let app = new App(router, express, port);
app.use(cors());

app.initialize().start();
```

To use `App` with dependency injection in the services declaration:

```
import {App} from 'tramway-core';

export default {
    "app": {
        "class": App,
        "constructor": [
            {"type": "service", "key": "router"},
            {"type": "parameter", "key": "app"},
            {"type": "parameter", "key": "PORT"},
        ],
        "functions": [
            {
                "function": "use",
                "args": [{"type": "parameter", "key": "cors"}],
            },
        ],
    }
}
```

In your server.js:

```
let app = DependencyResolver.getService('app');
app.initialize().start();
```

## Config
Here is where you can put all the parameters for express - like CORS

## Services
The services folder is to place any logic that handles specific core tasks. The framework comes with a service itself.

### Type Enforcement Service
The type enforcement service makes up for the short-comings of typing in JavaScript and lets your app cleanly enforce types if need be. The utility service comes with a few static methods to let you enforce basic types or custom classes and either throw an Error (default) or override the behavior with a less obstructive way to handle it.

To use the `TypeEnforcementService` just import it.
```
import {services} from 'tramway-core`;
let {TypeEnforcementService} = services;
```

| Function | Usage | Notes |
| --- | --- | --- |
| ```enforceTypes(value: any, types: Set<string>/string[]/string, errorHandler: function(value): value): value``` | ```TypeEnforcementService.enforceTypes(someValue, ["string", "number"]);``` | `errorHandler` is optional. Will check basic types using typeof and return value if valid or throw `WrongTypeError` |
| ```enforceInstance(value: any, expectedClass: Object, errorHandler: function(value): value): value``` | ```TypeEnforcementService.enforceTypes(someValue, SomeClass);``` | `errorHandler` is optional. Will check basic types using instanceof and return value if valid or throw `WrongTypeError` |

## Errors
All errors extend Javascript's `Error` class and naming repeated ones comes in handy when reading code and writing it quickly. The framework comes with errors which can be accessed and used.

```
import {errors} from 'tramway-core';
let {WrongTypeError, AbstractMethodError} = errors;
```

| Function | Usage | Notes |
| --- | --- | --- |
| WrongTypeError | ```new WrongTypeError(expectedType: string, gotType: string)```| Used when the wrong type is passed. |
| AbstractMethodError | ```new AbstractMethodError()``` | Used when an abstract method is made to ensure it gets overridden in a child class - there to fill a shortcoming of Javascript missing Interfaces and Abstract classes. |



