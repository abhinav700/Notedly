import { connect } from "@/dbConfig/connect";
import { verifyJwtToken } from "@/lib/jwt";
import Note from "@/models/noteModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const token = request.headers.get("auth-token");
    if (!token) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Invalid auth-token",
      });
    }
    console.log("TOKEN IS : ", token);
    const userData: any = verifyJwtToken(token);
    console.log("USER DATA IS : ", userData);

    const note = await Note.findById(id);
    if (!note) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "Note does not exist",
      });
    }
    console.log("FOUND THE NOTE TO BE DELETED: ", note);

    if (note.user == userData.email) {
      await Note.findByIdAndDelete(id);
      return NextResponse.json({
        status: 200,
        success: true,
        message: "Note deleted succesfully",
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
