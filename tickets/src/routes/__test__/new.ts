import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { requireAuth, validateRequest } from '@mictickets/common'

const router = express.Router()

router.post('/api/tickets', requireAuth, [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title must be valid'),
  body('price')
    .isFloat({gt: 0})
    .withMessage('Price must be greater than 0')
], validateRequest, (req: Request, res: Response) => {
  console.log('create tickets')
  res.sendStatus(200)
})

export { router as createTicketRouter }
