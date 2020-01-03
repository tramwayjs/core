export default class Server {
    loggers = [];

    constructor(router, server, port) {
        this.router = router;
        this.server = server;
        this.port = port;
    }

    async start() {
        return new Promise(resolve => {
            this.instance = this.server.listen(this.port, () => {
                return resolve(this);
            });
        })
    }

    async stop() {
        return new Promise((resolve, reject) => {
            this.instance.close(err => {
                if (err) {
                    return reject(err);
                }

                return resolve(this);
            });
        })
    }

    async restart() {
        return new Promise((resolve, reject) => {
            return this.stop()
                .then(() => {
                    this.start()
                        .then(() => resolve(this))
                        .catch(e => reject(e));
                })
                .catch(e => reject(e));
        })
    }

    /**
     * 
     * @param {*} middleware Middleware you usually use in the express app
     */
    use(middleware) {
        this.server.use(middleware);
    }

    /**
     * 
     * @param {*} Object Setting configuration you can pass to the express app. 
     */
    set({key, value} = {}) {
        this.server.set(key, value);
    }

    /**
     * Initialize the router
     */
    initialize() {
        this.router.initialize();
        this.loggers.forEach(logger => this.use(logger.getMiddleware()));
        return this;
    }

    /**
     * 
     * @param {*} logger 
     */
    addLogger(logger) {
        this.loggers.push(logger);
        return this;
    }
}