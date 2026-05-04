"use client"

import { SignOutButton } from "@clerk/nextjs"
import Link from "next/link"

const SignOutLink = () => {
  const handleLogout = () => {
    console.log("logged out successfully")
  }
  return (
    <SignOutButton>
      <Link href="/" className="w-full text-left" onClick={handleLogout}>
        Sign out
      </Link>
    </SignOutButton>
  )
}

export default SignOutLink
