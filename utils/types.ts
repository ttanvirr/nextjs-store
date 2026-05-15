type ActionFunctionResult = {
  message: string
  type: "success" | "error"
}

type actionFunction = (
  prevState: any,
  formData: FormData,
) => Promise<ActionFunctionResult>
