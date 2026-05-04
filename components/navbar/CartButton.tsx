import Link from "next/link"
import { Button } from "../ui/button"
import { LucideShoppingCart } from "lucide-react"

const CartButton = async () => {
  const numItemsInCart = 9
  return (
    <Button asChild variant="outline" size="icon" className="relative">
      <Link href="/cart">
        <LucideShoppingCart className="h-6 w-6" />
        <span className="sr-only">Cart</span>
        <span className="absolute -top-3 -right-3 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  )
}

export default CartButton
