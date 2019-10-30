import React, { FunctionComponentElement } from 'react';
import Form from '../Form/Form';
import Info from '../UI/Info/Info';
import ProductsList from '../../containers/ProductsList/ProductsList';

export default (): FunctionComponentElement<void> => {
    return (
        <div>
            <Form />
            <Info />
            <ProductsList />
        </div>
    );
};
