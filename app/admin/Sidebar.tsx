"use client"

import { Button } from "@/components/ui/button"
import { adminLinks } from "@/utils/links"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Sidebar = () => {
  const path = usePathname()
  //   console.log(path)

  return (
    <aside>
      {adminLinks.map((link) => {
        const isActive = link.href === path

        return (
          <Button
            key={link.href}
            asChild
            variant={isActive ? "default" : "ghost"}
            className="w-full mb-2 capitalize font-normal justify-start"
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        )
      })}
    </aside>
  )
}

export default Sidebar
