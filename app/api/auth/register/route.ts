import connectDB from "@/db/config.js";
import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from '@vinejs/vine'
import { registerSchema } from "@/validator/authSchema";
import ErrorReporter from "@/validator/ErrorReporter";
import userModel from "@/model/usermodel";
import bcrypt from "bcryptjs"

connectDB();

export const POST=async (request:NextRequest)=>{

    try
    {
        // fetching the data and applying validation 

        const body=await request.json();
        const validator = vine.compile(registerSchema);
        validator.errorReporter = () => new ErrorReporter()
        const output = await validator.validate(body);

        // encrypting password

        const salt=bcrypt.genSaltSync(12);
        output.password=bcrypt.hashSync(output.password,salt);

        // saving user in db

        const user=await userModel.findOne({email:output.email});
        if(user)
        {
            return NextResponse.json({status:400,errors:{email:"This email is already in use"}},{status:200})
        }
        else
        {
            await userModel.create({
                email:output.email,
                password:output.password,
                name:output.name
            })
        }

        return  NextResponse.json({status:200,message:"User successfully created . Please login to your account"},{status:200});
    }
    catch (error) 
    {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json({status:400,errors:error.messages},{status:200});
        }
    } 
}