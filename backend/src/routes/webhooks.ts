import express, { Router, Request, Response } from "express";
import apolloClient from '../apolloClient';
import { ApolloError } from '@apollo/client';
import { gql } from '@apollo/client/core';
import client from "../apolloClient";

const router: Router = Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json())

// Register Webhook
router.post("/register", async (req: Request, res: Response) => {
    const { url, primaryPhone, eventTypes } = req.body;
  
    const REGISTER_WEBHOOK_MUTATION = gql`
      mutation registerWebhook($url: String!, $primaryPhone: String, $eventTypes: [WebhookEventType]) {
        registerWebhook(url: $url, primaryPhone: $primaryPhone, eventTypes: $eventTypes) {
          id
          url
          createdAt
          lastUpdatedAt
          primaryPhone
          eventTypes
        }
      }
    `;
  
    try {
      const result = await client.mutate({
        mutation: REGISTER_WEBHOOK_MUTATION,
        variables: { url, primaryPhone, eventTypes },
      });
      res.json(result.data.registerWebhook);
    } catch (error) {
      console.error("Error registering webhook:", error);
      res.status(500).json({ error: "Failed to register webhook" });
    }
  });
  
  // Delete Webhook
  router.delete("/delete", async (req: Request, res: Response) => {
    const { id } = req.body;
  
    const DELETE_WEBHOOK_MUTATION = gql`
      mutation deleteWebhook($id: ID!) {
        deleteWebhook(id: $id) {
          id
          url
          createdAt
          lastUpdatedAt
          primaryPhone
          eventTypes
        }
      }
    `;
  
    try {
      const result = await client.mutate({
        mutation: DELETE_WEBHOOK_MUTATION,
        variables: { id },
      });
      res.json(result.data.deleteWebhook);
    } catch (error) {
      console.error("Error deleting webhook:", error);
      res.status(500).json({ error: "Failed to delete webhook" });
    }
  });
  
  // Query Webhooks
  router.get("/", async (req: Request, res: Response) => {
    const GET_WEBHOOKS_QUERY = gql`
      query webhooks {
        webhooks {
          id
          url
          createdAt
          lastUpdatedAt
          primaryPhone
          eventTypes
        }
      }
    `;
  
    try {
      const result = await client.query({
        query: GET_WEBHOOKS_QUERY,
      });
      res.json(result.data.webhooks);
    } catch (error) {
      console.error("Error fetching webhooks:", error);
      res.status(500).json({ error: "Failed to fetch webhooks" });
    }
  });

  // Handle incoming webhook events
  router.post("/", (req: Request, res: Response) => {
    try {
      const event = req.body;
      const io = req.app.get('socketio');
      // Emit the event to all connected clients
      io.emit('messageEvent', event);
      console.log('Webhook received:', req.body);
      res.status(200).send('Event received');
    } catch (error) {
      console.error("Error handling webhook event:", error);
      res.status(500).json({ error: "Failed to handle webhook event" });
    }
  });
  

export default router;