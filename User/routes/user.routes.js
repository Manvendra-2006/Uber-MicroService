import express from 'express'
import { getMe, LoginController, LogoutController, RegisterController } from '../controllers/user.controller.js'
import { AuthMiddleware } from '../middleware/authMiddleware.js'
const router = express.Router()
router.post("/signup",RegisterController)
router.post("/login",LoginController)
router.get("/logout",AuthMiddleware,LogoutController)
router.get("/get-me",AuthMiddleware, getMe)
export default router