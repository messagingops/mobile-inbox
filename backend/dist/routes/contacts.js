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
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield axios_1.default.post("https://api.respondflow.com/graphql", {
            query: queryText,
            variables: {
                "name": name,
                "phoneNumber": phoneNumber,
                "accountPhone": accountPhone,
                "customFields": customFields,
                "blocked": blocked
            },
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NTIyMDQxMDUsImlhdCI6MTcwOTAwNDEwNSwicGVyIjoiO3JlYWQ6bWVzc2FnZXM7d3JpdGU6bWVzc2FnZXM7cmVhZDp3YXZlczt3cml0ZTp3YXZlcztyZWFkOmNvbnRhY3RzO3dyaXRlOmNvbnRhY3RzIiwib3JnIjo4MDIwfQ.GWTh10uDbJWVyN_SMTXIRzWGqwnT4nPZ20G1nDnUF2k",
            },
        });
        res.json(response.data);
    }
    catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.data && error.response.data.errors) {
            // Extract error messages
            const errorMessages = error.response.data.errors.map((err) => err.message);
            console.error("GraphQL Errors:", errorMessages);
            // Send error response
            res.status(500).json({ errors: errorMessages });
        }
        else {
            // Send general error response
            res.status(500).json({ error: error.message });
        }
    }
}));
router.get("/:primaryPhone/:phoneNumber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield axios_1.default.post("https://api.respondflow.com/graphql", {
            query: queryText,
            variables: {
                "primaryPhone": primaryPhone,
                "phoneNumber": phoneNumber,
            },
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NTIyMDQxMDUsImlhdCI6MTcwOTAwNDEwNSwicGVyIjoiO3JlYWQ6bWVzc2FnZXM7d3JpdGU6bWVzc2FnZXM7cmVhZDp3YXZlczt3cml0ZTp3YXZlcztyZWFkOmNvbnRhY3RzO3dyaXRlOmNvbnRhY3RzIiwib3JnIjo4MDIwfQ.GWTh10uDbJWVyN_SMTXIRzWGqwnT4nPZ20G1nDnUF2k",
            },
        });
        res.json(response.data);
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error });
    }
}));
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield axios_1.default.post("https://api.respondflow.com/graphql", {
            query: queryText,
            variables: {
                "name": name,
                "phoneNumber": phoneNumber,
                "accountPhone": accountPhone,
                "customFields": customFields,
                "blocked": blocked
            },
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NTIyMDQxMDUsImlhdCI6MTcwOTAwNDEwNSwicGVyIjoiO3JlYWQ6bWVzc2FnZXM7d3JpdGU6bWVzc2FnZXM7cmVhZDp3YXZlczt3cml0ZTp3YXZlcztyZWFkOmNvbnRhY3RzO3dyaXRlOmNvbnRhY3RzIiwib3JnIjo4MDIwfQ.GWTh10uDbJWVyN_SMTXIRzWGqwnT4nPZ20G1nDnUF2k",
            },
        });
        res.json(response.data);
    }
    catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.data && error.response.data.errors) {
            // Extract error messages
            const errorMessages = error.response.data.errors.map((err) => err.message);
            console.error("GraphQL Errors:", errorMessages);
            // Send error response
            res.status(500).json({ errors: errorMessages });
        }
        else {
            // Send general error response
            res.status(500).json({ error: error.message });
        }
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("DELETE Request sent to contacts");
}));
exports.default = router;
