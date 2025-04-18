 
import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()
 

 export async function GET(req,res) {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get('id')
    console.log(typeof id)
    try{
        const response = await prisma.product.findMany({where:{categoryId:id}})
        return NextResponse.json({status:"success",data:response})

    }
    catch(e){
        return NextResponse.json({status:"fail", msg:"fail to "})

    }
    
 }