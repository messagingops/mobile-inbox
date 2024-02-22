import { ApolloClient, InMemoryCache, HttpLink} from '@apollo/client/core';
import fetch from 'cross-fetch';


// Apollo Client setup
export const link = new HttpLink({ uri: 'https://spacex-production.up.railway.app/', fetch })  

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
  })

export default client;