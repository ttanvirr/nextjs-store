import { deleteReviewAction } from "@/utils/actions"
import FormContainer from "../form/FormContainer"
import { IconButton } from "../form/Buttons"

const DeleteProductReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId })
  return (
    <FormContainer action={deleteReview} refresh>
      <IconButton buttonType="submit" actionType="delete" />
    </FormContainer>
  )
}

export default DeleteProductReview
