import { DecodedJwtToken } from "@/app/lib/component/authFunction/JwtHelper";
import prisma from "@/app/lib/component/utilityCom/prisma/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        const decodedToken = await DecodedJwtToken(token)
         
  try {
    const { productId} = await req.json();
    const userId = decodedToken.id;
    const quantity = 1; 

    if (!userId || !productId) {
      return NextResponse.json({ error: "User ID and Product ID are required" }, { status: 400 });
    }

    // Find the user's cart or create one
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    // Check if product already in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      // Update quantity if already exists
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      // Add new item to cart
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    return NextResponse.json({ message: "Product added to cart" }, { status: 201 });
  } catch (error) {
    // console.error("Error adding to cart:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
