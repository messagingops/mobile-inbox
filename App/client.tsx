import { ApolloClient, InMemoryCache } from '@apollo/client';

// Initialize Apollo Client
export const client = new ApolloClient({
  uri: 'https://api.respondflow.com/graphql',
  cache: new InMemoryCache()
});