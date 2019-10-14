"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

var _https = _interopRequireDefault(require("https"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App {
  /**
   * 
   * @param {Router} router `tramway-core-router`
   * @param {*} app Express app
   * @param {number} port Port from config
   * @param {Object} httpsConfig Necessary configuration for https
   */
  constructor(router, app, port, httpsConfig) {
    this.router = router;
    this.app = app;
    this.port = port;
    this.httpsConfig = httpsConfig;
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
   * 
   * @param {*} Object Setting configuration you can pass to the express app. 
   */


  set({
    key,
    value = []
  } = {}) {
    this.app.set(key, ...value);
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
    //TODO: Introduce the concept of Servers at the App constructor level to encapsulate this logic.
    if (this.httpsConfig) {
      const {
        port,
        privateKey,
        certificate
      } = this.httpsConfig;

      const getContentsFromCertConfig = config => {
        const {
          file,
          encoding = 'utf8'
        } = config;
        return _fs.default.readFileSync(file, encoding);
      };

      const credentials = {
        key: getContentsFromCertConfig(privateKey),
        cert: getContentsFromCertConfig(certificate)
      };

      const httpServer = _http.default.createServer(this.app);

      const httpsServer = _https.default.createServer(credentials, this.app);

      httpServer.listen(this.port);
      httpsServer.listen(port);
      return this.app;
    }

    return this.app.listen(this.port);
  }

}

exports.default = App;