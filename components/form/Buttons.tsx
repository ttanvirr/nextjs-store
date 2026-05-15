"use client"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { useFormStatus } from "react-dom"
import { LucidePenSquare, LucideTrash2 } from "lucide-react"
import { SignInButton } from "@clerk/nextjs"
import { FaHeart, FaRegHeart } from "react-icons/fa"

type btnSize = "default" | "lg" | "sm"
type SubmitButtonProps = {
  className?: string
  text?: string
  size?: btnSize
}

export const SubmitButton = ({
  className = "",
  text = "submit",
  size = "lg",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus()
  // console.log("Pending: ", pending)

  return (
    <Button
      type="submit"
      size={size}
      disabled={pending}
      className={cn("capitalize", className)}
    >
      {pending ? (
        <>
          <Spinner data-icon="inline-start" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  )
}

type ActionType = "edit" | "delete"

export const IconButton = ({
  actionType,
  buttonType,
}: {
  actionType: ActionType
  buttonType: "button" | "submit"
}) => {
  const { pending } = useFormStatus()

  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <LucidePenSquare />
      case "delete":
        return <LucideTrash2 />
      default:
        const InvalidActionType: never = actionType
        throw new Error(`Invalid action type: ${InvalidActionType}`)
    }
  }
  return (
    <Button
      type={buttonType}
      size="icon"
      variant="link"
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <>
          <Spinner data-icon="inline-start" />
        </>
      ) : (
        renderIcon()
      )}
    </Button>
  )
}

export const CardSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        asChild
        type="button"
        variant="outline"
        size="icon"
        className="p-2 cursor-pointer"
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  )
}

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      variant="outline"
      size="icon"
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <>
          <Spinner data-icon="inline-start" />
        </>
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  )
}
