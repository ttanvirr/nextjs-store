import { fetchProducts } from "@/utils/actions"
import ProductsGrid from "./ProductsGrid"
import ProductsList from "./ProductsList"
import { Button } from "../ui/button"
import { LucideLayoutGrid, LucideList } from "lucide-react"
import { Separator } from "../ui/separator"
import Link from "next/link"

const ProductsContainer = async ({
  layout,
  search,
}: {
  layout: string
  search: string
}) => {
  const products = await fetchProducts({ search })
  const totalProducts = products.length
  const searchTerm = search ? `&search=${search}` : ""

  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex justify-between items-center gap-8">
          <h4 className="text-lg font-medium">
            {totalProducts} product{totalProducts > 1 && "s"}
          </h4>
          <div className="flex gap-x-4">
            <Button
              asChild
              size="icon"
              variant={layout === "grid" ? "default" : "ghost"}
            >
              <Link href={`/products?layout=grid${searchTerm}`}>
                <LucideLayoutGrid />
              </Link>
            </Button>
            <Button
              asChild
              size="icon"
              variant={layout === "list" ? "default" : "ghost"}
            >
              <Link href={`/products?layout=list${searchTerm}`}>
                <LucideList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  )
}

export default ProductsContainer
