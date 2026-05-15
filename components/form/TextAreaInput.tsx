import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "../ui/textarea"

type TextAreaInputProps = {
  name: string
  labelText?: string
  defaultValue?: string
}

const TextAreaInput = ({
  name,
  labelText,
  defaultValue,
}: TextAreaInputProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={name} className="capitalize">
        {labelText || name}
      </FieldLabel>
      <Textarea
        id={name}
        name={name}
        autoComplete="off"
        rows={5}
        defaultValue={defaultValue}
        required
        className="leading-loose"
      />
    </Field>
  )
}

export default TextAreaInput
