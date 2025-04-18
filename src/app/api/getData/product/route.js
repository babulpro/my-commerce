 
import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

export async function POST(req,res) {
    try{
        const data = await req.json()
        const response = await prisma.product.create({data:{
            name:data.name,
            description:data.description,
            price:data.price,
            images:data.images,
            stock:data.stock,
            categoryId:data.categoryId,
            keywords:data.keywords
        
        }})

        return NextResponse.json({status:"success",data:response})

    }
    catch(e){
        return NextResponse.json({status:"fail",data:e})

    }
    
}


 export async function GET(req,res) {
    try{
        const response = await prisma.product.findMany({})
        return NextResponse.json({status:"success",data:response})

    }
    catch(e){
        return NextResponse.json({status:"fail", msg:"fail to "})

    }
    
 }