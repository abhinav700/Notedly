import { connect } from "@/dbConfig/connect";
import { verifyJwtToken} from '@/lib/jwt'
import Note from "@/models/noteModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function POST(request : NextRequest) {

    try {
        const token = request.headers.get('auth-token');
        if(!token){
            return NextResponse.json({
                status:401,
                message:"Invalid auth-token",
                success:false
            })
        }
        console.log("TOKEN IS : ", token);
        const userData:any = verifyJwtToken(token)!;
        console.log("USER DATA IS : ", userData);

        const {title, body}  = await request.json();
        console.log(title,body);
        const create_date: Date = new Date();
        const email:String = userData.email;
        
        const newNote = await new Note({
            title,
            body,
            create_date,
            user:email,
        })
        const savedNote = await newNote.save()
        console.log("SUCCESSFULLY CREATED NEW NOTE");

        return  NextResponse.json({savedNote, success:true, status: 200});
    } catch (error) {
        
        return NextResponse.json({success:false, error, error_message:"Was not able to create the notes"});
    }
}