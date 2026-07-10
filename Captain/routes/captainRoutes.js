import express from 'express'
import { RegisterController,LoginController,getMe,LogoutController, AvailableController } from '../controllers/captain.controller.js'
import { AuthMiddleware } from '../middleware/authMiddleware.js'
const captainRouter = express.Router()
captainRouter.post("/signup",RegisterController)
captainRouter.post("/login",LoginController)
captainRouter.get("/logout",AuthMiddleware,LogoutController)
captainRouter.get("/get-me",AuthMiddleware, getMe)
captainRouter.put("/available",AuthMiddleware,AvailableController)
export default captainRouter