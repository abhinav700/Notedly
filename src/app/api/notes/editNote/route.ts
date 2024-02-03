import { connect } from "@/dbConfig/connect";
import { verifyJwtToken } from "@/lib/jwt";
import Note from "@/models/noteModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function PUT(request: NextRequest) {
  try {
    const { id,title,body } = await request.json();
    const token =  cookies().get("token")!.value;
    if (!token) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Invalid auth-token",
      });
    }
    const userData: any = verifyJwtToken(token);

    const note = await Note.findById(id);
    if (!note) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "Note does not exist",
      });
    }

    if (note.user == userData.email) {
      await Note.findByIdAndUpdate(id,{
            title,
            body
      });
      return NextResponse.json({
        status: 200,
        success: true,
        message: "Note updated succesfully",
      });
    }

    return NextResponse.json({
        status:500,
        success:false,
        message:"Operation failed"
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
      error_message: "Was not able to delete the note",
    });
  }
}
