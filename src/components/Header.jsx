import React, { memo, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../EasyKart Logo.webp";
import { CreateUser } from "../App";

function Header({ count, src, logout }) {
  const { user } = useContext(CreateUser);
  let logoutClass = "";
  let loginClass = "hidden";
  if (!user) {
    logoutClass = "hidden";
    loginClass = "";
  }
  return (
    <div id="header" className="flex justify-between py-4 sm:mx-16 h-18">
      <Link to="/">
        <img className="h-14" src={logo} alt="Logo" />
      </Link>

      <div className="flex items-center gap-6 relative mr-8">
        <Link to="/cart" className={"relative"+logoutClass}>
          <span className="material-symbols-outlined text-5xl">
            shopping_cart
          </span>
        </Link>
        <p className="absolute top-0 right-[85px] font-bold bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-white hover:text-orange-600">
          {count}
        </p>
        <Link to="/login" className={loginClass}>
          <span class="material-symbols-outlined text-5xl">account_circle</span>
        </Link>
        <button
          onClick={logout}
          className={
            "relative border rounded-md bg-blue-500 font-bold text-white px-2 py-1 " +
            logoutClass
          }
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default memo(Header);
