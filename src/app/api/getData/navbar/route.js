                   
 
import { NextResponse } from "next/server";

export async function POST(req) {
    
    try{
        const data = await req.json(); 
        const findCategory = await prisma.category.findUnique({where:{name:data.name}})
        if(findCategory){
            return NextResponse.json({status:"fail",data:"already exist"})
        }
        const category =  await prisma.category.create({data:{
            name:data.name,link:data.link
        }})
        return NextResponse.json({ status: "success", data: category });
    }
    catch(e){
        return NextResponse.json({ status: "error", msg: e.message }, { status: 400 });
    }
}


export async function GET(req) {
    

    try {
        let data =await prisma.category.findMany({})
        return NextResponse.json({ status: "ok", data});
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ status: "false", msg: error.message }, { status: 400 });
    }
}
