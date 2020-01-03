import {createDependencyResolver} from '@tramway/dependency-injector';
import { MessageFactory, Command, Data } from './messages';

export default class App {
    constructor(name, services, parameters) {
        this.name = name;
        this.config = {services, parameters}; 
        this.di = createDependencyResolver(this.name);
        this.messageFactory = new MessageFactory();
    }

    static init(name, services, parameters) {
        const app = new App(name, services, parameters).initialize();

        process.on('message', async message => await app.handleMessage(message));

        return app;
    }

    async handleMessage(message) {
        message = this.messageFactory.init(message);

        if (message instanceof Command) {
            await this.execute(message.getValue());
        }

        if (message instanceof Data) {

        }
    }

    async execute(command) {
        switch(command) {
            case 'start': return await this.start();
            case 'stop': return await this.stop();
            case 'restart': return await this.restart();
            case 'state': return await this.getApplicationState();
        }
    }

    initialize() {
        const {services, parameters} = this.config;
        this.di.initialize(services, parameters);
        this.server = this.di.getService('server').initialize();
        return this;
    }

    async start() {
        return await this.server.start();
    }

    async stop() {
        return await this.server.stop();
    }

    async restart() {
        return await this.server.restart();
    }

    async getApplicationState() {
        const parameters = this.getParameters();
        const instances = this.getInstances();
        return process.send({parameters, instances});
    }

    getInstances() {
        const servicesManger = this.di.getDependencyManager().getServicesManager();
        if (!servicesManger || !servicesManger.getInstanceKeys()) {
            return [];
        }

        return servicesManger.getInstanceKeys();
    }

    getParameters() {
        const parametersManager = this.di.getDependencyManager().getParametersManager();

        if (!parametersManager || !parametersManager.getParameters()) {
            return {};
        }

        return parametersManager.getParameters();
    }
}