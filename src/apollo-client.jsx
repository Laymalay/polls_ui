import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { from } from "apollo-link";
import { createUploadLink } from 'apollo-upload-client';
import { resolvers, typeDefs } from "./resolvers";

import { AUTH_TOKEN } from "./constants";

const GRAPHQL_ENDPOINT =  `${process.env.REACT_APP_API_URL}/graphql`;

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const uploadLink = createUploadLink({
  uri: GRAPHQL_ENDPOINT,
  // headers: {
  //   "keep-alive": "true",
  //   "content-type": "application/json"
  // }
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
  link: from([authMiddleware, uploadLink]),
  typeDefs,
  resolvers
});
