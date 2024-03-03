import express, { Router, Request, Response } from "express";
import client from "../apolloClient";
import { gql } from "@apollo/client";
import axios from "axios";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, phoneNumber, accountPhone, customFields, blocked } = req.body;

  const queryText = `mutation createOrUpdateContact(
    $name: String!,
    $phoneNumber: String!,
    $accountPhone: String!,
    $customFields: [ContactCustomFieldInput]!,
    $blocked: Boolean!
  ) {
    createOrUpdateContact(
      name: $name,
      phoneNumber: $phoneNumber,
      accountPhone: $accountPhone,
      customFields: $customFields,
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
  }`;

  try {
    const response = await axios.post(
      "https://api.respondflow.com/graphql",
      {
        query: queryText,
        variables: {
          name: name,
          phoneNumber: phoneNumber,
          accountPhone: accountPhone,
          customFields: customFields,
          blocked: blocked,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NTIyMDQxMDUsImlhdCI6MTcwOTAwNDEwNSwicGVyIjoiO3JlYWQ6bWVzc2FnZXM7d3JpdGU6bWVzc2FnZXM7cmVhZDp3YXZlczt3cml0ZTp3YXZlcztyZWFkOmNvbnRhY3RzO3dyaXRlOmNvbnRhY3RzIiwib3JnIjo4MDIwfQ.GWTh10uDbJWVyN_SMTXIRzWGqwnT4nPZ20G1nDnUF2k",
        },
      }
    );

    res.json(response.data);
  } catch (error: any) {
    console.error("Error:", error);

    if (error.response && error.response.data && error.response.data.errors) {
      // Extract error messages
      const errorMessages = error.response.data.errors.map(
        (err: any) => err.message
      );

      console.error("GraphQL Errors:", errorMessages);

      // Send error response
      res.status(500).json({ errors: errorMessages });
    } else {
      // Send general error response
      res.status(500).json({ error: error.message });
    }
  }
});

router.get(
  "/:primaryPhone/:phoneNumber",
  async (req: Request, res: Response) => {
    const { primaryPhone, phoneNumber } = req.params;

    const queryText = `query contact(
      $primaryPhone: String!,
      $phoneNumber: String!
    ) {
      contact(
        primaryPhone: $primaryPhone,
        phoneNumber: $phoneNumber
      ) {
        name
        mappedNumber
        lastUpdatedAt
        blocked
      }
    }`;

    try {
      const response = await axios.post(
        "https://api.respondflow.com/graphql",
        {
          query: queryText,
          variables: {
            primaryPhone: primaryPhone,
            phoneNumber: phoneNumber,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NTIyMDQxMDUsImlhdCI6MTcwOTAwNDEwNSwicGVyIjoiO3JlYWQ6bWVzc2FnZXM7d3JpdGU6bWVzc2FnZXM7cmVhZDp3YXZlczt3cml0ZTp3YXZlcztyZWFkOmNvbnRhY3RzO3dyaXRlOmNvbnRhY3RzIiwib3JnIjo4MDIwfQ.GWTh10uDbJWVyN_SMTXIRzWGqwnT4nPZ20G1nDnUF2k",
          },
        }
      );

      res.json(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error });
    }
  }
);

router.put("/", async (req: Request, res: Response) => {
  const { name, phoneNumber, accountPhone, customFields, blocked } = req.body;

  const queryText = `mutation createOrUpdateContact(
    $name: String!,
    $phoneNumber: String!,
    $accountPhone: String!,
    $customFields: [ContactCustomFieldInput]!,
    $blocked: Boolean!
  ) {
    createOrUpdateContact(
      name: $name,
      phoneNumber: $phoneNumber,
      accountPhone: $accountPhone,
      customFields: $customFields,
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
  }`;

  try {
    const response = await axios.post(
      "https://api.respondflow.com/graphql",
      {
        query: queryText,
        variables: {
          name: name,
          phoneNumber: phoneNumber,
          accountPhone: accountPhone,
          customFields: customFields,
          blocked: blocked,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NTIyMDQxMDUsImlhdCI6MTcwOTAwNDEwNSwicGVyIjoiO3JlYWQ6bWVzc2FnZXM7d3JpdGU6bWVzc2FnZXM7cmVhZDp3YXZlczt3cml0ZTp3YXZlcztyZWFkOmNvbnRhY3RzO3dyaXRlOmNvbnRhY3RzIiwib3JnIjo4MDIwfQ.GWTh10uDbJWVyN_SMTXIRzWGqwnT4nPZ20G1nDnUF2k",
        },
      }
    );

    res.json(response.data);
  } catch (error: any) {
    console.error("Error:", error);

    if (error.response && error.response.data && error.response.data.errors) {
      // Extract error messages
      const errorMessages = error.response.data.errors.map(
        (err: any) => err.message
      );

      console.error("GraphQL Errors:", errorMessages);

      // Send error response
      res.status(500).json({ errors: errorMessages });
    } else {
      // Send general error response
      res.status(500).json({ error: error.message });
    }
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  res.send("DELETE Request sent to contacts");
});

export default router;
