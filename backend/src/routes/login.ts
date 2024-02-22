import express, { Router, Request, Response } from "express";
const router: Router = Router()

router.use(express.urlencoded({ extended: false }));

router.post('/', (req: Request, res: Response) => {
    console.log(req.body.account);
    res.send('POST Request sent to login')
})

export default router;
