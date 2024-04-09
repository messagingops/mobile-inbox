import express, { Router, Request, Response } from "express";
import apolloClient from '../apolloClient';
import { ApolloError } from '@apollo/client';
import { gql } from '@apollo/client/core';

const router: Router = Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json())

const MESSAGE_MUTATION = gql`
  mutation createMessage($to: String!, $from: String!, $body: String!, $media: [String!], $passthrough: String) {
    createMessage(to: $to, from: $from, body: $body, media: $media, passthrough: $passthrough) {
      id
      legacyId
      toNumber
      fromNumber
      status
      statusDescription
      media
      body
      sentAt
      confirmedAt
      errorCode
    }
  }
`;

/*
ERROR: Issue with failure to retrieve error code in graphQLErrors
WILL FIX :D
*/
router.post('/', async (req, res) => {
    const { to, from, body } = req.body;
    const media : string[] = []
    const passthrough = ""
    
  
    try {
      // Make the mutation request using Apollo Client
      const response = await apolloClient.mutate({
        mutation: MESSAGE_MUTATION,
        variables: { to, from, body, media, passthrough },
        errorPolicy: 'all'
      });
      res.json(response.data);
      
  
      // Send the response back to the client
      
    } catch (error) {
      // TypeScript knows error is of type 'unknown', so we narrow it down
      if (error instanceof ApolloError) {
        if (error.networkError) {
          console.error("Network error:", error.networkError);
          res.status(500).json({ error: "Network error occurred" });
        } else if (error.graphQLErrors) {
          error.graphQLErrors.forEach((err) => {
            console.error("GraphQL error:", err.message);
          });
          // Respond with the first GraphQL error message for simplicity
          res.status(500).json({ error: error.graphQLErrors[0]?.message || "GraphQL error occurred" });
        } else {
          // Handle other ApolloError cases
          res.status(500).json({ error: "An Apollo client error occurred" });
        }
      } else {
        // For non-Apollo errors, you might still want to check if it's an instance of Error
        if (error instanceof Error) {
          console.error("An error occurred:", error.message);
          res.status(500).json({ error: error.message });
        } else {
          // Fallback for when the error isn't an instance of Error
          console.error("An unknown error occurred:", error);
          res.status(500).json({ error: "An unknown error occurred" });
        }
      }
    }
    
  });

router.get('/', (req: Request, res: Response) => {
    res.send('GET Request sent to messages')
})

router.put('/', (req: Request, res: Response) => {
    res.send('PUT Request sent to messages')
})

router.delete('/', (req: Request, res: Response) => {
    res.send('DELETE Request sent to messages')
})

export default router;