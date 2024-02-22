import express, { Router, Request, Response } from "express";
const router: Router = Router()

router.use(express.urlencoded({ extended: false }));

router.get('/', (req: Request, res: Response) => {
   res.send('GET Request sent to inbox')
})

export default router;