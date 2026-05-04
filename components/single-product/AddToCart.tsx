import { Button } from "../ui/button"

const AddToCart = ({ productId }: { productId: string }) => {
  return (
    <Button size="lg" className="mt-8 capitalize">
      add to cart
    </Button>
  )
}

export default AddToCart
