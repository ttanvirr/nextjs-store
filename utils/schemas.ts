import { z, ZodType } from "zod"

export const ProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters" })
    .max(100, {
      message: "Product name must be at most 100 characters",
    }),
  company: z.string(),
  price: z.coerce
    .number()
    .int()
    .min(0, { message: "Price must be a positive number" }),
  description: z.string().refine(
    (text) => {
      const wordCount = text.split(" ").length
      return wordCount >= 5 && wordCount <= 100
    },
    { message: "Description must be between 5 and 100 words" },
  ),
  featured: z.coerce.boolean().default(false),
})

export const ImageSchema = z.object({
  image: z
    .instanceof(File)
    .refine(
      (file) => {
        const maxUploadSize = 1024 * 1024
        return !file || file.size <= maxUploadSize
      },
      { message: "File size must be less than 1MB" },
    )
    .refine(
      (file) => {
        const acceptedFileTypes = ["image/"]
        return (
          !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
        )
      },
      {
        message: "File type must be an image",
      },
    ),
})

export const validateWithZodSchema = <T>(schema: ZodType<T>, data: unknown) => {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.issues.map((err) => err.message)
    throw new Error(errors.join(", "))
  }
  return result.data
}
