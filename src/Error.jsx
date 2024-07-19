import React from "react";
import { Link } from "react-router-dom";
export function Error1() {
  return (
    <div className="flex flex-col gap-4 mx-auto">
      <img
        src="https://www.shutterstock.com/image-photo/man-working-on-laptop-404-260nw-2292359513.jpg"
        alt="page not found"
      />
      <h1 className="self-center text-4xl">Page Not Found</h1>
      <Link
        to="/"
        className="self-center px-2 py-1 border rounded-md text-white bg-blue-600"
      >
        Go To Home
      </Link>
    </div>
  );
}
function Error() {
  return (
    <div className="flex flex-col gap-4 mx-auto">
      <img
        src="https://www.shutterstock.com/image-photo/man-working-on-laptop-404-260nw-2292359513.jpg"
        alt="product not found"
      />
      <h1 className="self-center text-4xl">Product Not Found</h1>
      <Link
        to="/"
        className="self-center px-2 py-1 border rounded-md text-white bg-blue-600"
      >
        Go To Home
      </Link>
    </div>
  );
}
export default Error1;
