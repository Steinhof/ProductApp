import React, { Component, FormEvent } from 'react';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    activate(event: FormEvent) {
        console.log(window);
    }

    render() {
        return (
            <button
                onClick={this.activate}
                type="button"
                aria-label="hello world"
            >
                Button
            </button>
        );
    }
}

export default Test;
