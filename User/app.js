import express from 'express'
import morgan from 'morgan'
import router from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import { connectDb } from './config/config.js'
import { connectRabbitMQ } from './service/rabit.js'
import { startAcceptedRideListener } from './event/user.event.js'
connectDb()
await connectRabbitMQ()
await startAcceptedRideListener()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use("/",router)
export default app