export default class AbstractManager {
    static EVENT_SERVER_START = 'server.start';
    static EVENT_SERVER_STARTING = 'server.starting';
    static EVENT_SERVER_STARTED = 'server.started';
    static EVENT_SERVER_STOP = 'server.stop';
    static EVENT_SERVER_STOPPING = 'server.stopping';
    static EVENT_SERVER_STOPPED = 'server.stopped';
    static EVENT_SERVER_RESTART = 'server.restart';
    static EVENT_SERVER_RESTARTING = 'server.restarting';
    static EVENT_SERVER_RESTARTED = 'server.restarted';
    static EVENT_STATE_REQUESTED = 'state.requested';
    static EVENT_STATE_RETRIEVED = 'state.retrieved';

    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }

    static init(eventEmitter) {}
    registerEvents() {}
}