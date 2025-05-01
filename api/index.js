console.log("Antes")
const serverless = require('serverless-http');
const app = require('../src/app');
console.log("Meio")
module.exports = serverless(app);
console.log("depois")