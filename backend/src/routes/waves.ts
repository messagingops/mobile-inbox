import express, { Router, Request, Response } from "express";
import apolloClient from '../apolloClient';
import { gql } from '@apollo/client/core';
import { identifierToKeywordKind } from "typescript";

const router: Router = Router()

router.use(express.urlencoded({ extended: false }));
router.use(express.json())

const WAVE_QUERY = gql`
   query wave($id: ID!) {
      wave(id: $id) {
         id
         scheduledTime
         name
         account {
            id
         }
         organization {
            id
         }
         body
         media
         sentBy
         lists {
            id
         }
         totalMessages
         totalMessagesDelivered
         totalMessagesFailed
         type
      }
   }
`;

const WAVE_MUTATION = gql`
   mutation createWave($scheduledTime: String!, $name: String!, body: String!, media: [String!], sentBy: String!, lists: [ID!], type: String!) {
      createWave(input: $input) {
         id
         scheduledTime
         name
         body
         media
         sentBy
         lists {
            id
            name
         }
         totalMessages
         totalMessagesDelivered
         totalMessagesFailed
         type
      }
   }
`;

router.post('/wave', async (req, res) => {
   const { scheduledTime, name, body, media, sentBy, lists, type } = req.body;

   try {
      const { data } = await apolloClient.mutate({
         mutation: WAVE_MUTATION,
         variables: { input: { scheduledTime, name, body, media, sentBy, lists, type } },
      });

      res.status(201).json(data);
   } catch (error) {
      console.error('Error creating wave:', error);
      res.status(500).json({ error: 'Internal server error' });
   }
});

router.get('/wave/:id', async (req, res) => {
   const { id } = req.params;

   try {
      const { data } = await apolloClient.query({
         query: WAVE_QUERY,
         variables: { id },
      });

      res.json(data);
   } catch (error) {
      console.error('Error fetching wave:', error);
      res.status(500).json({ error: 'Internal server error' });
   }
});


export default router;