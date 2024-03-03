"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const apolloClient_1 = __importDefault(require("../apolloClient"));
const core_1 = require("@apollo/client/core");
const router = (0, express_1.Router)();
router.use(express_1.default.urlencoded({ extended: false }));
router.get('/', (req, res) => {
    // Example Apollo Client Query
    apolloClient_1.default
        .query({
        query: (0, core_1.gql) `
      {
         launchesPast(limit: 10) {
           mission_name
           launch_date_local
           launch_site {
             site_name_long
           }
           links {
             article_link
             video_link
           }
           rocket {
             rocket_name
           }
         }
       }
      `
    })
        .then(result => res.send(result));
});
exports.default = router;
