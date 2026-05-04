import Link from "next/link"
import { Button } from "../ui/button"
import HeroCarousel from "./HeroCarousel"

const Hero = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24">
      <div>
        <h1 className="max-w-2xl text-4xl sm:text-6xl tracking-tight font-bold">
          We are changing the way people shop
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus dolorum corporis quod, ullam nesciunt dolorem eligendi
          possimus nobis porro cum?
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/products">Our products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  )
}

export default Hero
