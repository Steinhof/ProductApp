import React, { ReactElement } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import Test from './Test';
import Home from './pages/Home';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);

export default (): ReactElement => {
    return (
        <Provider store={store}>
            <Home />
            <Test />
        </Provider>
    );
};
