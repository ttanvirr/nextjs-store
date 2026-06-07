"use client"

import { Card, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
  return (
    <section className="grid md:grid-cols-2 gap-8 mt-4">
      <ReviewLoadingCard />
      <ReviewLoadingCard />
    </section>
  )
}

const ReviewLoadingCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="ml-4">
            <Skeleton className="w-38 h-4 rounded mb-2" />
            <Skeleton className="w-25 h-4 rounded" />
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default loading
