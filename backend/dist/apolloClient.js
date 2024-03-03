"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apolloClient = exports.link = void 0;
const core_1 = require("@apollo/client/core");
const error_1 = require("@apollo/client/link/error");
const dotenv_1 = __importDefault(require("dotenv"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
dotenv_1.default.config();
// Error printing for debugging
const errorLink = (0, error_1.onError)(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log('graphQLErrors', graphQLErrors);
    }
    if (networkError) {
        console.log('networkError', networkError);
    }
});
// Apollo Client setup
exports.link = new core_1.HttpLink({
    uri: 'https://api.respondflow.com/graphql',
    fetch: cross_fetch_1.default,
    headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${process.env.VOLT_API_KEY}`
    }
});
exports.apolloClient = new core_1.ApolloClient({
    cache: new core_1.InMemoryCache(),
    link: (0, core_1.from)([errorLink, exports.link])
});
exports.default = exports.apolloClient;
