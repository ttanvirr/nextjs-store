"use client"

import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

const NavSearch = () => {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || "",
  )
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((value: string) => {
    // construct url with search params with delay
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }
    // console.log(params.toString())
    replace(`/products?${params.toString()}`)
  }, 500)

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("")
    }
  }, [searchParams.get("search")])

  return (
    <Input
      type="search"
      placeholder="Search product.."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value)
        handleSearch(e.target.value)
      }}
      className="max-w-xs"
    />
  )
}

export default NavSearch
