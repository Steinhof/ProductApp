import React, { ReactElement } from 'react';
import usePromise from 'react-promise';
import { connect } from 'react-redux';
import Product from '../../components/Product/Product';
import { PostObject } from '../../../../types/database';

// import { StateToProps } from '../../../../types/store/store';

function ProductsList({ products }: PostObject): ReactElement | null {
    const { value, loading } = usePromise<string>(products);

    // Removes loading spinner when fetch finished
    const removeSpinnerHandler = () => {
        const spinnerUI = document.querySelector('.spinner');
        if (spinnerUI) {
            spinnerUI.remove();
        }
    };

    if (loading) return null;

    return (
        <div className="product__container">
            {value.map(item => (
                <Product
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    date={item.date}
                />
            ))}
            {removeSpinnerHandler()}
        </div>
    );
}

const mapStateToProps = ({ product }: any) => {
    return {
        products: product,
    };
};

export default connect(mapStateToProps)(ProductsList);
