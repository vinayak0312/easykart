import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Detail from "./components/ProductDetail.jsx";
import { Error1 } from "./Error.jsx";
import Cart from "./components/Cart.jsx";
import SignupPage from "./components/SignupPage.jsx";

function App() {
  const savedData = localStorage.getItem("added-item") || "{}";
  const convertData = JSON.parse(savedData);
  const [cart, setCart] = useState(convertData);

  function addToCart(productId, count) {
    const old = cart[productId] || 0;
    setCart({ ...cart, [productId]: old + count });
    localStorage.setItem(
      "added-item",
      JSON.stringify({ ...cart, [productId]: old + count })
    );
  }

  const updateCart = useCallback(
    function (update_cart) {
      const a = { ...update_cart };
      setCart({ ...a });
      localStorage.setItem("added-item", JSON.stringify({ ...a }));
    },
    [cart]
  );

  const totalCount = useMemo(
    function () {
      return Object.keys(cart).reduce(function (previous, current) {
        return previous + cart[current];
      }, 0);
    },
    [cart]
  );

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header count={totalCount} />
      <Routes>
        <Route index element={<Home />}></Route>
        <Route
          path="/product/:id"
          element={<Detail handleCart={addToCart} />}
        ></Route>
        <Route
          path="/cart"
          element={<Cart cart={cart} recent_cart={updateCart} />}
        ></Route>
        <Route path="/signup" element={<SignupPage />}></Route>

        <Route path="*" element={<Error1 />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
