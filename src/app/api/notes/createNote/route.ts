import { connect } from "@/dbConfig/connect";
import { verifyJwtToken} from '@/lib/jwt'
import Note from "@/models/noteModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function POST(request : NextRequest) {

    try {
        const token =  cookies().get("token")!.value;
        if(!token){
            return NextResponse.json({
                status:401,
                message:"Invalid auth-token",
                success:false
            })
        }
        const userData:any = verifyJwtToken(token)!;

        const {title, body}  = await request.json();
        const create_date: Date = new Date();
        const email:String = userData.email;
        
        const newNote = await new Note({
            title,
            body,
            create_date,
            user:email,
        })
        const savedNote = await newNote.save()

        return  NextResponse.json({note: savedNote, success:true, status: 200});
    } catch (error) {
        
        return NextResponse.json({success:false, error, error_message:"Was not able to create the notes"});
    }
}