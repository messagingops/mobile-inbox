import express, { Router, Request, Response } from "express";
import apolloClient from '../apolloClient';
import { gql } from '@apollo/client/core';

const router: Router = Router()

router.use(express.urlencoded({ extended: false }));
router.use(express.json())

router.get('/', (req: Request, res: Response) => {
    // Example Apollo Client Query
})

export default router;