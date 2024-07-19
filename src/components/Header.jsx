import React from "react";
import { Link } from "react-router-dom";

function Header({ count }) {
  return (
    <div id="header" className="flex justify-between py-4 sm:mx-16 h-18">
      <img
        className="h-12"
        src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png"
        alt="Amazon Logo"
      />
      <div className="relative mr-8">
        <Link to="/cart" className="relative">
          <span className="material-symbols-outlined text-5xl">shopping_cart</span>
        </Link>
        <p className="absolute top-0 right-0 font-bold bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
          {count}
        </p>
      </div>
    </div>
  );
}

export default Header;
