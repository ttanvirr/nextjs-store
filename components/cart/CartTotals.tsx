import { createOrderAction } from "@/utils/actions"
import { SubmitButton } from "../form/Buttons"
import FormContainer from "../form/FormContainer"
import { Card, CardTitle } from "../ui/card"
import { formatCurrency } from "@/utils/format"
import { Separator } from "../ui/separator"
import { Cart } from "@/generated/prisma/client"

const CartTotals = ({ cart }: { cart: Cart }) => {
  const { cartTotal, shipping, tax, orderTotal } = cart
  return (
    <div>
      <Card className="p-8 gap-y-4">
        <CartTotalRow label="Subtotal" amount={cartTotal} />
        <CartTotalRow label="Shipping" amount={shipping} />
        <CartTotalRow label="Tax" amount={tax} />
        <CardTitle className="mt-8">
          <CartTotalRow label="Order Total" amount={orderTotal} lastRow />
        </CardTitle>
      </Card>
      <FormContainer action={createOrderAction}>
        <SubmitButton text="place order" className="w-full mt-8" />
      </FormContainer>
    </div>
  )
}

const CartTotalRow = ({
  label,
  amount,
  lastRow,
}: {
  label: string
  amount: number
  lastRow?: boolean
}) => {
  return (
    <>
      <p className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{formatCurrency(amount)}</span>
      </p>
      {lastRow ? null : <Separator />}
    </>
  )
}

export default CartTotals
