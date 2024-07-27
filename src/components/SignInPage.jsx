import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import * as Yup from "yup";
import { FormikInput } from "./Input";

function LoginPage() {
  function sendData(values) {
    console.log(values.email, values.password);
  }

  const schema = Yup.object().shape({
    email: Yup.string().required("Please fill your email"),
    password: Yup.string().required("Please enter your password"),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <div className="w-full max-w-lg p-10 bg-white rounded-2xl shadow-2xl">
        <Link
          className="flex items-center text-blue-600 hover:underline"
          to="/"
        >
          <MdOutlineArrowBackIos className="text-2xl" />
          <span className="ml-1">Back</span>
        </Link>
        <div className="text-center mt-6">
          <h1 className="text-4xl font-bold text-gray-800">EasyKart</h1>
          <h2 className="mt-2 text-xl font-semibold text-gray-600">Sign in</h2>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={schema}
          onSubmit={sendData}
        >
          <Form className="mt-8 space-y-6">
            <FormikInput
              name="email"
              id="email"
              type="email"
              label="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <FormikInput
              name="password"
              id="password"
              type="password"
              label="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex items-center justify-between mt-4">
              <Link
                className="text-sm font-medium text-blue-600 hover:underline"
                to="/forgot"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-xl font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
              // disabled={!isValid}
            >
              Log in
            </button>
            <p className="mt-6 text-sm text-center text-gray-600">
              New User?{" "}
              <Link
                className="font-medium text-blue-600 hover:underline"
                to="/sign_up"
              >
                Sign up
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default LoginPage;
