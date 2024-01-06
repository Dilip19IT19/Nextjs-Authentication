import connectDB from "@/db/config.js";
import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from '@vinejs/vine'
import { loginSchema } from "@/validator/authSchema";
import ErrorReporter from "@/validator/ErrorReporter";
import userModel from "@/model/usermodel";
import bcrypt from "bcryptjs"


connectDB();

export const POST=async(request:NextRequest)=>{

    try
    {
        const data=await request.json();
        const validator = vine.compile(loginSchema);
        validator.errorReporter = () => new ErrorReporter()
        const output = await validator.validate(data);
        
        const user=await userModel.findOne({email:output.email});
        if(user)
        {
            const isCorrectPassword=bcrypt.compareSync(output.password,user.password);
            if(isCorrectPassword)
            {
                return NextResponse.json({status:200,message:"User logged in successfully"},{status:200});
            }
            else
            {
                return NextResponse.json({
                    status:400,
                    errors:{
                        email:"Please check your credentials."
                    }
                },{status:200})
            }
        }
        else
        {
            return NextResponse.json({
                status:400,
                errors:{
                    email:"No User found in our system with above email."
                }
            },{status:200});
        }
    }
    catch(error)
    {

        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json({status:400,errors:error.messages},{status:200});
        }
    }

}