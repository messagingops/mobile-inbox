import express, { Router, Request, Response } from "express";
const router: Router = Router();

router.use(express.urlencoded({ extended: false }));

router.post('/', (req: Request, res: Response) => {
    res.send('POST Request sent to messages')
})

router.get('/', (req: Request, res: Response) => {
    res.send('GET Request sent to messages')
})

router.put('/', (req: Request, res: Response) => {
    res.send('PUT Request sent to messages')
})

router.delete('/', (req: Request, res: Response) => {
    res.send('DELETE Request sent to messages')
})

export default router;