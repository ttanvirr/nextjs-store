"use client"

import React, { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const initialState: ActionFunctionResult = {
  message: "",
  type: "success",
}

const FormContainer = ({
  action,
  children,
  redirectTo,
  refresh,
}: {
  action: actionFunction
  children: React.ReactNode
  redirectTo?: string
  refresh?: boolean
}) => {
  const [state, formAction, isPending] = useActionState(action, initialState)
  const router = useRouter()

  useEffect(() => {
    if (!state.message) return
    if (state.type === "success") {
      toast.success(state.message)
      if (redirectTo) {
        router.push(redirectTo)
      }
      if (refresh) {
        router.refresh()
      }
    }
    if (state.type === "error") {
      toast.error(state.message)
    }
  }, [state])

  return <form action={formAction}>{children}</form>
}

export default FormContainer
