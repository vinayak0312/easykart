import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import CartProductDetail from "./CartRow";
import { ImSpinner6 } from "react-icons/im";
import { getProduct } from "../Api";

function Cart({ cart, recent_cart }) {
  const [cart_product, setCart] = useState([]);
  const [dummy_cart, set_dummy] = useState(cart);
  const keys_array = Object.keys(dummy_cart);
  const totalCount = cart_product.reduce(function (previous, current) {
    return previous + current.price * dummy_cart[current.id];
  }, 0);

  if (keys_array.length === 0) {
    return (
      <div className="flex flex-col gap-6 mx-auto">
        <h1 className="bold text-3xl">Your Cart Is Empty</h1>
        <div className="flex justify-center">
          <Link
            className="border rounded-md bg-orange-500 text-white px-4 py-1"
            to="/"
          >
            Home
          </Link>
        </div>
      </div>
    );
  }

  const allPromise = keys_array.map(function (id) {
    return getProduct(id);
  });
  const allPromises = Promise.all(allPromise);
  useEffect(
    function () {
      allPromises.then(function (product) {
        setCart(product);
      });
    },
    [keys_array]
  );

  if (cart_product.length == 0) {
    return (
      <div className="self-center flex flex-col gap-3">
        <ImSpinner6 className="text-6xl animate-spin" />
        <h1 className="text-2xl relative right-8">Please Wait...</h1>
      </div>
    );
  }

  function handle_count(id, dummy_count) {
    const local = { ...dummy_cart };
    local[id] = dummy_count;
    set_dummy(local);
  }
  function dummy(id) {
    const local = { ...dummy_cart };
    local[id] = 0;
    set_dummy(local);
  }
  function handle_cart() {
    const m = { ...dummy_cart };
    for (let i = 0; i < keys_array.length; i++) {
      if (m[keys_array[i]] == 0) {
        delete m[keys_array[i]];
      }
    }
    recent_cart(m);
  }

  return (
    <div className="flex flex-col gap-4 mx-auto w-[75vw]">
      <Link to="/">
        <span className="material-symbols-outlined">arrow_back</span>
      </Link>
      <div className="border border-gray-200 p-4">
        <div className="flex justify-between border-b bg-gray-300 border-gray-300 pb-2 mb-4">
          <h3 className="font-bold text-2xl flex-1">Product</h3>
          <h3 className="font-bold text-2xl flex-1 text-center">Price</h3>
          <h3 className="font-bold text-2xl flex-1 text-center">Quantity</h3>
          <h3 className="font-bold text-2xl flex-1 text-right">Subtotal</h3>
        </div>

        {cart_product.map(function (item) {
          return (
            <>
              <CartProductDetail
                cart={item}
                quantity={dummy_cart[item.id]}
                dummy_change={dummy}
                dummy_quan={handle_count}
              />
            </>
          );
        })}

        <div className="flex justify-between mt-4">
          <div className="flex gap-2">
            <input
              className="border border-gray-200 py-1 px-2"
              type="text"
              placeholder="Coupon Code"
            />
            <button className="border font-bold rounded-md bg-red-500 px-6 text-white">
              APPLY COUPON
            </button>
          </div>
          <button
            onClick={handle_cart}
            className="border font-bold rounded-md bg-red-500 px-6 text-white"
          >
            UPDATE CART
          </button>
        </div>
      </div>
      <div className="border self-end flex flex-col gap-4 w-[30vw] px-4 py-2">
        <h1 className="px-2 py-2 bold text-xl bg-gray-100">Cart totals</h1>
        <div className="flex flex-col gap-2">
          <div className="px-2 flex justify-between">
            <h2>Subtotal</h2>
            <h2>${totalCount.toFixed(2)}</h2>
          </div>
          <hr />
          <div className="px-2 flex justify-between">
            <h2>Total</h2>
            <h2>${totalCount.toFixed(2)}</h2>
          </div>
          <hr />
        </div>
        <button className="border font-bold rounded-md bg-red-500 text-white px-4 py-2">
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
}

export default Cart;
