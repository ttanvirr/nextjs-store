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
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs"
import { LucideAlignLeft } from "lucide-react"
import Link from "next/link"
import SignOutLink from "./SignOutLink"
import UserIcon from "./UserIcon"

const LinksDropdown = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-25">
          <LucideAlignLeft className="w-6 h-6" />
          <UserIcon />
          <span className="sr-only">User Links</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" sideOffset={10} className="w-40">
        <Show when="signed-out">
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full text-left">Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full text-left">Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </Show>

        <Show when="signed-in">
          {links.map((link) => {
            if (link.label === "dashboard" && !isAdmin) return null
            return (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href} className="capitalize w-full">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </Show>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown
