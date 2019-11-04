import { PostObject } from '../database';

export interface Action<T> {
    readonly type: string;
    readonly payload?: T;
}

export interface InitialState {
    product: PostObject[];
}

export interface StoreProps {
    getProductsFromDb: () => void;
    products: {
        items: PostObject[];
    };
}
