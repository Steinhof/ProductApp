import { model } from 'mongoose';
import logger from '../config/logger';
import productModel from '../models/product.model';
import { PostObject } from '../types/database';

const Product = model('Product', productModel);

export default {
    createProduct: async <T extends PostObject>(obj: T): Promise<T> => {
        const product = new Product({
            name: obj.name,
            description: obj.description,
            price: obj.price,
        });
        await product
            .save()
            .then(() =>
                logger.info(
                    `[GRAPHQL RESOLVER] Object successfully saved to mongoDB`,
                ),
            )
            .catch(err =>
                logger.error(
                    `[GRAPHQL RESOLVER] Error occurred while trying to save the object. ${err}`,
                ),
            );
        return product;
    },
    getProducts: () => {
        return Product.find({}, (err, data) => {
            if (err)
                logger.error(
                    `[GRAPHQL RESOLVER] Can't get objects from MongoDb. ${err}`,
                );

            return data;
        });
    },
    deleteProduct: (id: string) => {
        return Product.deleteOne({ _id: id }, err => {
            if (err) console.log(err);
        });
    },
};
