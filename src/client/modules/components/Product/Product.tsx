import React, { Component } from 'react';
import Button from '../UI/Button/Button';
import './Product.sass';
import { ReactRender } from '../../react-app-env';

type ProductProps = {}

export default class Product extends Component<> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(): ReactRender {
        return (
            <div className="product">
                <div className="product__data">
                    <div className="product__name">Name {}</div>
                    <div className="product__description">Description {}</div>
                    <div className="product__price">Price{}</div>
                    <div className="product__date">Creation Date{}</div>
                </div>
                <Button class="product__btn btn--delete btn">Delete</Button>
            </div>
        );
    }
}
