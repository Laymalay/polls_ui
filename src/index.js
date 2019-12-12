import 'bootstrap/dist/css/bootstrap.css';
import './styles/custom.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { AUTH_TOKEN } from './constants'

import { CookiesProvider } from 'react-cookie';

import { client } from './apollo-client';

client.cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem(AUTH_TOKEN),
  },
});

ReactDOM.render(
  <CookiesProvider>
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <App />
      </ApolloHooksProvider>
    </ApolloProvider>
  </CookiesProvider>,
  document.getElementById('root')
)

serviceWorker.unregister();
