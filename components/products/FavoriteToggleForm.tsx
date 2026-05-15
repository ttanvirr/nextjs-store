"use client"

import { toggleFavoriteAction } from "@/utils/actions"
import FormContainer from "@/components/form/FormContainer"
import { CardSubmitButton } from "@/components/form/Buttons"
import { usePathname } from "next/navigation"

type FavoriteToggleFormProps = {
  productId: string
  favoriteId: string | null
}

const FavoriteToggleForm = ({
  productId,
  favoriteId,
}: FavoriteToggleFormProps) => {
  const pathname = usePathname()
  const toggleAction = toggleFavoriteAction.bind(null, {
    productId,
    favoriteId,
    pathname,
  })
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  )
}

export default FavoriteToggleForm
