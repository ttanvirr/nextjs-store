"use server"

import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { ProductSchema, ImageSchema, validateWithZodSchema } from "./schemas"
import { deleteImage, uploadImage } from "./supabase"
import { revalidatePath } from "next/cache"

const getAuthUser = async () => {
  const user = await currentUser()
  if (!user) {
    throw new Error("You must be logged in to access this route")
  }
  return user
}

const getAdminUser = async () => {
  const user = await getAuthUser()
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/")
  return user
}

const renderError = (error: unknown): { message: string; type: "error" } => {
  console.error(error)
  return {
    message: error instanceof Error ? error.message : "Something went wrong",
    type: "error",
  }
}

export const fetchFeaturedProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
  })
  return products
}

export const fetchProducts = async ({ search = "" }: { search: string }) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return products
}

export const fetchSingleProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })
  if (!product) redirect("/products")

  return product
}

export const createProductAction = async (
  prevState: any,
  formData: FormData,
): Promise<ActionFunctionResult> => {
  const user = await getAuthUser()
  try {
    const rawData = Object.fromEntries(formData)
    const imgFile = formData.get("image") as File
    const validatedFields = validateWithZodSchema(ProductSchema, rawData)
    const validatedImage = validateWithZodSchema(ImageSchema, {
      image: imgFile,
    })
    // console.log(validatedImage.image)
    const fullPath = await uploadImage(validatedImage.image)
    // console.log(fullPath)

    await prisma.product.create({
      data: {
        ...validatedFields,
        image: fullPath,
        clerkId: user.id,
      },
    })
    return { message: "Product created successfully", type: "success" }
  } catch (error) {
    return renderError(error)
  }
  // redirect("/admin/products")
}

export const fetchAdminProducts = async () => {
  await getAdminUser()
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
  return products
}

export const deleteProductAction = async (
  prevState: { productId: string },
  formData: FormData,
): Promise<ActionFunctionResult> => {
  const { productId } = prevState
  await getAdminUser()

  try {
    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
    })
    await deleteImage(product.image)
    // revalidatePath("/admin/products") // this server action interrupts toast notification. Handle refresh in clint side (FormContainer) instead.
    return { message: "Product deleted", type: "success" }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser()
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })
  if (!product) redirect("/admin/products")

  return product
}

export const updateProductAction = async (
  prevState: any,
  formData: FormData,
): Promise<ActionFunctionResult> => {
  await getAdminUser()
  try {
    const productId = formData.get("id") as string
    const rawData = Object.fromEntries(formData)
    const validatedFields = validateWithZodSchema(ProductSchema, rawData)

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedFields,
      },
    })
    revalidatePath(`/admin/products/${productId}/edit`)
    return { message: "Product updated successfully", type: "success" }
  } catch (error) {
    return renderError(error)
  }
}

export const updateProductImageAction = async (
  prevState: any,
  formData: FormData,
): Promise<ActionFunctionResult> => {
  await getAdminUser()
  try {
    const image = formData.get("image") as File
    const productId = formData.get("id") as string
    const oldImageUrl = formData.get("url") as string

    const validatedImage = validateWithZodSchema(ImageSchema, { image })
    const fullPath = await uploadImage(validatedImage.image)

    await deleteImage(oldImageUrl) // delete old image from supabase storage

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        image: fullPath,
      },
    })

    revalidatePath(`/admin/products/${productId}/edit`)
    return { message: "Image updated successfully", type: "success" }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser()
  const favorite = await prisma.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  })

  return favorite?.id || null
}

export const toggleFavoriteAction = async (
  prevState: {
    productId: string
    favoriteId: string | null
    pathname: string
  },
  formData: FormData,
): Promise<ActionFunctionResult> => {
  const user = await getAuthUser()
  const { productId, favoriteId, pathname } = prevState
  try {
    if (favoriteId) {
      await prisma.favorite.delete({
        where: {
          id: favoriteId,
        },
      })
    } else {
      await prisma.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      })
    }
    revalidatePath(pathname)
    return {
      message: favoriteId ? "Removed from Favs" : "Added to Favs",
      type: "success",
    }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchUserFavorites = async () => {
  const user = await getAuthUser()
  const favorites = await prisma.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  })

  return favorites
}
