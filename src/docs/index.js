const config = require('../config');
module.exports = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'API',
    description: 'API',
  },
  servers: [
    {
      url: `${config.LOCAL_BASE_URL}/api/v1`,
      description: config.ENV,
    },
  ],
  tags: [
    {
      name: 'Users',
      description: 'API for users',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {},
};
