import { createClient } from "@supabase/supabase-js"

const bucket = "main-bucket" // must match bucket name in supabase

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string,
)

export const uploadImage = async (image: File) => {
  const timestamp = Date.now()
  const fileName = `${timestamp}-${image.name}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, image, {
      cacheControl: "3600",
    })

  if (!data) throw new Error("Image upload failed")

  // return public url
  return supabase.storage.from(bucket).getPublicUrl(fileName).data.publicUrl
}

export const deleteImage = async (url: string) => {
  const imageName = url.split("/").pop()
  if (!imageName) throw new Error("Invalid url")
  return await supabase.storage.from(bucket).remove([imageName])
}
