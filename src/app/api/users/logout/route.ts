import {NextResponse} from "next/server";
export async function GET(){
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success:true
        })    
        response.cookies.delete("token");
        return response;
    } catch (error:any) {
        return NextResponse.json({status: 500, error: error.message});
    }
}