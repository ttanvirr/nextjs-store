import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export const enum Mode {
  SingleProduct = "singleProduct",
  CartItem = "cartItem",
}

type SelectProductAmountProps = {
  mode: Mode.SingleProduct
  amount: number
  setAmount: (value: number) => void
}

type SelectCartItemAmountProps = {
  mode: Mode.CartItem
  amount: number
  setAmount: (value: number) => Promise<void>
  isLoading: boolean
}

const SelectProductAmount = (
  props: SelectProductAmountProps | SelectCartItemAmountProps,
) => {
  const { mode, amount, setAmount } = props
  const isCarItem = mode === Mode.CartItem

  return (
    <>
      <h4 className="mb-2">Amount:</h4>
      <Select
        defaultValue={amount.toString()}
        onValueChange={(value) => setAmount(Number(value))}
        disabled={isCarItem ? props.isLoading : false}
      >
        <SelectTrigger className={isCarItem ? "w-25" : "w-38"}>
          <SelectValue placeholder={amount} />
        </SelectTrigger>

        <SelectContent>
          {Array.from({ length: isCarItem ? amount + 10 : 10 }, (_, i) => {
            const selectValue = (i + 1).toString()
            return (
              <SelectItem key={i} value={selectValue}>
                {selectValue}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </>
  )
}

export default SelectProductAmount
