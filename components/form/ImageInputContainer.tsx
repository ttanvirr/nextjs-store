"use client"

import Image from "next/image"
import FormContainer from "./FormContainer"
import ImageInput from "./ImageInput"
import { SubmitButton } from "./Buttons"
import { Button } from "../ui/button"
import { useState } from "react"
import { actionFunction } from "@/utils/types"

type ImageInputContainerProps = {
  image: string
  name: string
  text: string
  children?: React.ReactNode
  action: actionFunction
}

const ImageInputContainer = ({
  image,
  name,
  text,
  children,
  action,
}: ImageInputContainerProps) => {
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false)

  return (
    <div className="mb-8">
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        loading="eager"
        className="w-50 h-50 object-cover rounded-md"
      />

      <Button
        variant="outline"
        size="sm"
        className="mt-4 capitalize"
        onClick={() => setIsUpdateFormVisible((prev) => !prev)}
      >
        {text}
      </Button>

      {isUpdateFormVisible && (
        <FormContainer action={action}>
          <div className="mt-8 max-w-md">
            {children}
            <ImageInput />
            <SubmitButton text="update image" size="sm" className="mt-4" />
          </div>
        </FormContainer>
      )}
    </div>
  )
}

export default ImageInputContainer
