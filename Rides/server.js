import http from 'http'
import 'dotenv/config'
import app from './app.js'
import { connectDb } from './config/db.js'
connectDb()
const server = http.createServer(app)
server.listen(3003,()=>{
    console.log("Server is running on port 3003")
})