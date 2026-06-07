"use client"

import { createReviewAction } from "@/utils/actions"
import FormContainer from "../form/FormContainer"
import { Card } from "../ui/card"
import { SubmitButton } from "../form/Buttons"
import TextAreaInput from "../form/TextAreaInput"
import RatingInput from "./RatingInput"
import { useState } from "react"
import { Button } from "../ui/button"
import { useUser } from "@clerk/nextjs"

const SubmitReview = ({ productId }: { productId: string }) => {
  const { user } = useUser()
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false)

  return (
    <div>
      <Button
        size="lg"
        className="capitalize"
        onClick={() => setIsReviewFormVisible((prev) => !prev)}
      >
        leave a review
      </Button>

      {isReviewFormVisible && (
        <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <div className="flex flex-col gap-y-5">
              <input type="hidden" name="productId" value={productId} />
              <input
                type="hidden"
                name="authorName"
                value={user?.firstName || "user"}
              />
              <input
                type="hidden"
                name="authorImageUrl"
                value={user?.imageUrl || ""}
              />
              <RatingInput name="rating" />
              <TextAreaInput
                name="comment"
                labelText="feedback"
                defaultValue="Outstanding product!"
              />
            </div>
            <SubmitButton text="submit review" className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  )
}

export default SubmitReview
