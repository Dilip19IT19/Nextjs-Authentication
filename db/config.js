import mongoose from "mongoose"

const connectDB=async()=>{
    try
    {
        await mongoose.connect(process.env.MONGODB_URI,{
            tls:true
        });
        console.log("Successfully connected to mongodb");

    }
    catch(err)
    {
        console.log("Failed to connect mongodb and the error is :"+err);
    }
}

export default connectDB;