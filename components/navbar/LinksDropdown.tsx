"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { links } from "@/utils/links"
import { LucideAlignLeft } from "lucide-react"
import Link from "next/link"

const LinksDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-25">
          <LucideAlignLeft className="w-6 h-6" />
          <span className="sr-only">User Links</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" sideOffset={10} className="w-40">
        {links.map((link) => {
          return (
            <DropdownMenuItem key={link.href}>
              <Link href={link.href} className="capitalize w-full">
                {link.label}
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown
