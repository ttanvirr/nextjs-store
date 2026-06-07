import SectionTitle from "@/components/global/SectionTitle"
import DeleteProductReview from "@/components/reviews/DeleteProductReview"
import ReviewCard from "@/components/reviews/ReviewCard"
import { fetchProductReviewsByUser } from "@/utils/actions"

const ReviewsPage = async () => {
  const reviews = await fetchProductReviewsByUser()

  if (reviews.length === 0)
    return <SectionTitle text="you have no reviews yet" />

  return (
    <>
      <SectionTitle text="Your Reviews" />
      <section className="my-8 grid md:grid-cols-2 gap-8">
        {reviews.map((review) => {
          const { comment, rating } = review
          const { name, image } = review.product
          const reviewInfo = {
            comment,
            rating,
            authorName: name,
            authorImageUrl: image,
          }
          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <DeleteProductReview reviewId={review.id} />
            </ReviewCard>
          )
        })}
      </section>
    </>
  )
}

export default ReviewsPage
