import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import cors from './config/cors';
import constants from './config/constants';
//import routes from './routes';

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(morgan('dev'));
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use(cors);
//routes(server);
server.listen(constants.PORT, async (req, res) =>{
    try{
      console.log(`server start on port:${constants.PORT}`);
    }
    catch(error){
        return res.status(400).json({ status:400, error:'server with that not exist'});
    }
    
});

export default server;