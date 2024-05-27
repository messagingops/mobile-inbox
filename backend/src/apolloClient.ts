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
    "Authorization": `Bearer ${process.env.VOLT_API_KEY}`}
 })  

 export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, link])
})

export default apolloClient;
