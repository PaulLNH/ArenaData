import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import App from './App';
import * as serviceWorker from './serviceWorker';

// const authConfig = {
//     issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`,
//     redirect_uri: `${window.location.origin}/implicit/callback`,
//     client_id: process.env.REACT_APP_OKTA_CLIENT_ID,
// };

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) module.hot.accept();