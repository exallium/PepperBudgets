import React, {ReactNode} from "react";

const TableHeading: React.FC<{
  children: ReactNode
}> = (
  {children}
) => {
  return (
    <th className="p-4 text-left bg-gray-300 dark:bg-gray-700 first:rounded-tl-xl last:rounded-tr-xl">{children}</th>
  )
}

export default TableHeading