import mongoose from 'mongoose';
import logger from '../config/logger';

export default async function connectToMongoDb(): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        logger.info(`[DATABASE] Connected to MongoDB successfully`);
    } catch (err) {
        logger.error(`[DATABASE] Can't connect to MongoDB server. ${err}`);
    }
}
