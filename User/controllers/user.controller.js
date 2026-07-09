import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'
import BlackList from '../models/blacklist.model.js'
export async function RegisterController(req,resp){
    try{
            const {name,email,password} = req.body
            if(!name||!email||!password){
                return resp.status(404).json({message:"All Fields are required"})
            }
            const isUserExists = await User.findOne({email})
            if(isUserExists){
                return resp.status(404).json({message:"User already exists"})
            }
            const hashPassword = await bcrypt.hash(password,10)
            if(!hashPassword){
                return resp.status(404).json({message:"Password is not hashed"})
            }
            const newUser = await User.create({
                name,
                email,
                password:hashPassword
            })
            if(newUser){
                return resp.status(201).json({message:"User is created",newUser})
            }
    }       
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}

export async function LoginController(req,resp){
    try{
        const {email,password} = req.body
        if(!email||!password){
            return resp.status(404).json({message:"All fields are required"})
        }
        const isUserExists = await User.findOne({email})
        if(!isUserExists){
            return resp.status(404).json({message:"User is not registered"})
        }
        const compare = await bcrypt.compare(password,isUserExists.password)
        const token = await jwt.sign(
            {id:isUserExists._id},
            process.env.JWT_TOKEN,
            {expiresIn:'7d'}
        )
        resp.cookie("token",token)
        return resp.status(200).json({message:"Login Successfully",token,isUserExists})
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}

export async function LogoutController(req,resp){
    try{
        const token = req.cookies.token
        if(!token){
            return resp.status(404).json({message:"Token required"})
        }
        const decoded = jwt.verify(token,process.env.JWT_TOKEN)
        const isToken = await BlackList.create({
            userId:decoded.id,
            token
        })
        resp.clearCookie("token")
        return resp.status(200).json({message:"Logout Successfully"})
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}
export async function getMe(req,resp){
    try{
        const userId = req.userId
        if(!userId){
            return resp.status(400).json({message:"Token is expired"})
        }
        const userProfileData = await User.findOne({
            _id:userId
        })
        if(userProfileData){
            return resp.status(201).json({message:"User Profile Fetched Successfully",userProfileData})
        }
    }   
    catch(error){
            return resp.status(500).json({message:"Internal Server Error",error})
    }
}