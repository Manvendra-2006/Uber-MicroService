import express from 'express'
import morgan from 'morgan'
import router from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import { connectDb } from './config/config.js'
connectDb()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use("/api/auth",router)
export default app