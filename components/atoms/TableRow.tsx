import React, {ReactNode} from "react";

const TableRow: React.FC<{
  children: ReactNode
}> = (
  {children}
) => {
  return (
    <tr className="border-b border-gray-300 dark:border-gray-700">{children}</tr>
  )
}

export default TableRow