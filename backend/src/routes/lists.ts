import express, { Router, Request, Response } from "express";
import apolloClient from '../apolloClient';
import { gql } from '@apollo/client/core';

const router: Router = Router();

router.use(express.urlencoded({ extended: false }));
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

// Graphql list query syntax
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

/*
  Get list
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
   Edit/create list
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

export default router;