import React from "react";
import { useField } from "formik";
function FormikHOC(InputName) {
  return function ({ label, name, type, id, ...rest }) {
    const allData = useField(name);
    const data = allData[0];
    const meta = allData[1];
    return (
      <>
        <InputName
          label={label}
          name={name}
          type={type}
          id={id}
          onChange={data.onChange}
          onBlur={data.onBlur}
          touched={meta.touched}
          error={meta.error}
          {...rest}
        />
      </>
    );
  };
}
export default FormikHOC;
