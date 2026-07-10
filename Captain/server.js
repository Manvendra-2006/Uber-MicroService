import 'dotenv/config'
import http from 'http'
import app from './app.js'
const server = http.createServer(app)
server.listen(3002,()=>{
    console.log("Server is running on port 3002")
})