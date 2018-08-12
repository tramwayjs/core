export default class App {
    /**
     * 
     * @param {Router} router `tramway-core-router`
     * @param {*} app Express app
     * @param {number} port Port from config
     */
    constructor(router, app, port) {
        this.router = router;
        this.app = app;
        this.port = port;
        this.loggers = [];
    }

    /**
     * 
     * @param {*} middleware Middleware you usually use in the express app
     */
    use(middleware) {
        this.app.use(middleware);
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
    
    /**
     * Start the app
     */
    start() {
        return this.app.listen(this.port);
    }
}