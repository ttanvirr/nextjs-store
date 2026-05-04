import Link from "next/link"
import Image from "next/image"
import { Product } from "@/generated/prisma/client"
import { Card, CardContent } from "../ui/card"
import { formatCurrency } from "@/utils/format"
import FavoriteToggleButton from "./FavoriteToggleButton"

const ProductsGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-12">
      {products.map((product) => {
        const { name, image, price, id: productId } = product
        const dollarsAmount = formatCurrency(price)
        return (
          <article key={productId} className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500 p-4">
                <CardContent className="p-0">
                  <div className="relative h-64 md:h-48 rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                      className="rounded w-full object-cover group-hover:scale-110 transform transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="text-lg capitalize">{name}</h2>
                    <p className="mt-2 text-muted-foreground">
                      {dollarsAmount}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-7 right-7 z-5">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default ProductsGrid
