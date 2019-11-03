import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import Button from '../UI/Button/Button';
import { deleteProduct } from '../../store/actions/list';

function Product({
    name,
    description,
    price,
    date,
    id,
    dispatch,
}: AnyAction): ReactElement {
    // Dispatch action to delete object from store and DB
    const removeProductHandler = (objectID: string): void => {
        dispatch(deleteProduct(objectID));
    };

    return (
        <div className="product">
            <div className="product__data">
                <div className="product__name">
                    <span className="product__info">Name</span>
                    {name}
                </div>
                <div className="product__description">
                    <span className="product__info">Description</span>
                    {description}
                </div>
                <div className="product__price">
                    <span className="product__info">Price</span>
                    {price}
                </div>
                <div className="product__date">
                    <span className="product__info">Date</span>
                    {date}
                </div>
            </div>
            <Button
                type="button"
                class="product__btn btn--delete btn"
                onClick={(): void => removeProductHandler(id)}
            >
                Delete
            </Button>
        </div>
    );
}

export default connect()(Product);
