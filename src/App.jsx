import React, {
  useState,
  useMemo,
  useCallback,
  createContext,
  useEffect,
} from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Detail from "./components/ProductDetail.jsx";
import { Error1 as Error } from "./Error.jsx";
import Cart from "./components/Cart.jsx";
import SignUp from "./components/SignUpPage.jsx";
import Forgot from "./components/ForgotPage.jsx";
import Logo from "./EasyKart Logo.webp";
import axios from "axios";
import Alert from "./components/alert.jsx";
import Home, {DetaiL,CarT} from "./components/NavigateLogin.jsx";
import Login, {SignUP,ForgoT} from "./components/NavigateHome.jsx";

export const CreateContext = createContext();
export const CreateUser = React.createContext();
export const AlertContext = React.createContext();

function App() {
  const savedData = localStorage.getItem("added-item") || "{}";
  const convertData = JSON.parse(savedData);
  const [cart, setCart] = useState(convertData);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("https://myeasykart.codeyogi.io/me", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  function logout() {
    localStorage.setItem("token", "");
    setUser();
  }

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
        <CreateUser.Provider value={{ user, setUser }}>
          <AlertContext.Provider value={{ alert, setAlert }}>
            <Header count={totalCount} src={Logo} logout={logout}/>
            <Routes>
              <Route index element={<Home />}></Route>
              <Route path="/product/:id" element={<DetaiL />}></Route>
              <Route path="*" element={<Error name="Page" />}></Route>
              <Route
                path="/cart"
                element={<CarT cart = {cart} recent_cart={updateCart} />}
              ></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/sign_up" element={<SignUP/>}></Route>
              <Route path="/forgot" element={<ForgoT />}></Route>
            </Routes>
            <Footer />
          </AlertContext.Provider>
        </CreateUser.Provider>
      </CreateContext.Provider>
    </div>
  );
}

export default App;
