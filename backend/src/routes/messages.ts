import express, { Router, Request, Response } from "express";
import apolloClient from '../apolloClient';
import { gql } from '@apollo/client/core';

const router: Router = Router();

router.use(express.urlencoded({ extended: false }));

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
    console.log("HEREHERE")
    console.log(req.body);
    const to = process.env.to_number;
    const from = process.env.from_number;
    const body = "Hello, this is a test message from express.";
    const media: string[] = []; // Assuming media is optional, otherwise provide test data
    const passthrough = 'test_passthrough_data';
  
    try {
      // Make the mutation request using Apollo Client
      const response = await apolloClient.mutate({
        mutation: MESSAGE_MUTATION,
        variables: { to, from, body, media, passthrough },
      });
  
      // Send the response back to the client
      res.json(response.data);
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: "Failed" });
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