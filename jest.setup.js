require('@testing-library/jest-native/extend-expect');
require('abort-controller/polyfill');

global.self = global;
// global.window = {};
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
