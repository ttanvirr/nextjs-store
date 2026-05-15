import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type FormInputProps = {
  name: string
  type: string
  label?: string
  defaultValue?: string
  placeholder?: string
}
const FormInput = ({
  name,
  type,
  label,
  defaultValue,
  placeholder,
}: FormInputProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={name} className="capitalize">
        {label || name}
      </FieldLabel>
      <Input
        type={type}
        id={name}
        name={name}
        autoComplete="off"
        placeholder={placeholder}
        defaultValue={defaultValue}
        required
      />
    </Field>
  )
}

export default FormInput
