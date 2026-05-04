import { LucideCode } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

const Logo = () => {
  return (
    <Button asChild size="icon">
      <Link href="/">
        <LucideCode className="h-6 w-6" />
        <span className="sr-only">Logo</span>
      </Link>
    </Button>
  )
}

export default Logo
