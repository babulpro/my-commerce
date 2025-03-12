import { NextResponse } from "next/server";
import  bcrypt  from 'bcrypt';
import { cookies } from "next/headers";
import prisma from "@/app/lib/component/utilityCom/prisma/prisma";
import { CreateJwtToken } from "@/app/lib/component/authFunction/JwtHelper";
import { use } from "react";

 

export async function POST(req, res) {
    const data = await req.json();
   

      

    try {
        
        const user = await prisma.user.findUnique({ where: { email:data.email } });
        console.log(user)
        
        

        if (!user) {
            return NextResponse.json({ msg: "Invalid email or password", status: "false" }, { status: 404 });
        }
        

        const match = await bcrypt.compare(data.password, user.password);

        if (!match) {
            return NextResponse.json({ msg: "Invalid email or password", status: "false" }, { status: 404 });
        }
        
        const token = await CreateJwtToken(user.email,user.id);
        const response = NextResponse.json({ msg: "Login successful", status: "ok" });
        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,   
            secure: true,  
            sameSite: 'strict', 
            path: '/',  
            maxAge: 60 * 60 * 24 * 7 
        });

        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



export async function GET(req) {
    cookies().delete('token')
    return NextResponse.json({ msg:"request Completed",status:"ok"})   
      
}