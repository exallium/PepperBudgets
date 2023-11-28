import React, {ReactNode} from "react";

const InlineFormItem: React.FC<{
  children: ReactNode
}> = ({children}) => {
  return <div className="md:flex md:items-center mb-6">{children}</div>
}

export default InlineFormItem