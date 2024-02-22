import express, { Router, Request, Response } from "express";
const router: Router = Router()

router.use(express.urlencoded({ extended: false }));

router.post('/', (req: Request, res: Response) => {
   res.send('POST Request sent to lists')
})

router.get('/', (req: Request, res: Response) => {
   res.send('GET Request sent to lists')
})

router.put('/', (req: Request, res: Response) => {
   res.send('PUT Request sent to lists')
})

router.delete('/', (req: Request, res: Response) => {
   res.send('DELETE Request sent to lists')
})

export default router;