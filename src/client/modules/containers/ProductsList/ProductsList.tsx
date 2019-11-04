import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';
import Product from '../../components/Product/Product';
import { getProductsFromDb } from '../../store/actions/list';
import { InitialState, StoreProps } from '../../../../types/store/store';

class ProductsList extends Component<StoreProps> {
    componentDidMount(): void {
        const { getProductsFromDb } = this.props;
        getProductsFromDb();
    }

    render(): ReactElement | null {
        const { products } = this.props;

        // Removes loading spinner when fetch finished
        const removeSpinnerHandler = () => {
            const spinnerUI = document.querySelector('.spinner');
            if (spinnerUI) {
                spinnerUI.remove();
            }
        };

        return (
            <div className="product__container">
                {products.items.length
                    ? products.items.map(item => (
                          <Product
                              key={item._id}
                              id={item._id}
                              name={item.name}
                              description={item.description}
                              price={item.price}
                              date={item.date}
                          />
                      ))
                    : null}
                {removeSpinnerHandler()}
            </div>
        );
    }
}

const mapDispatchToProps = {
    getProductsFromDb,
};

const mapStateToProps = ({ product }: InitialState) => {
    return {
        products: product,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductsList);
