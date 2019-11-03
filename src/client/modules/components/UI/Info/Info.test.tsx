import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Info from './Info';

configure({ adapter: new Adapter() });

describe('[UNIT] Info component testing', () => {
    it('should render info banner component', () => {
        const component = shallow(<Info />);
        const wrapper = component.find('.is-success');
        expect(wrapper.length).toBe(1);
    });
});
