import React, { FunctionComponent } from 'react';
import Form from '../components/Form/Form';
import ProductsList from '../containers/ProductsList/ProductsList';

const Home: FunctionComponent = () => {
    return (
        <>
            <Form />
            <ProductsList />
        </>
    );
};

export default Home;
