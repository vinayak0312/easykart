import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import * as Yup from "yup";

function LoginPage() {
  function sendData(values) {
    console.log(values.email, values.password);
  }

  const schema = Yup.object().shape({
    email: Yup.string().required("Please fill your email"),
    password: Yup.string().required("Please enter your password"),
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
      password: "",
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
          <h2 className="mt-2 text-2xl font-semibold text-gray-600">Sign in</h2>
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
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              onBlur={handleBlur}
              id="password"
              onChange={handleChange}
              type="password"
              name="password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
            {touched.password && errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Link className="text-sm font-medium text-blue-600 hover:underline" to="/forgot">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-xl font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            disabled={!isValid}
          >
            Log in
          </button>
          <p className="mt-4 text-sm text-center text-gray-600">
            New User?{" "}
            <Link className="font-medium text-blue-600 hover:underline" to="/sign_up">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
