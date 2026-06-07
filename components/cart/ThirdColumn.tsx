"use client"

import { useState } from "react"
import SelectProductAmount, {
  Mode,
} from "../single-product/SelectProductAmount"
import FormContainer from "../form/FormContainer"
import { removeCartItemAction, updateCartItemAction } from "@/utils/actions"
import { SubmitButton } from "../form/Buttons"
import { toast } from "sonner"

const ThirdColumn = ({ id, quantity }: { id: string; quantity: number }) => {
  const [amount, setAmount] = useState(quantity)
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeAmount = async (value: number) => {
    setIsLoading(true)
    toast.loading("Calculating...")
    const result = await updateCartItemAction({ cartItemId: id, amount: value })
    setIsLoading(false)
    toast.dismiss()
    toast.success("", { description: result.message })
    setAmount(value)
    setIsLoading(false)
  }

  return (
    <div className="md:ml-8">
      <SelectProductAmount
        mode={Mode.CartItem}
        amount={amount}
        setAmount={handleChangeAmount}
        isLoading={isLoading}
      />

      <FormContainer action={removeCartItemAction} refresh>
        <input type="hidden" name="id" value={id} />
        <SubmitButton text="remove" size="sm" className="mt-4" />
      </FormContainer>
    </div>
  )
}

export default ThirdColumn
