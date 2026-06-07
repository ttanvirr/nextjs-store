"use client"

import { CartItemWithProduct } from "@/utils/types"
import { Card } from "../ui/card"
import Image from "next/image"
import Link from "next/link"
import { formatCurrency } from "@/utils/format"
import ThirdColumn from "./ThirdColumn"

const CartItemsList = ({ cartItems }: { cartItems: CartItemWithProduct[] }) => {
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { id, amount } = cartItem
        const { id: productId, image, name, company, price } = cartItem.product
        return (
          <Card
            key={id}
            className="p-6 mb-8 flex flex-col gap-y-4 md:flex-row flex-wrap gap-x-4"
          >
            {/* FIRST COLUMN */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32">
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                loading="eager"
                className="w-full h-full rounded-md object-cover"
              />
            </div>

            {/* SECOND COLUMN */}
            <div className="sm:w-48">
              <Link href={`products/${productId}`}>
                <h3 className="capitalize font-medium hover:underline">
                  {name}
                </h3>
              </Link>
              <h4 className="capitalize text-xs mt-2">{company}</h4>
            </div>

            {/* THIRD COLUMN */}
            <ThirdColumn id={id} quantity={amount} />

            {/* FOURTH COLUMN */}
            <p className="font-medium md:ml-auto">{formatCurrency(price)}</p>
          </Card>
        )
      })}
    </div>
  )
}

export default CartItemsList
