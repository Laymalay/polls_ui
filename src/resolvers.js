import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    currentUser: UserType
  }
`;

export const resolvers = {};