import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartProductDetail from "./CartRow";
import { getProduct } from "../Api";

function Cart({ cart, setCart}) {
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let total = 0;
    const fetchProductPrices = async () => {
      for (const productId in cart) {
        const product = await getProduct(productId);
        total += cart[productId] * product.price;
      }
      setTotalCount(total);
    };
    fetchProductPrices();
  }, [cart]);

  const keysArray = Object.keys(cart);

  if (keysArray.length === 0) {
    return (
      <div className="flex flex-col gap-6 mx-auto">
        <h1 className="bold text-3xl">Your Cart Is Empty</h1>
        <div className="flex justify-center">
          <Link className="border rounded-md bg-orange-500 text-white px-4 py-1" to="/">
            Home
          </Link>
        </div>
      </div>
    );
  }

  const updateQuantity = (id, newQuantity) => {
    const newCart = { ...cart };
    if (newQuantity <= 0) {
      delete newCart[id];
    } else {
      newCart[id] = newQuantity;
    }
    setCart(newCart);
  };

  return (
    <div className="flex flex-col gap-4 mx-auto w-[75vw]">
      <Link to="/">
        <span className="material-symbols-outlined">
          arrow_back
        </span>
      </Link>
      <div className="border border-gray-200 p-4">
        <div className="flex justify-between border-b bg-gray-300 border-gray-300 pb-2 mb-4">
          <h3 className="font-bold text-2xl flex-1">Product</h3>
          <h3 className="font-bold text-2xl flex-1 text-center">Price</h3>
          <h3 className="font-bold text-2xl flex-1 text-center">Quantity</h3>
          <h3 className="font-bold text-2xl flex-1 text-right">Subtotal</h3>
        </div>

        {keysArray.map((item) => (
          <CartProductDetail key={item} id={item} quantity={cart[item]} updateQuantity={updateQuantity} />
        ))}

        <div className="flex justify-between mt-4">
          <div className="flex gap-2">
            <input
              className="border border-gray-200 py-1 px-2"
              type="text"
              placeholder="Coupon Code"
            />
            <button className="border font-bold rounded-md bg-red-500 px-6 text-white">APPLY COUPON</button>
          </div>
          <button className="border font-bold rounded-md bg-red-500 opacity-50 px-6 text-white">UPDATE CART</button>
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