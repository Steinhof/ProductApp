import React from 'react';
import { configure, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import ProductsList from './ProductsList';

configure({ adapter: new Adapter() });

describe('[INTEGRATION] Should check Form component state', () => {
    const initialState = {
        items: [],
    };
    const mockStore = configureStore(initialState);
    let container;
    // @ts-ignore
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
        // @ts-ignore
        container = shallow(<ProductsList store={mockStore} />);
    });

    it('+++ render the connected(SMART) component', () => {
        expect(container.length).toBe(1);
    });
});
