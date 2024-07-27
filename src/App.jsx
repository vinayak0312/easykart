import React, { useState, useMemo, useCallback, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Detail from "./components/ProductDetail.jsx";
import { Error1 as Error } from "./Error.jsx";
import Cart from "./components/Cart.jsx";
import Login from "./components/SignInPage.jsx";
import SignUp from "./components/SignUpPage.jsx";
import Forgot from "./components/ForgotPage.jsx";
import Logo from "./EasyKart Logo.webp";

export const CreateContext = createContext();

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
      <CreateContext.Provider value={addToCart}>
        <Header count={totalCount} src={Logo} />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/product/:id" element={<Detail />}></Route>
          <Route path="*" element={<Error name="Page" />}></Route>
          <Route path="/cart" element={<Cart cart={cart} recent_cart={updateCart} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign_up" element={<SignUp />}></Route>
          <Route path="/forgot" element={<Forgot />}></Route>
        </Routes>
        <Footer />
      </CreateContext.Provider>
    </div>
  );
}

export default App;
