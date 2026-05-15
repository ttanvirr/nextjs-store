import { SubmitButton } from "@/components/form/Buttons"
import CheckboxInput from "@/components/form/CheckboxInput"
import FormContainer from "@/components/form/FormContainer"
import FormInput from "@/components/form/FormInput"
import ImageInputContainer from "@/components/form/ImageInputContainer"
import PriceInput from "@/components/form/PriceInput"
import TextAreaInput from "@/components/form/TextAreaInput"
import LoadingContainer from "@/components/global/LoadingContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/actions"
import { Suspense } from "react"

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  // console.log("Product ID: ", id)
  const product = await fetchAdminProductDetails(id)
  const { name, company, price, description, featured } = product
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">update product</CardTitle>
        </CardHeader>
        <CardContent>
          {/* IMAGE FORM INPUT */}
          <ImageInputContainer
            image={product.image}
            name={name}
            text="update image?"
            action={updateProductImageAction}
          >
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="url" value={product.image} />
          </ImageInputContainer>

          {/* OTHER FORM INPUTS */}
          <FormContainer action={updateProductAction}>
            <div className="grid gap-5 md:grid-cols-2 my-4">
              <input type="hidden" name="id" value={id} />
              <FormInput
                type="text"
                name="name"
                label="product name"
                defaultValue={name}
              />
              <FormInput
                type="text"
                name="company"
                label="company"
                defaultValue={company}
              />
              <PriceInput defaultValue={price} />
            </div>
            <TextAreaInput
              name="description"
              labelText="product description"
              defaultValue={description}
            />
            <div className="mt-5">
              <CheckboxInput
                name="featured"
                labelText="featured"
                defaultChecked={featured}
              />
            </div>

            <div className="mt-10">
              {/* Submit button must be inside form to work useFormStatus hook */}
              <SubmitButton text="update product" />
            </div>
          </FormContainer>
        </CardContent>
      </Card>
    </section>
  )
}

export default EditProductPage
