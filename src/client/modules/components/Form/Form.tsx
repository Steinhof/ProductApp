import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import Button from '../UI/Button/Button';
import createProduct from '../../store/actions/form';
import Info from '../UI/Info/Info';

function Form({ dispatch }: AnyAction): ReactElement {
    // State hooks
    const [state, setState] = useState(false);

    // Load all products from DB

    // Send new product to DB
    const submitProductHandler = (event: any): void => {
        event.preventDefault();

        const object = {
            name: event.target[0].value,
            description: event.target[1].value,
            price: event.target[2].value + event.target[3].value,
            date: new Date().toLocaleString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: 'numeric',
            }),
        };

        // Add product to state store
        dispatch(createProduct(object));

        // Reset form inputs
        event.target.reset();
    };

    // Show result banner
    const showResultInfo = () => {
        setTimeout(() => setState(false), 2000);
        return <Info />;
    };

    return (
        <>
            <form
                className="form"
                onSubmit={(evt): void => {
                    submitProductHandler(evt);
                    setState(true);
                }}
            >
                <input
                    className="form__input--name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                />
                <input
                    className="form__input--description"
                    type="text"
                    name="description"
                    placeholder="Description"
                    required
                />
                <input
                    className="form__input--description"
                    type="number"
                    name="price"
                    placeholder="Price"
                    required
                />
                <select name="currency">
                    <option value="$">$</option>
                    <option value="€">€</option>
                    <option value="₽">₽</option>
                </select>
                <Button styleClass="btn btn--submit" type="submit">
                    Add
                </Button>
            </form>
            <div className="info__container">
                {state ? showResultInfo() : null}
            </div>
        </>
    );
}

export default connect()(Form);
