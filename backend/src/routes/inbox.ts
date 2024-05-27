import express, { Router, Request, Response } from "express";
import { gql } from '@apollo/client/core'
import apolloClient from '../apolloClient'

const router: Router = Router()

router.use(express.urlencoded({ extended: false }));
router.use(express.json())

// GraphQL inbox query syntax
// include list in items -> contact?
const INBOX_QUERY = gql`
      query inbox(
         $from: String!,
         $before: String
      ) {
         inbox(
         from: $from,
         before: $before
         ) {
         items {
            contact {
               phoneNumber
            }
         }
         pageInfo {
            totalItems, 
            nextPage, 
            hasNextPage
         }
         }
      }
   `

   router.get('/', async (req, res) => {
   const { from, before = null} = req.body;

   try {
      // Make the mutation request using Apollo Client
      const response = await apolloClient.mutate({
         mutation: INBOX_QUERY,
         variables: { from, before },
         errorPolicy: 'all'
       });
       console.log()

router.get('/', (req: Request, res: Response) => {
   res.send('GET Request sent to inbox')
})
       if (response.data && response.errors) {
         console.log("Operation partially succeeded:", response.data);
         console.log("But encountered errors:", response.errors);
       } else {
         res.json(response.data);
       }  
   } catch (error) {
      console.log(error)
   }   
});

export default router;
