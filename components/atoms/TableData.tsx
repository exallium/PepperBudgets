import React, {ReactNode} from "react";

const TableData: React.FC<{
  children: ReactNode
}> = (
  {children}
) => {
  return (
    <td className="p-4 first:border-l last:border-r border-gray-300 dark:border-gray-700">{children}</td>
  )
}

export default TableData