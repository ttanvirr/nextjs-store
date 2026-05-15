import DarkMode from "./DarkMode"
import CartButton from "./CartButton"
import LinksDropdown from "./LinksDropdown"
import Logo from "./Logo"
import NavSearch from "./NavSearch"
import Container from "../global/Container"
import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"

const Navbar = async () => {
  const { userId } = await auth()
  const isAdmin = userId === process.env.ADMIN_USER_ID

  return (
    <nav className="border-b ">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-4">
        <Logo />
        {/* using useSearchParams() without a Suspense boundary will opt the entire page into client-side rendering. This could cause your page to be blank until the client-side JavaScript has loaded. */}
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className="flex gap-4 items-center">
          <CartButton />
          <DarkMode />
          <LinksDropdown isAdmin={isAdmin} />
        </div>
      </Container>
    </nav>
  )
}

export default Navbar
