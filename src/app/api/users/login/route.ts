import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/connect";
connect()
export async function POST(request:NextRequest){
    try {
        console.log(request.nextUrl.pathname);
        const reqJson = await request.json();
        const reqBody = request.body;

        console.log("reqJson : ", reqJson);
        console.log("reqBody : ", reqBody);
        
        const {email, password} = reqJson;
        const user = await User.findOne({email});
        
        if(!user){
            return NextResponse.json({
                   stauts:404,
                   success:false,
                   message:"User does not exist"
                  });
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if(!validPassword){
            return NextResponse.json({error: "Invalid password", status : 401});
        }

        const tokenData = {
            id: user._id,
            username : user.username,
            email:user.email
        };

        const token = jwt.sign(tokenData, process.env.NEXT_PUBLIC_JWT_SECRET!, {expiresIn :'2h'});


        const response = NextResponse.json({
            message: "Signin succssful",
            success: true,
        })


        response.cookies.set("token", token, {httpOnly: true});
        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message, status:500})
    }
}