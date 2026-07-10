import mongoose from "mongoose";
const blacklistSchema = mongoose.Schema({
    captainId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Captain",
        required:true
    },
    token:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
export default mongoose.model("BlackList",blacklistSchema)