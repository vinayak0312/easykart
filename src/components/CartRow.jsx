import React, { memo } from "react";
import { RxCrossCircled } from "react-icons/rx";

function CartProductDetail({ cart, quantity, dummy_change, dummy_quan }) {
  function changeQuantity(event) {
    if (+event.target.value < 0) {
      dummy_quan(cart.id, 0);
    } else {
      dummy_quan(cart.id, +event.target.value);
    }
  }
  function setdata() {
    dummy_change(cart.id);
  }

  return (
    <>
      <div className="flex justify-between items-center border-b border-gray-300 py-2">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={setdata}>
            <RxCrossCircled className="self-center" />
          </button>
          <img
            className="border max-w-16 max-h-16"
            src={cart.images[0]}
            alt={cart.title}
          />
          <h2 className="font-bold text-xl text-orange-600">{cart.title}</h2>
        </div>
        <h2 className="bold text-xl flex-1 text-center">
          ${cart.price.toFixed(2)}
        </h2>

        <input
          type="number"
          className="border py-2 px-4 text-center w-20"
          value={quantity}
          onChange={changeQuantity}
        />
        <h2 className="bold text-xl flex-1 text-right">
          ${(cart.price * quantity).toFixed(2)}
        </h2>
      </div>
    </>
  );
}

export default memo(CartProductDetail);
