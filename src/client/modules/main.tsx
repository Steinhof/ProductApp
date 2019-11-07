import React from 'react';
import { render } from 'react-dom';
import App from './App';
import '../sass/react-app/main.sass';
// import registerServiceWorker from './utils/serviceWorker/registerServiceWorker';
//
// registerServiceWorker();

// const products = {
//     items: [{ cat: 'meow' }, { dog: 'sis' }],
// };
//
// products.items?.map(item => console.log('defined'));

render(<App />, document.querySelector('.content'));
