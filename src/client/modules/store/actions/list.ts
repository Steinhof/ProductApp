import { ActionCreator, Dispatch } from 'redux';
import request from 'graphql-request';
import { GraphQLRequestContext } from 'graphql-request/dist/src/types';
import { DELETE_PRODUCT, GET_PRODUCTS_DATA } from './actionsTypes';
import { PostObject } from '../../../../types/database';
import { Action } from '../../../../types/store/store';

/**
 * Fetch all products in mongoDB + and sets loading state
 */
export function getProductsFromDb() {
    return async <T>(dispatch: Dispatch): Promise<Action<T>> => {
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
        dispatch({
            type: DELETE_PRODUCT,
            payload: id,
        });

        const query = `mutation { deleteProduct(_id: "${id}") { _id } }`;

        await request('/graphql', query);
    };
}
