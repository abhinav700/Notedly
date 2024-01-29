import { connect } from "@/dbConfig/connect";
import { verifyJwtToken} from '@/lib/jwt'
import Note from "@/models/noteModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest, response: NextResponse) {
    await connect()

    try {
        const token = request.headers.get('auth-token');
        if(!token){
            return NextResponse.json({status:401, success:false, message:"Invalid auth-token"});
        }
        console.log("TOKEN IS : ", token);
        const userData:any = verifyJwtToken(token);
        console.log("USER DATA IS : ", userData);
        const notes = await Note.find({user:userData.email});
        return  NextResponse.json({notes, success:true, status: 200});
    } catch (error) {
        
        return NextResponse.json({success:false, error, error_message:"Was not able to fetch the notes"});
    }
}