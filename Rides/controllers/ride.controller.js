import ride from "../models/ride.model.js"
import { publishToQueue } from "../service/rabit.js"

export async function CreateRideController(req,resp){
try{
      const {pickup,destination} = req.body
      if(!pickup || !destination){
        return resp.status(404).json({message:"All Fields are required"})
      }
      
      const newRide =await ride.create({
        user:req.user.userProfileData._id,
        pickup,
        destination
      })
       
      publishToQueue("new-ride",JSON.stringify(newRide))
      
return resp.status(201).json({
    message: "Ride Created Successfully",
    newRide
});

}
catch(error){
    return resp.status(500).json({message:"Internal Server Error",error})
}
}

export async function AcceptRide(req,resp){
    try{
          const {rideId}   = req.query
          const ride = await ride.findById(rideId)
            if(!ride){
                return resp.status(404).json({message:"Ride not found"})
            }
            ride.status = 'accepted'
            await ride.save()
            publishToQueue("ride-accepted",JSON.stringify(ride))
            resp.send(ride)
          
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}