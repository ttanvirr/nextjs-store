import { Product } from "@/generated/prisma/client"
import { formatCurrency } from "@/utils/format"
import Link from "next/link"
import FavoriteToggleButton from "./FavoriteToggleButton"
import { Card, CardContent } from "../ui/card"
import Image from "next/image"

const ProductsList = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid gap-y-8 pt-12">
      {products.map((product) => {
        const { name, image, price, company, id: productId } = product
        const dollarsAmount = formatCurrency(price)

        return (
          <article key={productId} className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500 p-4">
                <CardContent className="p-0 grid gap-y-4 md:grid-cols-3">
                  <div className="relative h-64 md:h-48 md:w-48 rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold capitalize">{name}</h2>
                    <h2 className="text-muted-foreground">{company}</h2>
                  </div>
                  <p className="text-muted-foreground text-lg md:ml-auto">
                    {dollarsAmount}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute bottom-7 right-7 z-5">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default ProductsList
