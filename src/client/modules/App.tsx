import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import ProductsList from './containers/ProductsList/ProductsList';
import Form from './components/Form/Form';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);

export default (): any => {
    return (
        <Provider store={store}>
            <Form />
            <ProductsList />
        </Provider>
    );
};
