import { Dispatch } from 'redux';
import request from 'graphql-request';
import {
    DELETE_PRODUCT,
    GET_PRODUCTS_DATA,
    GET_PRODUCTS_DATA_SUCCESS,
} from './actionsTypes';
import { Action } from '../../../../types/store/store';

/**
 * Dispatch fetching event to store
 */
function startFetching<T>(): Action<T> {
    return {
        type: GET_PRODUCTS_DATA,
    };
}

/**
 * Dispatch success fetching event to store
 */
function finishFetchingSuccess<T>(result: T): Action<T> {
    return {
        type: GET_PRODUCTS_DATA_SUCCESS,
        payload: result,
    };
}

/**
 * Dispatch success fetching event to store
 */
function deleteProductSuccess<T>(id: T): Action<T> {
    return {
        type: DELETE_PRODUCT,
        payload: id,
    };
}

/**
 * Fetch all products in mongoDB + and sets loading state
 */
export function getProductsFromDb() {
    return async (dispatch: Dispatch): Promise<void> => {
        const query = `query { getProducts { _id name description price date } }`;

        dispatch(startFetching());

        const requestToDb = await request('/graphql', query); // [PENDING TILL RESOLVED]

        dispatch(finishFetchingSuccess(requestToDb.getProducts));
    };
}

/**
 * Delete object by id
 *
 * @param id ObjectID form MongoDb
 */
export function deleteProduct(id: string) {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(deleteProductSuccess(id));

        const query = `mutation { deleteProduct(_id: "${id}") { _id } }`;

        await request('/graphql', query);
    };
}
