import express, { Router, Request, Response } from "express";
const router: Router = Router()

router.post('/', (req: Request, res: Response) => {
  res.send('POST Request sent to contacts')
})

router.get('/', (req: Request, res: Response) => {
  res.send('GET Request sent to contacts')
})

router.put('/', (req: Request, res: Response) => {
  res.send('PUT Request sent to contacts')
})

router.delete('/', (req: Request, res: Response) => {
  res.send('DELETE Request sent to contacts')
})

export default router;