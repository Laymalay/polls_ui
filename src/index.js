import 'bootstrap/dist/css/bootstrap.css';
import './styles/custom.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import * as serviceWorker from './serviceWorker';
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { setContext } from 'apollo-link-context';
import { from } from 'apollo-link';
import { AUTH_TOKEN } from './constants'

import { CookiesProvider } from 'react-cookie';
import { resolvers, typeDefs } from './resolvers';

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  credentials: 'omit',
});

const authMiddleware = setContext(async (req, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  return {
    headers: {
      ...headers,
      "Access-Control-Allow-Headers": "*",
      Authorization: token ? `JWT ${token}` : ''
    },
  };
});

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  cache: new InMemoryCache(),
  link: from([authMiddleware, httpLink]),
  credentials: 'omit',
  typeDefs,
  resolvers,
});

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
