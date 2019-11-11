import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';
import Product from '../../components/Product/Product';
import { getProductsFromDb } from '../../store/actions/list';
import { StoreProps } from '../../../../types/store/store';

class _ProductsList extends Component<StoreProps> {
    componentDidMount(): void {
        const { getProductsFromDb } = this.props;
        getProductsFromDb();
    }

    addLoadingSpinnerHandler = () => {
        return (
            <img
                className="spinner"
                src="./img/Rolling-1s-200px.svg"
                alt="please stand by"
            />
        );
    };

    render(): ReactElement | null {
        const { products } = this.props;

        return (
            <div className="product__container">
                {products.loading
                    ? this.addLoadingSpinnerHandler()
                    : products.items.map(item => (
                          <Product
                              key={item._id}
                              id={item._id}
                              name={item.name}
                              description={item.description}
                              price={item.price}
                              date={item.date}
                          />
                      ))}
            </div>
        );
    }
}

const mapDispatchToProps = {
    getProductsFromDb,
};

const mapStateToProps = (state: StoreProps) => {
    return {
        products: state.product,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(_ProductsList);
