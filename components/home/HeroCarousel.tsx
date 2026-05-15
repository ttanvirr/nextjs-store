import hero1 from "@/public/images/hero-1.jpg"
import hero2 from "@/public/images/hero-2.jpg"
import hero3 from "@/public/images/hero-3.jpg"
import hero4 from "@/public/images/hero-4.jpg"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import { Card, CardContent } from "../ui/card"
import Image from "next/image"

const heroImages = [hero1, hero2, hero3, hero4]

const HeroCarousel = () => {
  return (
    <div className="hidden lg:block">
      <Carousel>
        <CarouselContent>
          {heroImages.map((img, index) => {
            return (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="p-2">
                      <Image
                        src={img}
                        alt="hero image"
                        width={600}
                        height={600}
                        loading="eager"
                        className="w-full h-96 rounded-md object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        <CarouselPrevious className="left-5 ring-2 ring-slate-50" />
        <CarouselNext className="right-5 ring-2 ring-slate-50" />
      </Carousel>
    </div>
  )
}

export default HeroCarousel
