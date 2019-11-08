import { AnyAction } from 'redux';
import {
    DELETE_PRODUCT,
    GET_PRODUCTS_DATA,
    GET_PRODUCTS_DATA_SUCCESS,
    POST_PRODUCT_DATA,
} from '../actions/actionsTypes';
import { ProductState } from '../../../../types/store/store';

const initialState = {
    items: [],
    loading: false,
};

export default function productReducer(
    state: ProductState = initialState,
    action: AnyAction,
) {
    switch (action.type) {
        case GET_PRODUCTS_DATA:
            return { ...state, loading: true };

        case GET_PRODUCTS_DATA_SUCCESS:
            return { ...state, items: action.payload, loading: false };

        case POST_PRODUCT_DATA:
            return { ...state, items: [...state.items, action.payload] };

        case DELETE_PRODUCT:
            return {
                ...state,
                items: [
                    ...state.items.filter(item => item._id !== action.payload),
                ],
            };

        default:
            return state;
    }
}
