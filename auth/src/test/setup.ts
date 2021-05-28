import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { Collection } from 'mongoose'
import { app } from '../app'

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
