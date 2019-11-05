import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../sass/react-app/main.sass';
import registerServiceWorker from './implementation/serviceWorker/registerServiceWorker';

registerServiceWorker();

ReactDOM.render(<App />, document.querySelector('.content'));
