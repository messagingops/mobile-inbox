import express, { Router, Request, Response } from "express";
import client from "../apolloClient";
import { gql } from "@apollo/client";

const router: Router = Router(); 
router.use(express.json)

router.post("/", async (req: Request, res: Response) => {
  const { name, phoneNumber, accountPhone, customFields, blocked } = req.body;

  const queryText = gql`
    mutation createOrUpdateContact(
      $name: String!
      $phoneNumber: String!
      $accountPhone: String!
      $customFields: [ContactCustomFieldInput]!
      $blocked: Boolean!
    ) {
      createOrUpdateContact(
        name: $name
        phoneNumber: $phoneNumber
        accountPhone: $accountPhone
        customFields: $customFields
        blocked: $blocked
      ) {
        id
        phoneNumber
        name
        mappedNumber
        createdAt
        lastUpdatedAt
        blocked
      }
    }
  `;

  try {
    const result = await client.mutate({
      mutation: queryText,
      variables: { name, phoneNumber, accountPhone, customFields, blocked },
    });
    res.json(result.data);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});


// ARYAN's version
router.get('/', async (req, res) => {
  const { primaryPhone, phoneNumber } = req.body;

  const queryText = gql`
      query contact($primaryPhone: String!, $phoneNumber: String!) {
        contact(primaryPhone: $primaryPhone, phoneNumber: $phoneNumber) {
          name
          id
          mappedNumber
          lists {
            name,
            size,
            createdBy,
            createdAt  
          }
          lastUpdatedAt
          blocked
        }
      }
    `;

  try {
    const response = await client.mutate({
      mutation: queryText,
      variables: { primaryPhone, phoneNumber},
      errorPolicy: 'all'
    });

    if (response.data && response.errors) {
      console.log("Operation partially succeeded:", response.data);
      console.log("But encountered errors:", response.errors);
    } else {
      res.json(response.data)
    }
  } catch(error) {
    console.log(error)
  }
});

/* AARAV ORIGINAL
router.get("/:primaryPhone/:phoneNumber", async (req: Request, res: Response) => {
    const { primaryPhone, phoneNumber } = req.params;

    const queryText = gql`
      query contact($primaryPhone: String!, $phoneNumber: String!) {
        contact(primaryPhone: $primaryPhone, phoneNumber: $phoneNumber) {
          name
          mappedNumber
          lastUpdatedAt
          blocked
        }
      }
    `;

    try {
      const result = await client.query({
        query: queryText,
        variables: { primaryPhone, phoneNumber },
      });
      res.json(result.data);
    } catch (error) {
      console.error("Error getting user:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  }
);
*/

router.put("/", async (req: Request, res: Response) => {
  const { name, phoneNumber, accountPhone, customFields, blocked } = req.body;

  const queryText = gql`
    mutation createOrUpdateContact(
      $name: String!
      $phoneNumber: String!
      $accountPhone: String!
      $customFields: [ContactCustomFieldInput]!
      $blocked: Boolean!
    ) {
      createOrUpdateContact(
        name: $name
        phoneNumber: $phoneNumber
        accountPhone: $accountPhone
        customFields: $customFields
        blocked: $blocked
      ) {
        id
        phoneNumber
        name
        mappedNumber
        createdAt
        lastUpdatedAt
        blocked
      }
    }
  `;

  try {
    const result = await client.mutate({
      mutation: queryText,
      variables: { name, phoneNumber, accountPhone, customFields, blocked },
    });
    res.json(result.data);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.delete("/", async (req: Request, res: Response) => {
  res.send("DELETE Request sent to contacts");
});

export default router;
