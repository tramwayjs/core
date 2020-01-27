import App from './App';
import path from 'path';

const {name, parameters, services} = require(path.resolve('dist/config/index.js'));

App.init(name, services, parameters);