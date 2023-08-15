import dotenv from 'dotenv'
import express, { Application } from 'express'
import mongoose from 'mongoose'

import deviceRouter from '@/routes/deviceRoute'

dotenv.config()
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME
const PORT = process.env.PORT

const app: Application = express()
app.use(express.json())

mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
  .then(() => console.log('Connected to AC Automatic DB!'))
  .catch(() => 'Failed to connect to DB')

app.use('/api/device', deviceRouter)

app.listen(PORT, () => {
  console.log('SERVER IS UP ON PORT:', PORT)
})
