import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import expressGraphql from 'express-graphql';
import logger from './config/logger';
import schema from './graphql/schema';
import connectToMongoDb from './database/database';

// Express server
const app = express();

// Database
connectToMongoDb();

// Middleware
app.use(compression());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(
    '/graphql',
    expressGraphql({
        schema,
        // rootValue: resolver,
        graphiql: true,
    }),
);

// Static files
app.use(express.static(path.resolve(__dirname, 'public')));

// Server start
const PORT = parseInt(process.env.SERVER_PORT as string, 10) || 8000;

app.listen(PORT, () => {
    logger.info(`Server running at port ${PORT}`);
});
