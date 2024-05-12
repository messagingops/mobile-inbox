import { ApolloClient, InMemoryCache, HttpLink, from} from '@apollo/client/core';
import { onError } from "@apollo/client/link/error"
import dotenv from 'dotenv';
import fetch from 'cross-fetch';

dotenv.config();

// Error printing for debugging
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
 }
});

// Apollo Client setup
export const link = new HttpLink({ 
  uri: 'https://api.respondflow.com/graphql', 
  fetch,
  headers: {
    "Content-Type": 'application/json',
    "Authorization": `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NTIyMDQxMDUsImlhdCI6MTcwOTAwNDEwNSwicGVyIjoiO3JlYWQ6bWVzc2FnZXM7d3JpdGU6bWVzc2FnZXM7cmVhZDp3YXZlczt3cml0ZTp3YXZlcztyZWFkOmNvbnRhY3RzO3dyaXRlOmNvbnRhY3RzIiwib3JnIjo4MDIwfQ.GWTh10uDbJWVyN_SMTXIRzWGqwnT4nPZ20G1nDnUF2k'}`}
 })  

 export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, link])
})

export default apolloClient;