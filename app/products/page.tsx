import ProductsContainer from "@/components/products/ProductsContainer"

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string }
}) => {
  const { layout, search } = await searchParams
  // console.log({ layout, search })
  const layoutValue = layout || "grid"
  const searchValue = search || ""

  return <ProductsContainer layout={layoutValue} search={searchValue} />
}

export default ProductsPage
