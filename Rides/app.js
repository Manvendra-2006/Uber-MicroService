import cookieParser from 'cookie-parser'
import express from 'express'
import rideRouter from './routes/ride.routes.js'
import { connectRabbitMQ } from './service/rabit.js'
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
await connectRabbitMQ()
await 
app.use("/",rideRouter)

export default app