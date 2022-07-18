import React from "react";

type InputProps = {
  register: (x: string) => {};
  type: string;
  placeholder: string;
  label: string;
  fieldName: string;
};

const Input = ({
  register,
  type,
  placeholder,
  label,
  fieldName,
}: InputProps) => {
  return (
    <>
      <label className="form-label mb-2 inline-block capitalize text-gray-700">
        {label}
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
        type={type}
        {...register(fieldName)}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
