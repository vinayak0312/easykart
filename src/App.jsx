import React,{useState,useEffect} from "react";
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

  useEffect(() => {
    localStorage.setItem("added-item", JSON.stringify(cart));
  }, [cart]);
  
  function addToCart(productId, count) {
    const old = cart[productId] || 0;
    setCart({ ...cart, [productId]: old + count });
  }

  const totalCount = Object.keys(cart).reduce(function (previous, current) {
    return previous + cart[current];
  }, 0);

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header count={totalCount} />
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/product/:id"element={<Detail handleCart={addToCart}/>}></Route>
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}></Route>
        <Route path="/signup" element={<SignupPage/>}></Route>

        <Route path="*" element={<Error1 />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
