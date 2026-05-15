import FavoriteToggleButton from "@/components/products/FavoriteToggleButton"
import AddToCart from "@/components/single-product/AddToCart"
import BreadCrumbs from "@/components/single-product/BreadCrumbs"
import ProductRating from "@/components/single-product/ProductRating"
import ShareButton from "@/components/single-product/ShareButton"
import { fetchSingleProduct } from "@/utils/actions"
import { formatCurrency } from "@/utils/format"
import Image from "next/image"

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const product = await fetchSingleProduct(id)
  const { name, company, description, image, price } = product
  const dollarsAmount = formatCurrency(price)

  return (
    <section>
      <BreadCrumbs productName={product.name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* FIRST COL IMAGE */}
        <div className="relative min-h-48 h-full">
          <Image
            src={image}
            alt={name}
            fill
            priority
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="w-full object-cover rounded"
          />
        </div>
        {/* SECOND COL PRODUCT INFO */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{name}</h1>
            <div className="flex gap-x-4 items-center">
              <FavoriteToggleButton productId={id} />
              <ShareButton productId={id} name={name} />
            </div>
          </div>
          <ProductRating productId={id} />
          <h4 className="text-xl mt-2">{company}</h4>
          <p className="mt-3 text-lg bg-muted inline-block p-2 rounded-md">
            {dollarsAmount}
          </p>
          <p className="mt-6 text-muted-foreground leading-8">{description}</p>
          <AddToCart productId={id} />
        </div>
      </div>
    </section>
  )
}

export default SingleProductPage
