"use client"

import { UserAvatar, useUser } from "@clerk/nextjs"
import { LuUser } from "react-icons/lu"

const UserIcon = () => {
  const { user } = useUser()

  if (user)
    return (
      <UserAvatar
        appearance={{
          elements: {
            userAvatarBox: "w-6! h-6!",
          },
        }}
      />
    )
  return <LuUser className="w-6! h-6! bg-primary rounded-full text-white" />
}

export default UserIcon
