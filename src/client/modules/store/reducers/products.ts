import { AnyAction } from 'redux';
import { DELETE_PRODUCT, POST_PRODUCT_DATA } from '../actions/actionsTypes';
import { getProductsFromDb } from '../actions/list';

const initialState = {
    items: [],
};

export default function productReducer(
    state = initialState,
    action: AnyAction,
) {
    switch (action.type) {
        case POST_PRODUCT_DATA:
            return getProductsFromDb().then(res => res.getProducts);

        case DELETE_PRODUCT:
            return getProductsFromDb().then(res => {
                return res.getProducts.filter(
                    item => item._id !== action.payload,
                );
            });

        default:
            return getProductsFromDb().then(res => res.getProducts);
    }
}
