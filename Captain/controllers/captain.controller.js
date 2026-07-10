import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Captain from '../models/captain.models.js'
import BlackList from '../models/blacklist.model.js'
export async function RegisterController(req, resp) {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return resp.status(404).json({ message: "All Fields are required" })
        }
        const iscaptainExists = await Captain.findOne({ email })
        if (iscaptainExists) {
            return resp.status(404).json({ message: "captain already exists" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        if (!hashPassword) {
            return resp.status(404).json({ message: "Password is not hashed" })
        }
        const newcaptain = await Captain.create({
            name,
            email,
            password: hashPassword
        })
        if (newcaptain) {
            return resp.status(201).json({ message: "captain is created", newcaptain })
        }
    }
    catch (error) {
        return resp.status(500).json({ message: "Internal Server Error", error })
    }
}

export async function LoginController(req, resp) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return resp.status(404).json({ message: "All fields are required" })
        }
        const iscaptainExists = await Captain.findOne({ email })
        if (!iscaptainExists) {
            return resp.status(404).json({ message: "captain is not registered" })
        }
        const compare = await bcrypt.compare(password, iscaptainExists.password)
        const token = await jwt.sign(
            { id: iscaptainExists._id },
            process.env.JWT_TOKEN,
            { expiresIn: '7d' }
        )
        resp.cookie("token", token)
        return resp.status(200).json({ message: "Login Successfully", token, iscaptainExists })
    }
    catch (error) {
        return resp.status(500).json({ message: "Internal Server Error", error })
    }
}

export async function LogoutController(req, resp) {
    try {
        const token = req.cookies.token
        if (!token) {
            return resp.status(404).json({ message: "Token required" })
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        const isToken = await BlackList.create({
            captainId: decoded.id,
            token
        })
        resp.clearCookie("token")
        return resp.status(200).json({ message: "Logout Successfully" })
    }
    catch (error) {
        return resp.status(500).json({ message: "Internal Server Error", error })
    }
}
export async function getMe(req, resp) {
    try {
        const captainId = req.captainId
        if (!captainId) {
            return resp.status(400).json({ message: "Token is expired" })
        }
        const captainProfileData = await Captain.findOne({
            _id: captainId
        })
        if (captainProfileData) {
            return resp.status(201).json({ message: "captain Profile Fetched Successfully", captainProfileData })
        }
    }
    catch (error) {
        return resp.status(500).json({ message: "Internal Server Error", error })
    }
}

export async function AvailableController(req, resp) {
    try {
        const captainId = req.captainId
        const captainData = await Captain.findOne({
            _id:captainId
        })
        if (!captainData) {
            return res.status(404).json({
                message: "Captain not found"
            });
        }
        if(captainData.isAvailable===true){
            captainData.isAvailable= false
            await captainData.save()
        }
        else{
             captainData.isAvailable= true
               await captainData.save()
        }
        return resp.status(200).json({message:"Availability Changed Successfully"})
    }
    catch (error) {
        return resp.status(500).json({ message: "Internal Server Error", error })
    }
}