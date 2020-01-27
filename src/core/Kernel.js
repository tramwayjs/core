import ChildProcess from 'child_process';
import { Command } from './messages';

export default class Kernel {
    constructor() {
        this.appProcess = ChildProcess.fork(require.resolve('./init'));
    }

    async start() {
        if (!this.appProcess || this.appProcess.killed) {
            this.appProcess = ChildProcess.fork(require.resolve('./init'));
        }

        return new Promise((resolve, reject) => {
            this.appProcess.send(new Command('start'), err => {
                if(err) {
                    return reject(err);
                }

                return resolve(this);
            });
        })
    }

    async stop() {
        return new Promise((resolve, reject) => {
            this.appProcess.send(new Command('stop'), err => {
                if(err) {
                    return reject(err);
                }

                this.appProcess.kill();

                return resolve(this);
            });
        });
    }

    async restart() {
        return new Promise((resolve, reject) => {
            this.appProcess.send(new Command('restart'), err => {
                if(err) {
                    return reject(err);
                }

                return resolve(this);
            });
        });
    }

    getProcessId() {
        return this.appProcess.pid;
    }

    async getApplicationState() {
        return new Promise((resolve, reject) => {
            this.appProcess.send(new Command('state'), err => {
                if(err) {
                    return reject(err);
                }

                this.appProcess.on('message', state => resolve(state))
            });
        });
    }
}