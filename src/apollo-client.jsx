import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { from } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import { resolvers, typeDefs } from "./resolvers";
import { onError } from 'apollo-link-error';

import { AUTH_TOKEN } from "./constants";

const GRAPHQL_ENDPOINT = `${process.env.REACT_APP_API_URL}/graphql`;

const uploadLink = createUploadLink({
  uri: GRAPHQL_ENDPOINT,
  headers: {
    "keep-alive": "true",
  }
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})


const authMiddleware = setContext(async (req, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  return {
    headers: {
      ...headers,
      "Access-Control-Allow-Headers": "*",
      Authorization: token ? `JWT ${token}` : ""
    }
  };
});

export const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
  link: from([errorLink, authMiddleware, uploadLink]),
  typeDefs,
  resolvers
});
