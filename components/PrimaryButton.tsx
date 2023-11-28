import React, {ReactNode} from "react";

const PrimaryButton: React.FC<{
  type: "submit" | "reset" | "button",
  children: ReactNode
}> = ({type, children}) => {
  return <button className="p-2 rounded bg-green-600 dark:bg-green-200 text-white" type={type}>{children}</button>
}

export default PrimaryButton