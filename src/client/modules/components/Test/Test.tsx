import React, { Component } from 'react';
import { ReactRender } from '../../../../types/react-commons';

type TestProps = {
    string: string;
};

export default class Test extends Component<TestProps> {
    constructor() {
        super(...arguments);
        this.bss = 'changed';
    }

    render(): ReactRender {
        return <div>{`${this.bss} ok boomer`}</div>;
    }
}
