import Kernel from "./Kernel";
import AbstractManager from "./AbstractManager";

export default class Manager extends AbstractManager {
    constructor(kernel, eventEmitter) {
        super(eventEmitter);
        this.kernel = kernel;
    }

    static init(eventEmitter, kernel = new Kernel()) {
        return new Manager(kernel, eventEmitter).registerEvents();
    }

    registerEvents() {
        this.eventEmitter.on(AbstractManager.EVENT_SERVER_START, () => this.start());
        this.eventEmitter.on(AbstractManager.EVENT_SERVER_STOP, () => this.stop());
        this.eventEmitter.on(AbstractManager.EVENT_SERVER_RESTART, () => this.restart());
        this.eventEmitter.on(AbstractManager.EVENT_STATE_REQUESTED, () => this.requestApplicationState());
        this.eventEmitter.on(AbstractManager.EVENT_SERVER_STOPPED, () => process.exit());
        return this;
    }

    async start() {
        this.eventEmitter.emit(AbstractManager.EVENT_SERVER_STARTING);

        try {
            await this.kernel.start();
        } catch(e) {
            throw e;
        }

        this.eventEmitter.emit(AbstractManager.EVENT_SERVER_STARTED);
    }

    async restart() {
        this.eventEmitter.emit(AbstractManager.EVENT_SERVER_RESTARTING);

        try {
            await this.kernel.restart();
        } catch(e) {
            throw e;
        }

        this.eventEmitter.emit(AbstractManager.EVENT_SERVER_RESTARTED);
    }

    async stop() {
        this.eventEmitter.emit(AbstractManager.EVENT_SERVER_STOPPING);

        try {
            await this.kernel.stop();
        } catch(e) {
            throw e;
        }

        this.eventEmitter.emit(AbstractManager.EVENT_SERVER_STOPPED);
    }

    async requestApplicationState() {
        let state;
        
        try {
            state = await this.kernel.getApplicationState();
        } catch(e) {
            throw e;
        }

        const processId = this.kernel.getProcessId();

        this.eventEmitter.emit(AbstractManager.EVENT_STATE_RETRIEVED, { processId, ...state });
    }
}