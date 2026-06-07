import { Prisma } from "@/generated/prisma/client"

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: {
    product: true
  }
}>

export type ActionFunctionResult = {
  message: string
  type: "success" | "error"
}

export type actionFunction = (
  prevState: any,
  formData: FormData,
) => Promise<ActionFunctionResult>
