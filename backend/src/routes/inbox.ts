import express, { Router, Request, Response } from "express";
import client from "../apolloClient";
import { gql } from "@apollo/client";

const router: Router = Router();

router.get("/:from/:before?", async (req: Request, res: Response) => {
   const { from, before } = req.params;  // Extract 'from' and 'before' from URL path segments

   const queryText = gql`
       query inbox($from: String!, $before: String) {
           inbox(from: $from, before: $before) {
               items { 
                   contact {
                       name,
                   },
                   lastMessage,
                   isUnread,
                   lastMessageTime
               }
           }
       }
   `;

   try {
     const result = await client.query({
       query: queryText,
       variables: { from, before: before || null }, // Use 'null' or another default if 'before' is not provided
     });
     res.json(result.data);
   } catch (error) {
     console.error("Error getting user:", error);
     res.status(500).json({ error: "Failed to get user" });
   }
});


export default router;