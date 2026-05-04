import { FaStar } from "react-icons/fa"

const ProductRating = ({ productId }: { productId: string }) => {
  const rating = 4.2
  const count = 25
  const countValue = `${count} reviews`
  const className = `flex items-center gap-1 mt-1 mb-4`
  return (
    <span className={className}>
      <FaStar className="w-3 h-3" />
      {rating} | {countValue}
    </span>
  )
}

export default ProductRating
