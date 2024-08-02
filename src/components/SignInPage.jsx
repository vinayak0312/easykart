import React from "react";
import { withFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Input from "./Input";
import Button from "./Button2";
import axios from "axios";

function sendData(values, props) {
  axios
    .post("https://myeasykart.codeyogi.io/login", {
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      props.props.setUser(user);
      console.log(user);
      props.props.setAlert({
        type: "success",
        message: "Welcome Back " + user.full_name + "!",
      });
    })
    .catch(() => {
      props.props.setAlert({
        type: "error",
        message: "Invalid email address or Password",
      });
    });
}

const schema = Yup.object().shape({
  email: Yup.string().required("Please fill your email"),
  password: Yup.string().required("Please enter your password"),
});

function login_page({
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
}) {
  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="flex flex-col p-6 gap-6 w-full max-w-md bg-white border rounded-xl">
        <h1 className="self-center text-gray-600 text-3xl">EasyKart</h1>
        <h2 className="text-2xl font-bold">Sign in</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="email"
            id="email"
            type="email"
            label="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.email}
            error={errors.email}
          />
          <Link className="text-blue-600 self-end" to="/forgot">
            Forgot Password?
          </Link>
          <Input
            name="password"
            id="password"
            type="password"
            label="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.password}
            error={errors.password}
          />
          <Button name="Log In" />
          <p className="self-center">
            New User? Create Account{" "}
            <Link className="text-blue-600" to="/sign_up">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const myHOC = withFormik({
  initialValues: {
    email: "",
    password: "",
  },
  handleSubmit: sendData,
  validationSchema: schema,
});

export default myHOC(login_page);
export const Login = login_page;
