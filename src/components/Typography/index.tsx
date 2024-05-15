import React from "react"

type Props = {
  children: string
  size?: string
}

const Typography = ({ children, size = "text-xl" }: Props) => {
  return <p className={`${size}`}>{children}</p>
}

export default Typography
