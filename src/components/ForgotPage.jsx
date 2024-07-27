import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import * as Yup from "yup";
import { FormikInput } from "./Input";

function ForgotPassword() {
  function sendData(values) {
    console.log(values.email);
  }

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Please fill your email"),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        <Link className="flex items-center text-blue-600 hover:underline" to="/">
          <MdOutlineArrowBackIos className="text-2xl" />
          <span className="ml-1">Back</span>
        </Link>
        <div className="text-center mt-4">
          <h1 className="text-4xl font-bold text-gray-800">EasyKart</h1>
          <h2 className="mt-2 text-xl font-semibold text-gray-600">
            Forgot Password
          </h2>
        </div>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={schema}
          onSubmit={sendData}
        >
          <Form className="mt-6 space-y-4">
            <FormikInput
              name="email"
              id="email"
              type="email"
              label="Email"
              extraClasses="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              labelClasses="text-gray-900 text-lg"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 mt-2 text-xl font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Send Password
            </button>
            <div className="flex justify-center mt-4">
              <Link className="text-blue-600 hover:underline" to="/login">
                <button className="px-6 py-3 text-xl font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700">
                  Cancel
                </button>
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;
