import { fetchProductReviews } from "@/utils/actions"
import SectionTitle from "../global/SectionTitle"
import ReviewCard from "./ReviewCard"

const ProductReviews = async ({ productId }: { productId: string }) => {
  // console.log("PRODUCT ID: ", productId)

  const reviews = await fetchProductReviews(productId)

  return (
    <div className="mt-16">
      <SectionTitle text="product reviews" />
      {reviews.length === 0 ? (
        <div className="my-8">
          <p>No reviews yet</p>
        </div>
      ) : (
        <div className="my-8 grid md:grid-cols-2 gap-8">
          {reviews.map((review) => {
            return <ReviewCard key={review.id} reviewInfo={review} />
          })}
        </div>
      )}
    </div>
  )
}

export default ProductReviews
