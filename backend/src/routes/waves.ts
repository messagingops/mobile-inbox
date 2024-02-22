import express, { Router, Request, Response } from "express";
const router: Router = Router()

router.use(express.urlencoded({ extended: false }));

router.post('/', (req: Request, res: Response) => {
   res.send('POST Request sent to waves')
})

router.get('/', (req: Request, res: Response) => {
   res.send('GET Request sent to waves')
})

router.put('/', (req: Request, res: Response) => {
   res.send('PUT Request sent to waves')
})

router.delete('/', (req: Request, res: Response) => {
   res.send('DELETE Request sent to waves')
})

export default router;