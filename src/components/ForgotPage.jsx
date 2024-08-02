import React from "react";
import { withFormik } from "formik";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import * as Yup from "yup";
import Input from "./Input";
import NormalButton from "./Button";
import FormButton from "./Button2";

function sendData(values) {
  console.log(values.email);
}

const schema = Yup.object().shape({
  email: Yup.string().required("Please fill your email"),
});

function forgot({
  handleSubmit,
  handleChange,
  handleBlur,
  touched,
  errors,
  values,
}) {
  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="flex flex-col p-6 gap-6 w-full max-w-md bg-white border rounded-xl">
        <h1 className="self-center text-gray-600 text-3xl">EasyKart</h1>
        <h2 className="text-2xl font-bold">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="email"
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            label="Email"
            error={errors.email}
            touched={touched.email}
          />
          <FormButton name="Send Password" />
          <Link className="self-center mt-4" to="/login">
            <NormalButton name="Cancel" />
          </Link>
        </form>
      </div>
    </div>
  );
}

const myHOC = withFormik({
  initialValues: {
    email: "",
  },
  handleSubmit: sendData,
  validationSchema: schema,
});

export default myHOC(forgot);
export const Forgot = forgot;
