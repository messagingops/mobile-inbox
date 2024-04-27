import express, { Router, Request, Response } from "express"
import apolloClient from '../apolloClient'
import { gql } from '@apollo/client/core'

const router: Router = Router()

router.use(express.json())

// GraphQL list mutation syntax
const LIST_MUTATION = gql`mutation createOrUpdateList(
  $primaryPhone: String!,
  $listQuery: ListQuery!
) {
  createOrUpdateList(
    primaryPhone: $primaryPhone,
    listQuery: $listQuery
  ) {
    id
    createdBy
    name
    createdAt
    lastUpdatedAt
    size
    querySourceListName
    queryNameSearchTerm
  }
}
`

// GraphQL list query syntax
const LIST_QUERY = gql`
query list(
  $primaryPhone: String!,
  $listName: String!
) {
  list(
    primaryPhone: $primaryPhone,
    listName: $listName
  ) {
    id
    createdBy
    name
    createdAt
    lastUpdatedAt
    size
    querySourceListName
    queryNameSearchTerm
  }
}`

// GraphQL add addContactsToList query syntax
const ADD_CONTACTS_TO_LIST_MUTATION = gql`
mutation addContactsToList(
  $primaryPhone: String!,
  $listName: String!,
  $phoneNumbers: [String!]!
) {
  addContactsToList(
    primaryPhone: $primaryPhone,
    listName: $listName,
    phoneNumbers: $phoneNumbers
  ) {
    id
    createdBy
    name
    createdAt
    lastUpdatedAt
    size
    querySourceListName
    queryNameSearchTerm
  }
}`

/*
 Get list with GET request
*/
router.get('/', async (req, res) => {
  const { primaryPhone, listName } = req.body;

 try {
   // Make the mutation request using Apollo Client
   const response = await apolloClient.mutate({
     mutation: LIST_QUERY,
     variables: { primaryPhone, listName },
     errorPolicy: 'all'
   });
   
   if (response.data && response.errors) {
     console.log("Operation partially succeeded:", response.data);
     console.log("But encountered errors:", response.errors);
   } else {
    // Send the response back to the client
     res.json(response.data);
   }   
 } catch (error) {
    console.log(error)
 }   
});

/*
 Edit/create list with POST request
*/
router.post('/', async (req, res) => {
    const { primaryPhone, listQuery } = req.body;

   try {
     // Make the mutation request using Apollo Client
     const response = await apolloClient.mutate({
       mutation: LIST_MUTATION,
       variables: { primaryPhone, listQuery },
     });

     if (response.data && response.errors) {
       console.log("Operation partially succeeded:", response.data);
       console.log("But encountered errors:", response.errors);
     } else {
      // Send the response back to the client
       res.json(response.data);
     }
     
   } catch (error) {
      console.log(error)
   }   
 });

 /*
  Add contacts to list with PUT request
 */
  router.put('/', async (req, res) => {
    const { primaryPhone, listName, phoneNumbers } = req.body;

   try {
     // Make the mutation request using Apollo Client
     const response = await apolloClient.mutate({
       mutation: ADD_CONTACTS_TO_LIST_MUTATION,
       variables: { primaryPhone, listName, phoneNumbers },
     });

     if (response.data && response.errors) {
       console.log("Operation partially succeeded:", response.data);
       console.log("But encountered errors:", response.errors);
     } else {
      // Send the response back to the client
       res.json(response.data);
     }
     
   } catch (error) {
      console.log(error)
   }   
 });

export default router;
