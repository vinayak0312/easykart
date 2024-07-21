import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import * as Yup from "yup";

function ForgotPassword() {
  function sendData(values) {
    console.log(values.email);
  }

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Please fill your email"),
  });

  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    handleBlur,
    touched,
    isValid,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: sendData,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <Link className="flex items-center text-blue-600 hover:underline" to="/">
          <MdOutlineArrowBackIos className="text-2xl" />
          <span className="ml-1">Back</span>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">EasyKart</h1>
          <h2 className="mt-2 text-2xl font-semibold text-gray-600">Forgot Password</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              onBlur={handleBlur}
              id="email"
              onChange={handleChange}
              type="email"
              name="email"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
            {touched.email && errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-xl font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            disabled={!isValid}
          >
            Send Password
          </button>
          <div className="flex justify-center">
            <Link className="text-blue-600 hover:underline" to="/login">
              <button className="px-6 py-2 text-xl font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
