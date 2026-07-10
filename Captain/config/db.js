import mongoose from "mongoose";
export async function connectDb(req,resp,next){
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DataBase is connected Successfully")
    }
    catch(error){
        console.log("DataBase is not connected Successfully")
    }
}