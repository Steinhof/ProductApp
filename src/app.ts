import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import expressGraphql from 'express-graphql';
import logger from './config/logger';
import connectToMongoDb from './database/database';
import resolver from './graphql/resolver';
import productSchema from './graphql/product.schema';

// Express server
const app = express();

// Database
connectToMongoDb().catch(err =>
    logger.error(`[NODE-APP] Can't run mongoDB connect. ${err}`),
);

// Middleware
app.use(compression());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(
    '/graphql',
    expressGraphql({
        schema: productSchema,
        rootValue: resolver,
        graphiql: true,
    }),
);

// Static files
app.use(express.static(path.resolve(__dirname, 'public')));

// Server start
const PORT = parseInt(process.env.PORT as string, 10) || 80;

app.listen(PORT, () => {
    logger.info(`Server running at port ${PORT}`);
});
