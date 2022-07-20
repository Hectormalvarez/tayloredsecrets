import React from "react";

const Input = ({
  fieldName,
  options,
  register,
  registerOptions,
}: any) => {
  return (
    <>
      <label
        htmlFor={fieldName}
        className="form-label mb-2 inline-block capitalize text-gray-700"
      >
        {fieldName}
      </label>
      <input
        className="
                  form-control
                  m-0
                  mb-2
                  block
                  w-full
                  rounded
                  border
                  border-solid
                  border-gray-300 bg-white
                  bg-clip-padding px-3 py-2.5 text-base
                  font-normal
                  text-gray-700
                  transition
                  ease-in-out
                  focus:border-blue-800 focus:bg-white focus:text-gray-700 focus:shadow-md focus:shadow-blue-300 focus:outline-none
                "
        {...options}
        {...register(fieldName, registerOptions)}
      />
    </>
  );
};

export default Input;
