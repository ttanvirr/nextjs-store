"use client"

import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { toast } from "sonner"

const name = "image"

const ImageInput = () => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) return

    // size validation
    if (selectedFile.size > 1024 * 1024) {
      toast.error("Image size should be less than 1MB")
      e.target.value = "" // reset input
      // setFile(null)
      return
    }

    // file type validation
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("File type must be an image")
      e.target.value = "" // reset input
      // setFile(null)
      return
    }

    setFile(selectedFile)
  }

  return (
    <Field>
      <FieldLabel htmlFor={name} className="capitalize">
        image
      </FieldLabel>
      <Input
        type="file"
        accept="image/*"
        id={name}
        name={name}
        autoComplete="off"
        required
        onChange={handleFileChange}
      />
    </Field>
  )
}

export default ImageInput
