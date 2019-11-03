import { PostObject } from './database';

export interface ProductState {
    items: PostObject;
    item: PostObject;
    loading: boolean;
    result: {};
}
