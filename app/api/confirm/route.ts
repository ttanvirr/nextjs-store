import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const session_id = searchParams.get("session_id") as string

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    // console.log(session)

    const orderId = session.metadata?.orderId
    const cartId = session.metadata?.cartId

    if (session.status === "complete") {
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
        },
      })

      await prisma.cart.delete({
        where: {
          id: cartId,
        },
      })
    }
  } catch (error) {
    console.log(error)
    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    })
  }

  redirect("/orders")
}
