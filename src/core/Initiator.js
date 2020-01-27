import Manager from "./Manager";
import ConsoleManager from "./ConsoleManager";
import { EventEmitter } from "events";

export default class Initiator {
    static CONSOLE_MANAGER = 'console';

    managers = new Map();

    constructor(kernel) {
        this.eventEmitter = new EventEmitter();
        this.manager = Manager.init(this.eventEmitter, kernel);
    }

    activateConsole() {
        this.addManager(Initiator.CONSOLE_MANAGER, this.initiateManager(ConsoleManager));
        return this;
    }

    addManager(name, manager) {
        this.managers.set(name, manager);
        return this;
    }

    initiateManager(manager) {
        return manager.init(this.eventEmitter);
    }

    getManager(name) {
        return this.managers.get(name);
    }

    getEventEmitter() {
        return this.eventEmitter;
    }
}