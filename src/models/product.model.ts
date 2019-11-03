import { Schema } from 'mongoose';

const productModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: new Date().toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: 'numeric',
        }),
    },
});

export default productModel;
