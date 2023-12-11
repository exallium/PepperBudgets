import React, {HTMLInputTypeAttribute} from "react";

const InlineFormInput: React.FC<{
  id: string
  defaultValue: string,
  name: string,
  type?: HTMLInputTypeAttribute
}> = ({id, defaultValue, name, type}) => {
  return (
    <div className="md:w-2/3">
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        id={id} type={type ?? 'text'} name={name}
        defaultValue={defaultValue}/>
    </div>
  )
}

export default InlineFormInput