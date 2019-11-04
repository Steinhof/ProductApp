import { AnyAction } from 'redux';
import {
    DELETE_PRODUCT,
    GET_PRODUCTS_DATA,
    POST_PRODUCT_DATA,
} from '../actions/actionsTypes';

const initialState = {
    items: [],
};

export default function productReducer(
    state = initialState,
    action: AnyAction,
) {
    switch (action.type) {
        case GET_PRODUCTS_DATA:
            return { ...state, items: action.payload };

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
