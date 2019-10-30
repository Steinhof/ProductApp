import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../UI/Button/Button';
import './Form.sass';
import { ReactRender } from '../../react-app-env';

type FormState = {};

type FormProps = {};

class Form extends Component<FormProps, FormState> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(): ReactRender {
        return (
            <form className="form" action="#">
                <input type="text" name="Product" id="" />
                <input type="text" name="Product" id="" />
                <input type="text" name="Product" id="" />
                <select name="currency" id="">
                    <option value="dollar">$</option>
                    <option value="euro">€</option>
                    <option value="ruble">₽</option>
                </select>
                <Button
                    class="btn btn--submit"
                    onClick={(): void => console.log('clicked handler func')}
                >
                    Add
                </Button>
            </form>
        );
    }
}

function mapStateToProps(): void {}

function mapDispatchToProps(): void {}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Form);
