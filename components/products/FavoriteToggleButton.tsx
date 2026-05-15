import { CardSignInButton } from "../form/Buttons"
import { auth } from "@clerk/nextjs/server"
import FavoriteToggleForm from "./FavoriteToggleForm"
import { fetchFavoriteId } from "@/utils/actions"

const FavoriteToggleButton = async ({ productId }: { productId: string }) => {
  const { userId } = await auth()
  if (!userId) return <CardSignInButton />

  const favoriteId = await fetchFavoriteId({ productId })

  return <FavoriteToggleForm favoriteId={favoriteId} productId={productId} />
}

export default FavoriteToggleButton
