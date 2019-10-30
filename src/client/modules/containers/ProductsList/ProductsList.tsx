import React, { Component } from 'react';
import Product from '../../components/Product/Product';

export default class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="product__container">
                <Product />
            </div>
        );
    }
}
