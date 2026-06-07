"use client"

import { useAuth } from "@clerk/nextjs"
import { ProductSignInButton, SubmitButton } from "../form/Buttons"
import FormContainer from "../form/FormContainer"
import { addToCartAction } from "@/utils/actions"
import SelectProductAmount, { Mode } from "./SelectProductAmount"
import { useState } from "react"

const AddToCart = ({ productId }: { productId: string }) => {
  const { userId } = useAuth()
  const [amount, setAmount] = useState(1)
  return (
    <div className="mt-4">
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />

      {userId ? (
        <FormContainer action={addToCartAction} redirectTo="/cart">
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="amount" value={amount} />
          <SubmitButton text="add to cart" size="default" className="mt-8" />
        </FormContainer>
      ) : (
        <ProductSignInButton buttonText="Add to Cart" />
      )}
    </div>
  )
}

export default AddToCart
