import { Card, CardContent } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const LoadingContainer = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-12">
      <LoadingProducts />
      <LoadingProducts />
      <LoadingProducts />
    </div>
  )
}

const LoadingProducts = () => {
  return (
    <Card className="p-4">
      <CardContent className="p-0">
        <Skeleton className="w-full h-48 rounded" />
        <Skeleton className="w-3/4 h-4 rounded mt-1" />
        <Skeleton className="w-1/4 h-4 rounded mt-1" />
      </CardContent>
    </Card>
  )
}

export default LoadingContainer
