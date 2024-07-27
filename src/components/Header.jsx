import React from "react";
import { Link } from "react-router-dom";
import logo from "../EasyKart Logo.webp";

function Header({ count }) {
  return (
    <div id="header" className="flex justify-between py-4 sm:mx-16 h-18">
      <Link to="/">
        <img className="h-14" src={logo} alt="Logo" />
      </Link>

      <div className="flex items-center gap-4 relative mr-8">
        <Link to="/cart" className="relative">
          <span className="material-symbols-outlined text-5xl">
            shopping_cart
          </span>
        </Link>
        <p className="absolute top-0 right-[60px] font-bold bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-white hover:text-orange-600">
          {count}
        </p>
        <Link to="/login">
          <span class="material-symbols-outlined text-5xl">account_circle</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
