import express, { Router, Request, Response } from "express";
import apolloClient from '../apolloClient';
import { gql } from '@apollo/client/core';

const router: Router = Router()

router.use(express.urlencoded({ extended: false }));

router.get('/', (req: Request, res: Response) => {
    // Example Apollo Client Query
   apolloClient
   .query({
      query: gql`
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
})

export default router;