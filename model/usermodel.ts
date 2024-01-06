import mongoose, { Schema } from "mongoose";

const userSchema=new mongoose.Schema({
   name:{
    required:false,
    type:Schema.Types.String
   },
   email:{
    required:false,
    type:Schema.Types.String,
    unique:true
   },
   password:{
    required:false,
    type:Schema.Types.String
   }
})

const userModel=mongoose.models.Users || mongoose.model('Users',userSchema);

export default userModel;