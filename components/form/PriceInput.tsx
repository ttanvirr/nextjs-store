import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type FormInputNumberProps = {
  defaultValue?: number
}

const name = "price"

const PriceInput = ({ defaultValue }: FormInputNumberProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={name} className="capitalize">
        price ($)
      </FieldLabel>
      <Input
        type="number"
        id={name}
        name={name}
        autoComplete="off"
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </Field>
  )
}

export default PriceInput
