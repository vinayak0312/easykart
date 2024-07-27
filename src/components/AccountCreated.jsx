import React, { memo } from "react";
import { Link } from "react-router-dom";
import NormalButton from "./Button";
function Created() {
  return (
    <div className="flex  bg-gray-100 h-screen w-screen algin-center justify-center gap-4">
      <div className="border rounded-xl h-3/4 w-3/4 self-center flex flex-col justify-center items-center gap-4 bg-white py-4 px-4">
        <h1 className="text-3xl">Your Account is Created!</h1>
        <Link to="/login">
          <NormalButton name="Log In" extraclasses="bg-blue-700" />
        </Link>
      </div>
    </div>
  );
}
export default memo(Created);
