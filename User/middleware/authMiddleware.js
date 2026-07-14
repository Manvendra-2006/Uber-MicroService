import BlackList from "../models/blacklist.model.js"
import jwt from "jsonwebtoken"
export async function AuthMiddleware(req,resp,next){
    try{
        const token = req.cookies.token || req.headers.authorization.split(" ")[1]
        if(!token){
            return resp.status(400).json({message:"TOken required"})
        }
        const decoded = jwt.verify(token,process.env.JWT_TOKEN)        
        const blacklist = await BlackList.findOne({
            userId:decoded.id,
            token
        })
        if(blacklist){
            return resp.status(400).json({message:"TOken is blacklisted"})
        }
        req.userId = decoded.id
        next()
    }
    catch(error){
        console.log(error)
    }
}   