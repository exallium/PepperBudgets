import React from "react";

const InlineFormInput: React.FC<{
  id: string
  options: { value: number, label: string }[]
  name: string
}> = ({id, options, name}) => {
  if (options.length === 0) {
    return <p>No options!</p>
  }

  return (
    <div className="md:w-2/3">
      <select
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        id={id} name={name} defaultValue={options[0].value}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default InlineFormInput