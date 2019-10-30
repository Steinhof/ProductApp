import { Action } from 'redux';
import { POST_PRODUCT_DATA } from '../actions/actionsTypes';

const initialState = {
    quizzes: [],
    loading: false,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: null,
};

export default function formReducer(state = initialState, action: Action): any {
    switch (action.type) {
        case POST_PRODUCT_DATA:
            return { ...state, loading: true };
        default:
            return state;
    }
}
