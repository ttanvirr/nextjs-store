"use client"

import { LucideShare2 } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  XIcon,
  XShareButton,
} from "react-share"

const ShareButton = ({
  productId,
  name,
}: {
  productId: string
  name: string
}) => {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL
  const shareUrl = `${url}/products/${productId}`
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="sr-only">Share</span>
          <LucideShare2 />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="top" align="end" sideOffset={10} className="w-full">
        <div className="flex items-center gap-x-2 justify-center w-full">
          <XShareButton url={shareUrl} title={name}>
            <XIcon size={32} round />
          </XShareButton>
          <LinkedinShareButton url={shareUrl} title={name}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <EmailShareButton url={shareUrl} subject={name}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ShareButton
