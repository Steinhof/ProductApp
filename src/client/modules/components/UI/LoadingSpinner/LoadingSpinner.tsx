import React, { ReactElement } from 'react';
import './LoadingSpinner.sass';

export default function(): ReactElement {
    return (
        <img
            className="spinner"
            src="./img/spinnerFetch.svg"
            alt="wait for loading"
        />
    );
}
