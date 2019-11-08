import { PostObject } from '../database';

export interface Action<T> {
    readonly type: string;
    readonly payload?: T;
}

export interface ProductObject {
    product: ProductState;
}

export interface StoreProps {
    getProductsFromDb: () => void;
    products: {
        items: PostObject[];
        loading: boolean;
    };
}

export interface ProductState {
    items: PostObject[];
    loading: boolean;
}
