import { fetchFeaturedProducts } from "@/utils/actions"
import SectionTitle from "../global/SectionTitle"
import ProductsGrid from "../products/ProductsGrid"

const FeaturedProducts = async () => {
  const products = await fetchFeaturedProducts()

  return (
    <section className="pt-24">
      <SectionTitle text="featured products" />
      <ProductsGrid products={products} />
    </section>
  )
}

export default FeaturedProducts
