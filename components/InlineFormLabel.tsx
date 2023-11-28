import React, {ReactNode} from "react";

const InlineFormLabel: React.FC<{
  htmlFor: string,
  children: ReactNode
}> = ({htmlFor, children}) => {
  return (
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={htmlFor}>
        {children}
      </label>
    </div>
  )
}

export default InlineFormLabel