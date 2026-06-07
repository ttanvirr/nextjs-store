import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"
import { stripe } from "@/lib/stripe"

export const POST = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers)
  const origin = requestHeaders.get("origin")
  const { orderId, cartId } = await req.json()

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  })

  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!order || !cart) {
    return Response.json(null, {
      status: 404,
      statusText: "Not Found",
    })
  }

  // Read: https://docs.stripe.com/api/checkout/sessions/create#create_checkout_session-line_items
  const lineitems = cart.cartItems.map((item) => {
    return {
      quantity: item.amount,
      price_data: {
        currency: "usd",
        unit_amount: item.product.price * 100,
        product_data: {
          name: item.product.name,
          images: [item.product.image],
        },
      },
    }
  })

  try {
    // Create Checkout Sessions from body params.
    // Read: https://docs.stripe.com/api/checkout/sessions/create
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      metadata: { orderId, cartId },
      line_items: lineitems,
      mode: "payment",
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    })

    return Response.json({ clientSecret: session.client_secret })
  } catch (error) {
    console.log(error)
    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    })
  }
}
