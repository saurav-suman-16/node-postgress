require('module-alias/register');

const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const basicAuth = require('express-basic-auth');

const docs = require('./docs');
const config = require('./config');
const routes = require('./routes/v1');
const { logger } = require('./utils');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// v1 api routes
app.use('/api/v1', routes);
app.use(
  '/api-docs/v1',
  [
    basicAuth({
      challenge: true,
      users: { [config.SWAGGER_USER]: config.SWAGGER_PWD },
    }),
    swaggerUi.serve,
  ],
  swaggerUi.setup(docs),
);

app.listen(config.PORT, () => {
  logger.info(
    `Server version: ${config.VERSION} Listening to port ${config.PORT}`,
  );
});
