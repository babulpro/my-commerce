import { DecodedJwtToken } from "@/app/lib/component/authFunction/JwtHelper";
 
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
 const { PrismaClient } = require("@prisma/client");
 
 const prisma = new PrismaClient()

export async function GET(req) {
    const cookieStore = await cookies()
            const token = cookieStore.get('token')?.value
            const decodedToken = await DecodedJwtToken(token)
  try {
     const userId = decodedToken.id;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true, // Fetch product details
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ message: "Cart is empty", items: [] }, { status: 200 });
    }

    return NextResponse.json({ data: cart.items }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
