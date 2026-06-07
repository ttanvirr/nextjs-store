import Image from "next/image"
import { Card, CardContent, CardHeader } from "../ui/card"
import Comment from "./Comment"
import Rating from "./Rating"

type ReviewCardProps = {
  reviewInfo: {
    comment: string
    rating: number
    authorName: string
    authorImageUrl: string
  }
  children?: React.ReactNode
}

const ReviewCard = ({ reviewInfo, children }: ReviewCardProps) => {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center">
          <Image
            src={reviewInfo.authorImageUrl}
            alt={reviewInfo.authorName}
            width={48}
            height={48}
            className="w-12 h-12 object-cover rounded-full"
          />
          <div className="ml-4">
            <h3 className="text-sm font-bold capitalize mb-1">
              {reviewInfo.authorName}
            </h3>
            <Rating rating={reviewInfo.rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={reviewInfo.comment} />
      </CardContent>
      <div className="absolute top-3 right-3">{children}</div>
    </Card>
  )
}

export default ReviewCard
