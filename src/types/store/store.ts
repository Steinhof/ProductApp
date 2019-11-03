import { PostObject } from '../database';

export interface Action<T> {
    readonly type: string;
    readonly payload?: T;
}

export interface InitialState {
    items: PostObject[];
}

export interface StateToProps {
    products: {
        items: PostObject[];
        loading: boolean;
    };
}
