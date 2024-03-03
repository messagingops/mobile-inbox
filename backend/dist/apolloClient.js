"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.link = void 0;
const core_1 = require("@apollo/client/core");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
// Apollo Client setup
exports.link = new core_1.HttpLink({ uri: 'https://spacex-production.up.railway.app/', fetch: cross_fetch_1.default });
exports.client = new core_1.ApolloClient({
    cache: new core_1.InMemoryCache(),
    link: exports.link
});
exports.default = exports.client;
