import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import * as Yup from "yup";
import { SelfFormikInput } from "../SelfModifiedInput";
import Created from "./AccountCreated";
import Button from "./Button2.jsx";

function SignUp() {
  const [pass, setPass] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  function createAccount(values) {
    if (values.password !== values.confirm_password) {
      setPass(true);
    } else {
      console.log(
        values.username,
        values.dateOfBirth,
        values.email,
        values.password,
        values.confirm_password
      );
      setPass(false);
      setAccountCreated(true);
    }
  }

  const schema = Yup.object().shape({
    username: Yup.string().required("Please enter your name"),
    dateOfBirth: Yup.string().required("Please enter your date of birth"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Please fill your email"),
    password: Yup.string()
      .required("Please enter password")
      .min(8, "Password must be at least 8 characters"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  if (accountCreated) {
    return <Created />;
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl">
        <Link className="flex items-center text-blue-600 hover:underline" to="/">
          <MdOutlineArrowBackIos className="text-2xl" />
          <span className="ml-1">Back</span>
        </Link>
        <div className="text-center mt-4">
          <h1 className="text-4xl font-bold text-gray-800">EasyKart</h1>
          <h2 className="mt-2 text-xl font-semibold text-gray-600">Sign Up</h2>
        </div>
        <Formik
          initialValues={{
            username: "",
            dateOfBirth: "",
            email: "",
            password: "",
            confirm_password: "",
          }}
          validationSchema={schema}
          onSubmit={createAccount}
        >
          <Form className="mt-6 space-y-4">
            <SelfFormikInput
              name="username"
              id="username"
              type="text"
              label="Name"
              extraClasses="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              labelClasses="text-gray-900 text-lg"
            />
            <SelfFormikInput
              name="dateOfBirth"
              id="dateOfBirth"
              type="date"
              label="Date Of Birth"
              extraClasses="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              labelClasses="text-gray-900 text-lg"
            />
            <SelfFormikInput
              name="email"
              id="email"
              type="email"
              label="Email"
              extraClasses="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              labelClasses="text-gray-900 text-lg"
            />
            <SelfFormikInput
              name="password"
              id="password"
              type="password"
              label="Password"
              extraClasses="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              labelClasses="text-gray-900 text-lg"
            />
            <SelfFormikInput
              name="confirm_password"
              id="confirm_password"
              type="password"
              label="Confirm Password"
              extraClasses="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              labelClasses="text-gray-900 text-lg"
            />
            {pass && (
              <p className="text-red-500">
                Password and Confirm password are not the same
              </p>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3 mt-2 text-xl font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              Create Account
            </button>
            <p className="mt-2 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link className="font-medium text-blue-600 hover:underline" to="/login">
                Sign in
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;
