import React, {ReactNode} from "react";

const Table: React.FC<{
  className?: string,
  children: ReactNode
}> = ({className, children}) => {
  return (
    <table className={className}>
      {children}
    </table>
  )
}

export default Table