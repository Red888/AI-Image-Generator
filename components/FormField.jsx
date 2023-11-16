import React from 'react'

const FormField = ( {labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name} className="block text-md font-medium text-gray-900 bg-purple-200 rounded-md p-3 w-full hover:bg-green-400 hover:border-2 border-white hover:text-white">
        {labelName}
        </label>
        {isSurpriseMe && (<button type="button" onClick={handleSurpriseMe} className="font-semibold text-sm bg-green-400 py-3 rounded-[5px] text-black w-full hover:text-white hover:border-2 border-white hover:bg-blue-400"> 
          Generate text
        </button>)}
      </div>
      <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3" />
    </div>
  )
}

export default FormField;