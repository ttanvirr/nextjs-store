"use client"

import { loadStripe } from "@stripe/stripe-js"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { useSearchParams } from "next/navigation"
import { useCallback } from "react"
import axios from "axios"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
)

const CheckoutPage = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const cartId = searchParams.get("cartId")
  // console.log("OrderId & CartId:", orderId, cartId)

  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    const response = await axios.post("/api/payment", {
      orderId,
      cartId,
    })
    return response.data.clientSecret
  }, [])

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default CheckoutPage
