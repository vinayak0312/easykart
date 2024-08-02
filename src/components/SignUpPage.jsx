import React from "react";
import { withFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import SelfFormikInput from "../SelfModifiedInput";
import Button from "./Button2";
import axios from "axios";

function createAccount(values, props) {
  axios
    .post("https://myeasykart.codeyogi.io/signup", {
      fullName: values.username,
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      props.props.setUser(user);
      props.props.setAlert({
        type: "success",
        message: "Welcome " + user.full_name + "!",
      });
    })
    .catch(() => {
      props.props.setAlert({
        type: "error",
        message: "Email already exists!",
      });
    });
}

const schema = Yup.object().shape({
  username: Yup.string().required("Please enter your name"),
  email: Yup.string().required("Please fill your email"),
  password: Yup.string()
    .required("Please Enter password")
    .min(8, "Password must be at least 8 characters")
    .test(
      "numberPresent",
      "Password must contain a number and a special character",
      (value) => {
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*]/.test(value);
        return hasNumber && hasSpecialChar;
      }
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

function sign_up({ handleSubmit, handleBlur, handleChange, touched, errors }) {
  return (
    <div className="flex items-center justify-center bg-gray-100 ">
      <div className="flex flex-col p-6 gap-6 w-full max-w-md bg-white border rounded-xl">
        <h1 className="self-center text-gray-600 text-3xl">EasyKart</h1>
        <h2 className="text-2xl font-bold">Sign up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <SelfFormikInput
            name="username"
            id="username"
            type="text"
            label="Name"
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.username}
            error={errors.username}
            extraClasses="border rounded-md border-yellow-400 py-2 px-3"
            labelClasses="text-gray-900 text-lg"
          />
          <SelfFormikInput
            name="email"
            id="email"
            type="email"
            label="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.email}
            error={errors.email}
            extraClasses="border rounded-md border-yellow-400 py-2 px-3"
            labelClasses="text-gray-900 text-lg"
          />
          <SelfFormikInput
            name="password"
            id="password"
            type="password"
            label="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.password}
            error={errors.password}
            extraClasses="border rounded-md border-yellow-400 py-2 px-3"
            labelClasses="text-gray-900 text-lg"
          />
          <SelfFormikInput
            name="confirm_password"
            id="confirm_password"
            type="password"
            label="Confirm Password"
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.confirm_password}
            error={errors.confirm_password}
            extraClasses="border rounded-md border-yellow-400 py-2 px-3"
            labelClasses="text-gray-900 text-lg"
          />
          <Button name="Create Account" />
          <p className="self-center">
            Already have an account?{" "}
            <Link className="text-blue-600" to="/login">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const myHOC = withFormik({
  initialValues: {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  },
  handleSubmit: createAccount,
  validationSchema: schema,
});

export default myHOC(sign_up);
export const SignUp = sign_up;
