import request from 'graphql-request';
import { Dispatch } from 'redux';
import { POST_PRODUCT_DATA } from './actionsTypes';
import { PostObject } from '../../../../types/database';

/**
 * Function add's new created product to MongoDb Collection
 *
 * @param item New created product item
 */
export default function createProduct(item: PostObject) {
    return async (dispatch: Dispatch): Promise<void> => {
        const query = `mutation { createProduct(name: "${item.name}", description: "${item.description}", price: "${item.price}") {
                _id
                name
                description
                price
                date
             }
        }`;

        await request('/graphql', query)
            .then(res =>
                dispatch({
                    type: POST_PRODUCT_DATA,
                    payload: res.createProduct,
                }),
            )
            .catch(err => console.error(`[ACTIONS-FORM] Query failed. ${err}`));
    };
}
