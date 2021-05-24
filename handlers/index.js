const homeHandler = require('./home');
const staticFile = require('./static-files');
const catHandlerPage = require('./cat');

module.exports = [homeHandler, staticFile, catHandlerPage];