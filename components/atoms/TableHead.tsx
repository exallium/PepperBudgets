import React, {ReactNode} from "react";

const TableHead: React.FC<{
  children: ReactNode
}> = (
  {children}
) => {
  return (
    <thead>{children}</thead>
  )
}

export default TableHead