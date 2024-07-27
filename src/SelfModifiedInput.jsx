import React, { memo } from "react";
import FormikHOC from "./FormikHOC";
function SelfModifiedInput({
  label,
  name,
  type,
  id,
  touched,
  error,
  labelClasses,
  extraClasses,
  ...rest
}) {
  return (
    <>
      <label className={labelClasses} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        className={extraClasses}
        placeholder={"Enter your " + name}
        {...rest}
      />
      <div>
        {touched && error && <div className="text-red-500">{error}</div>}
      </div>
    </>
  );
}
export const SelfFormikInput = FormikHOC(SelfModifiedInput);
export default memo(SelfModifiedInput);
