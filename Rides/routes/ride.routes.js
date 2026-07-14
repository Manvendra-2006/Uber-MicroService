import express from 'express'
import { AuthMiddleware, CaptainAuthMiddleware } from '../middleware/auth.middleware.js'
import { AcceptRide, CreateRideController } from '../controllers/ride.controller.js'
const rideRouter = express.Router()
rideRouter.post("/create-ride",AuthMiddleware,CreateRideController)
rideRouter.put("/accept-ride",CaptainAuthMiddleware,AcceptRide)
export default rideRouter