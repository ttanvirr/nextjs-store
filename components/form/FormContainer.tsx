"use client"

import React, { startTransition, use, useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { actionFunction, ActionFunctionResult } from "@/utils/types"

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
      } else if (refresh) {
        router.refresh()
      }
    } else if (state.type === "error") {
      toast.error(state.message)
    }
  }, [state, router, redirectTo, refresh])

  return <form action={formAction}>{children}</form>
}

export default FormContainer
