import { SubmitButton } from "@/components/form/Buttons"
import CheckboxInput from "@/components/form/CheckboxInput"
import FormContainer from "@/components/form/FormContainer"
import FormInput from "@/components/form/FormInput"
import ImageInput from "@/components/form/ImageInput"
import PriceInput from "@/components/form/PriceInput"
import TextAreaInput from "@/components/form/TextAreaInput"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createProductAction } from "@/utils/actions"
import { faker } from "@faker-js/faker"

const CreateProductPage = () => {
  const name = faker.commerce.productName()
  const company = faker.company.name()
  const description = faker.commerce.productDescription()

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">create product</CardTitle>
        </CardHeader>
        <CardContent>
          <FormContainer
            action={createProductAction}
            redirectTo="/admin/products"
          >
            <div className="grid gap-5 md:grid-cols-2 my-4">
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
              <PriceInput />
              <ImageInput />
            </div>
            <TextAreaInput
              name="description"
              labelText="product description"
              defaultValue={description}
            />
            <div className="mt-5">
              <CheckboxInput name="featured" labelText="featured" />
            </div>

            <div className="mt-10">
              {/* Submit button must be inside form to work useFormStatus hook */}
              <SubmitButton text="create product" />
            </div>
          </FormContainer>
        </CardContent>
      </Card>
    </section>
  )
}

export default CreateProductPage
