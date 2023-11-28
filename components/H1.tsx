import React, {ReactNode} from "react";

const H1: React.FC<{
  className?: string,
  children: ReactNode
}> = ({className, children}) => {
  return <h1 className={ (className ?? "") + " text-2xl"}>{children}</h1>
}

export default H1