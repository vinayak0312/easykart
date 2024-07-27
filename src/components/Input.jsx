import React, { memo } from "react";
import FormikHOC from "../FormikHOC";
function Input({ label, name, type, id, touched, error, ...rest }) {
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder={"Enter your " + name}
        {...rest}
      />
      {touched && error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </>
  );
}
export const FormikInput = FormikHOC(Input);
export default memo(Input);
