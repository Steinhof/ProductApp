import { combineReducers } from 'redux';
import productReducer from './products';
import { ProductState } from '../../../../types/state';

export interface RootReducers {
    product: ProductState;
}

export default combineReducers<RootReducers>({
    product: productReducer,
});
