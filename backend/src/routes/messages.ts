import express, { Router, Request, Response } from "express";
import apolloClient from '../apolloClient';
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

router.post('/', async (req, res) => {
    const { to, from, body } = req.body;
    const media : string[] = []
    const passthrough = ""
  
    try {
      // Make the mutation request using Apollo Client
      const response = await apolloClient.mutate({
        mutation: MESSAGE_MUTATION,
        variables: { to, from, body, media, passthrough },
      });

      if (response.data && response.errors) {
        console.log("Operation partially succeeded:", response.data);
        console.log("But encountered errors:", response.errors);
      } else {
        res.json(response.data);
      }
  
      // Send the response back to the client
      
    } catch (error) {
      
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