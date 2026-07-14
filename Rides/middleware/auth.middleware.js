import axios from "axios"
import jwt from 'jsonwebtoken'
// userAuth Middleware
  export async function AuthMiddleware(req,resp,next){
    try{
            const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
            if(!token){
                return resp.status(401).json({message:"Unauthorized User"})
            }
            const decoded = jwt.verify(token,process.env.JWT_TOKEN)
            const response = await axios.get(`${process.env.BASE_URL}/user/get-me`,{ // Synchronus communication 
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
            const user = response.data
            console.log(user)
            if(!user){
                return resp.status(401).json({message:"Unauthorized User"})
            }
            req.user = user
            next()
    }
    catch(error){
        console.log(error)
        return resp.status(404).json({message:"Unauthorized User"})
    }
  }

  // CaptainAuth Middleware

 export async function CaptainAuthMiddleware(req,resp,next){
    try{
            const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
            if(!token){
                return resp.status(401).json({message:"Unauthorized User"})
            }
            const decoded = jwt.verify(token,process.env.JWT_TOKEN)
            const response = await axios.get(`${process.env.BASE_URL}/captain/get-me`,{ // Synchronus communication 
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
            const captain = response.data
            console.log(captain)
            if(!captain){
                return resp.status(401).json({message:"Unauthorized User"})
            }
            req.captain = captain
            next()
    }
    catch(error){
        console.log(error)
        return resp.status(404).json({message:"Unauthorized User"})
    }
  }
