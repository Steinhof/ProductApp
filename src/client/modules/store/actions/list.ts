import { Dispatch } from 'redux';
import request from 'graphql-request';
import { DELETE_PRODUCT, GET_PRODUCTS_DATA } from './actionsTypes';

/**
 * Fetch all products in mongoDB + and sets loading state
 */
export function getProductsFromDb() {
    return async (dispatch: Dispatch) => {
        const query = `query { getProducts { _id name description price date } }`;

        return request('/graphql', query).then(res =>
            dispatch({
                type: GET_PRODUCTS_DATA,
                payload: res.getProducts,
            }),
        );
    };
}

/**
 * Delete object by id
 *
 * @param id ObjectID form MongoDb
 */
export function deleteProduct(id: string) {
    return async (dispatch: Dispatch): Promise<void> => {
        const query = `mutation { deleteProduct(_id: "${id}") { _id name description price date } }`;

        await request('/graphql', query);

        dispatch({
            type: DELETE_PRODUCT,
            payload: id,
        });
    };
}
