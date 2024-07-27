import React, { useContext, memo } from "react";
import { CreateContext } from "../App";

function addToCart({ id, count }) {
  const handleCart = useContext(CreateContext);
  function changeCart() {
    handleCart(id, count);
  }
  return (
    <>
      <button
        onClick={changeCart}
        className="rounded-md border bg-red-500 py-2 px-12 text-white"
      >
        Add To Cart
      </button>
    </>
  );
}
export default memo(addToCart);
