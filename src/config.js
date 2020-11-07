let dotenv = require('dotenv').config().parsed;
let { version } = require('../package.json');

const environment = {
  development: {
    LOCAL_BASE_URL: `http://localhost:${dotenv.PORT}`,
  },
  live: {
    LOCAL_BASE_URL: `http://localhost:${dotenv.PORT}`,
  },
};
const serverEnv = environment[dotenv.ENV_PREFIX] || {};

const ENV = {
  ...serverEnv,
  ...dotenv,
  VERSION: version,
  ENV: dotenv.ENV_PREFIX,
  SERVER_PATH: __dirname.split('/src')[0],
};

console.log('>>>>', ENV);

module.exports = ENV;
