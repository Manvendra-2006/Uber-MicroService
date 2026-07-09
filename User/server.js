import 'dotenv/config'
import http from 'http'
import app from './app.js'

const server = http.createServer(app) // yaha par express app ko node.js http server ke andar wrap up kar diye hain 
server.listen(3001,()=>{
    console.log("Server is running on port 3001")
})