"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apolloClient_1 = __importDefault(require("../apolloClient"));
const client_1 = require("@apollo/client");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phoneNumber, accountPhone, customFields, blocked } = req.body;
    const queryText = (0, client_1.gql) `
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
        const result = yield apolloClient_1.default.mutate({
            mutation: queryText,
            variables: { name, phoneNumber, accountPhone, customFields, blocked },
        });
        res.json(result.data);
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
}));
router.get("/:primaryPhone/:phoneNumber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { primaryPhone, phoneNumber } = req.params;
    const queryText = (0, client_1.gql) `
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
        const result = yield apolloClient_1.default.query({
            query: queryText,
            variables: { primaryPhone, phoneNumber },
        });
        res.json(result.data);
    }
    catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ error: "Failed to get user" });
    }
}));
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phoneNumber, accountPhone, customFields, blocked } = req.body;
    const queryText = (0, client_1.gql) `
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
        const result = yield apolloClient_1.default.mutate({
            mutation: queryText,
            variables: { name, phoneNumber, accountPhone, customFields, blocked },
        });
        res.json(result.data);
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("DELETE Request sent to contacts");
}));
exports.default = router;
