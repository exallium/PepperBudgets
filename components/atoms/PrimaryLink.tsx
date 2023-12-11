import React, {ReactNode} from "react";

const PrimaryLink: React.FC<{
  href: string,
  className?: string,
  children: ReactNode
}> = ({href, className, children}) => {
  return <a className={(className ?? "") + " p-2 rounded bg-green-600 dark:bg-green-200 text-white"} href={href}>{children}</a>
}

export default PrimaryLink