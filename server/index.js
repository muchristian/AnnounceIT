import express from 'express';
import morgan from 'morgan';
import constants from './config/constants';
import middleware from './middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger';

const server = express();
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use(morgan('dev'));
server.use(express.json());

// Passing all of our APIs config/endpoints to our express server to use them

middleware(server);

// Starting our Express server and pass it the port to listen to.

server.listen(constants.PORT, () => {
  console.log(`server is running to port:${constants.PORT}`);
});

// Exported the server for testing purpose //

export default server;
