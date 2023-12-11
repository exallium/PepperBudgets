import React, {ReactNode} from "react";

const H2: React.FC<{
  className?: string,
  children: ReactNode
}> = ({className, children}) => {
  return <h2 className={ (className ?? "") + " text-xl"}>{children}</h2>
}

export default H2