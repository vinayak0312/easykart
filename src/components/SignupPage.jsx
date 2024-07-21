import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import * as Yup from "yup";

function SignUp() {
  function createAccount(values) {
    console.log(
      values.name,
      values.dateOfBirth,
      values.email,
      values.password,
      values.confirm_password
    );
  }

  const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    dateOfBirth: Yup.string().required("Please enter your date of birth"),
    email: Yup.string().email("Invalid email format").required("Please fill your email"),
    password: Yup.string()
      .required("Please enter password")
      .min(8, "Password must be at least 8 characters"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    isValid,
    errors,
  } = useFormik({
    initialValues: {
      name: "",
      dateOfBirth: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: schema,
    onSubmit: createAccount,
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
          <h2 className="mt-2 text-2xl font-semibold text-gray-600">Sign Up</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              id="name"
              type="text"
              name="name"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
            />
            {touched.name && errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              id="date_of_birth"
              type="date"
              name="dateOfBirth"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {touched.dateOfBirth && errors.dateOfBirth && (
              <p className="mt-2 text-sm text-red-600">{errors.dateOfBirth}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              id="email"
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
              onChange={handleChange}
              id="password"
              type="password"
              name="password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
            {touched.password && errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              id="confirm_password"
              type="password"
              name="confirm_password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm password"
            />
            {touched.confirm_password && errors.confirm_password && (
              <p className="mt-2 text-sm text-red-600">{errors.confirm_password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-xl font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            disabled={!isValid}
          >
            Create Account
          </button>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already Signed Up?{" "}
            <Link className="font-medium text-blue-600 hover:underline" to="/login">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
