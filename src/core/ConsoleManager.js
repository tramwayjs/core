import AbstractManager from './AbstractManager';

export default class ConsoleManager extends AbstractManager {
    static init(eventEmitter) {
        return new ConsoleManager(eventEmitter).registerEvents();
    }

    registerEvents() {
        process.stdin.on('data', async data => this.run(data.toString().trim()));

        this.eventEmitter.on(AbstractManager.EVENT_SERVER_STOPPED, () => this.handleServerStopped());
        this.eventEmitter.on(AbstractManager.EVENT_STATE_RETRIEVED, state => this.handleApplicationStateRetrieved(state));
        return this;
    }

    handleServerStopped() {
        process.exit();
    }

    handleApplicationStateRetrieved(state) {
        console.log(state)
    }

    start() {
        this.eventEmitter.emit(AbstractManager.EVENT_SERVER_START);
    }

    stop() {
        this.eventEmitter.emit(AbstractManager.EVENT_SERVER_STOP);
    }

    restart() {
        this.eventEmitter.emit(AbstractManager.EVENT_SERVER_RESTART);
    }

    getApplicationState() {
        this.eventEmitter.emit(AbstractManager.EVENT_STATE_REQUESTED);
    }

    execute(args = []) {
        if (!args.length) {
            process.exit(1);
        }

        const [command] = args;
        return this.run(command);
    }

    run(command) {
        switch(command) {
            case 'start': return this.start();
            case 'stop': return this.stop();
            case 'restart': return this.restart();
            case 'state': return this.getApplicationState();
        }
    }
}