import express from 'express'
import { connectDb } from './config/db.js'
import captainRouter from './routes/captainRoutes.js'
import cookieParser from 'cookie-parser'

const app = express()
connectDb()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use("/",captainRouter)
export default app