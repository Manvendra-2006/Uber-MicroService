import express from 'express'
import proxy from 'express-http-proxy'
const app = express()
app.use("/user",proxy("http://localhost:3001"))
app.listen(3000,()=>{
    console.log("Gateway is running on port 3000")
})