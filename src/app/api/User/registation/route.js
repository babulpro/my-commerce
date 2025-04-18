 
 
import { NextResponse } from "next/server";
import  bcrypt  from 'bcrypt';
import { CreateJwtToken } from "@/app/lib/component/authFunction/JwtHelper";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()
 

export async function POST(req,res) { 
  try{
    const data =await req.json()
    const salt = await bcrypt.genSalt(10); 
     const hash = await bcrypt.hash(data.password, salt)
     data.password=hash
     const findUser= await prisma.user.findUnique({
      where:{email:data.email}
     })
     if(findUser){
      return NextResponse.json({status:"fail",data:"user already exists"})
     }

     const newUser = await prisma.user.create({
      data:{
        email:data.email,
        password:data.password,
        firstName:data.firstName,
        lastName:data.lastName
      }
     })
     console.log(newUser)
     console.log(newUser)
     
     const token = await CreateJwtToken(data.email,newUser.id)
     const response = NextResponse.json({status:"success",msg:"Registration Successfull",data:newUser})

     response.cookies.set({
      name:'token',
      value:token,
      httpOnly:true,secure:true,sameSite:'strict',path:'/',maxAge:60*60*24*7
     })
     return response


  }
  catch(e){
    return NextResponse.json({status:"fail",data:e})
  }
 
 
}

export async function GET() {
  try{
    let findUser = await prisma.user.findUnique({where:{
      email:"basb@gmail.com"
    }})
    return NextResponse.json({status:"success" ,data:findUser})
  }
  catch(e){
    return NextResponse.json({status:"fail",data:e})
  }
  
}