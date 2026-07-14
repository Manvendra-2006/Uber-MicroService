import express from 'express'
import { connectDb } from './config/db.js'
import captainRouter from './routes/captainRoutes.js'
import cookieParser from 'cookie-parser'
import { connectRabbitMQ } from './service/rabit.js'
import { startRideListener } from './events/ride.event.js'

const app = express()
connectDb()
await connectRabbitMQ()
await startRideListener()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use("/",captainRouter)
export default app