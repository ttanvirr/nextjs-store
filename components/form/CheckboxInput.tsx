"use client"

import { Field, FieldLabel } from "@/components/ui/field"
import { Checkbox } from "../ui/checkbox"

type checkboxInputProps = {
  name: string
  labelText: string
  defaultChecked?: boolean
}
const CheckboxInput = ({
  name,
  labelText,
  defaultChecked,
}: checkboxInputProps) => {
  return (
    <Field orientation="horizontal">
      <Checkbox
        key={defaultChecked ? "checked" : "unchecked"} // add a key to force re-render (special for checkbox)
        id={name}
        name={name}
        defaultChecked={defaultChecked || false}
      />
      <FieldLabel htmlFor={name} className="capitalize">
        {labelText}
      </FieldLabel>
    </Field>
  )
}

export default CheckboxInput
