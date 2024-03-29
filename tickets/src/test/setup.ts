import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import { app } from '../app'

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[]
    }
  }
}

let mongo: any
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfsf'

  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

beforeEach(async () => {
  // Get all collections from mongo memory with mongoose
  const collections = await mongoose.connection.db.collections()
  // Delete all collection before each test
  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.signin = () => {
  // Build a JWT payload { id, email }
  const payload = {
    id: '13hohhsldfhl2',
    email: 'test@test.com'
  }

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!)

  // Build session object. { jwt: MY_JWT }
  const session = { jwt: token }

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session)

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64')

  // return a string that the cookie with the encoded data
  return [`express:sess=${base64}`]
}
