import express, { Request, Response } from 'express'
import { requireAuth } from '@mictickets/common'

const router = express.Router()

router.post('/api/tickets', requireAuth, (req: Request, res: Response) => {
  console.log('create tickets')
  res.sendStatus(200)
})

export { router as createTicketRouter }
