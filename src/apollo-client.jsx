import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { from } from "apollo-link";
import { AUTH_TOKEN } from "./constants";

import { resolvers, typeDefs } from "./resolvers";

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  credentials: "omit"
});

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
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  cache: new InMemoryCache(),
  link: from([authMiddleware, httpLink]),
  credentials: "omit",
  typeDefs,
  resolvers
});
